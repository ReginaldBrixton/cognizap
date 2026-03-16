import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import pkg from 'pg';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const { Pool } = pkg;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // Database connection
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  // Initialize database table
  const initDB = async () => {
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS early_access_signups (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          phone VARCHAR(50),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `);
      
      await pool.query(`
        CREATE TABLE IF NOT EXISTS support_requests (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          title VARCHAR(255) NOT NULL,
          description TEXT NOT NULL,
          deadline DATE,
          budget DECIMAL(10, 2),
          status VARCHAR(50) DEFAULT 'Pending',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `);
      
      try { await pool.query(`ALTER TABLE support_requests ADD COLUMN rating INTEGER;`); } catch(e) {}
      try { await pool.query(`ALTER TABLE support_requests ADD COLUMN review TEXT;`); } catch(e) {}
      try { await pool.query(`ALTER TABLE support_requests ADD COLUMN file_url TEXT;`); } catch(e) {}
      
      await pool.query(`
        CREATE TABLE IF NOT EXISTS support_messages (
          id SERIAL PRIMARY KEY,
          request_id INTEGER REFERENCES support_requests(id) ON DELETE CASCADE,
          sender_name VARCHAR(255) NOT NULL,
          sender_type VARCHAR(50) NOT NULL,
          message TEXT NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `);

      await pool.query(`
        CREATE TABLE IF NOT EXISTS projects (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          description TEXT NOT NULL,
          status VARCHAR(50) DEFAULT 'Draft',
          user_id VARCHAR(255) NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `);
      console.log('Database initialized successfully');
    } catch (error) {
      console.error('Error initializing database:', error);
    }
  };

  if (process.env.DATABASE_URL) {
    await initDB();
  } else {
    console.warn('DATABASE_URL is not set. Database features will not work.');
  }

  // API Routes
  app.post('/api/early-access', async (req, res) => {
    const { name, email, phone } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    if (!process.env.DATABASE_URL) {
      return res.status(500).json({ error: 'Database connection not configured' });
    }

    try {
      const result = await pool.query(
        'INSERT INTO early_access_signups (name, email, phone) VALUES ($1, $2, $3) RETURNING id, name, email, phone, created_at',
        [name, email, phone]
      );
      res.status(201).json({ success: true, data: result.rows[0] });
    } catch (error: any) {
      console.error('Error saving early access signup:', error);
      if (error.code === '23505') { // unique_violation
        res.status(409).json({ error: 'This email is already registered.' });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  });

  // Support Requests API
  app.post('/api/support-requests', async (req, res) => {
    const { name, email, title, description, deadline, budget, file_url } = req.body;

    if (!name || !email || !title || !description) {
      return res.status(400).json({ error: 'Name, email, title, and description are required' });
    }

    if (!process.env.DATABASE_URL) {
      return res.status(500).json({ error: 'Database connection not configured' });
    }

    try {
      const result = await pool.query(
        'INSERT INTO support_requests (name, email, title, description, deadline, budget, file_url) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [name, email, title, description, deadline || null, budget || null, file_url || null]
      );
      res.status(201).json({ success: true, data: result.rows[0] });
    } catch (error: any) {
      console.error('Error saving support request:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.get('/api/support-requests', async (req, res) => {
    if (!process.env.DATABASE_URL) {
      return res.status(500).json({ error: 'Database connection not configured' });
    }

    try {
      const result = await pool.query('SELECT * FROM support_requests ORDER BY created_at DESC');
      const messagesResult = await pool.query('SELECT * FROM support_messages ORDER BY created_at ASC');
      
      const requests = result.rows.map(req => ({
        ...req,
        messages: messagesResult.rows.filter(m => m.request_id === req.id)
      }));
      
      res.status(200).json({ success: true, data: requests });
    } catch (error: any) {
      console.error('Error fetching support requests:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.patch('/api/support-requests/:id/status', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }

    if (!process.env.DATABASE_URL) {
      return res.status(500).json({ error: 'Database connection not configured' });
    }

    try {
      const result = await pool.query(
        'UPDATE support_requests SET status = $1 WHERE id = $2 RETURNING *',
        [status, id]
      );
      
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Support request not found' });
      }
      
      res.status(200).json({ success: true, data: result.rows[0] });
    } catch (error: any) {
      console.error('Error updating support request status:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.post('/api/support-requests/:id/messages', async (req, res) => {
    const { id } = req.params;
    const { sender_name, sender_type, message } = req.body;
    
    if (!process.env.DATABASE_URL) {
      return res.status(500).json({ error: 'Database connection not configured' });
    }

    try {
      const result = await pool.query(
        'INSERT INTO support_messages (request_id, sender_name, sender_type, message) VALUES ($1, $2, $3, $4) RETURNING *',
        [id, sender_name, sender_type, message]
      );
      res.status(201).json({ success: true, data: result.rows[0] });
    } catch (error) {
      console.error('Error saving message:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.patch('/api/support-requests/:id/review', async (req, res) => {
    const { id } = req.params;
    const { rating, review } = req.body;
    
    if (!process.env.DATABASE_URL) {
      return res.status(500).json({ error: 'Database connection not configured' });
    }

    try {
      const result = await pool.query(
        'UPDATE support_requests SET rating = $1, review = $2 WHERE id = $3 RETURNING *',
        [rating, review, id]
      );
      res.status(200).json({ success: true, data: result.rows[0] });
    } catch (error) {
      console.error('Error saving review:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Projects API
  app.post('/api/projects/fetch', async (req, res) => {
    const { id, status, user_id } = req.body;
    
    if (!process.env.DATABASE_URL) {
      return res.status(500).json({ error: 'Database connection not configured' });
    }

    try {
      let query = 'SELECT * FROM projects WHERE 1=1';
      const values: any[] = [];
      let paramIndex = 1;

      if (id) {
        query += ` AND id = $${paramIndex}`;
        values.push(id);
        paramIndex++;
      }
      if (status) {
        query += ` AND status = $${paramIndex}`;
        values.push(status);
        paramIndex++;
      }
      if (user_id) {
        query += ` AND user_id = $${paramIndex}`;
        values.push(user_id);
        paramIndex++;
      }

      query += ' ORDER BY created_at DESC';

      const result = await pool.query(query, values);
      res.status(200).json({ success: true, data: result.rows });
    } catch (error) {
      console.error('Error fetching projects:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.post('/api/projects', async (req, res) => {
    const { title, description, status, user_id } = req.body;

    if (!title || !description || !user_id) {
      return res.status(400).json({ error: 'Title, description, and user_id are required' });
    }

    if (!process.env.DATABASE_URL) {
      return res.status(500).json({ error: 'Database connection not configured' });
    }

    try {
      const result = await pool.query(
        'INSERT INTO projects (title, description, status, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
        [title, description, status || 'Draft', user_id]
      );
      res.status(201).json({ success: true, data: result.rows[0] });
    } catch (error) {
      console.error('Error creating project:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.patch('/api/projects/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;

    if (!process.env.DATABASE_URL) {
      return res.status(500).json({ error: 'Database connection not configured' });
    }

    try {
      const updates = [];
      const values = [];
      let paramIndex = 1;

      if (title !== undefined) {
        updates.push(`title = $${paramIndex}`);
        values.push(title);
        paramIndex++;
      }
      if (description !== undefined) {
        updates.push(`description = $${paramIndex}`);
        values.push(description);
        paramIndex++;
      }
      if (status !== undefined) {
        updates.push(`status = $${paramIndex}`);
        values.push(status);
        paramIndex++;
      }

      if (updates.length === 0) {
        return res.status(400).json({ error: 'No fields to update' });
      }

      values.push(id);
      const query = `UPDATE projects SET ${updates.join(', ')} WHERE id = $${paramIndex} RETURNING *`;

      const result = await pool.query(query, values);
      
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Project not found' });
      }

      res.status(200).json({ success: true, data: result.rows[0] });
    } catch (error) {
      console.error('Error updating project:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
