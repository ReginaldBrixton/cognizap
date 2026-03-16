import React, { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { RequestList } from './RequestList';
import { SupportRequest } from '../UserSupport/types';

export function AdminSupport() {
  const [requests, setRequests] = useState<SupportRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');
  const [isReplying, setIsReplying] = useState(false);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await fetch('/api/support-requests');
      if (response.ok) {
        const data = await response.json();
        setRequests(data.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch requests', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (id: number, newStatus: string) => {
    setUpdatingId(id);
    try {
      const response = await fetch(`/api/support-requests/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setRequests(prev => prev.map(req => req.id === id ? { ...req, status: newStatus } : req));
      }
    } catch (error) {
      console.error('Failed to update status', error);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleReply = async (requestId: number) => {
    if (!replyText.trim()) return;
    setIsReplying(true);
    try {
      const response = await fetch(`/api/support-requests/${requestId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender_name: 'Researcher (Admin)',
          sender_type: 'admin',
          message: replyText
        }),
      });
      if (response.ok) {
        setReplyText('');
        fetchRequests();
      }
    } catch (error) {
      console.error('Failed to send reply', error);
    } finally {
      setIsReplying(false);
    }
  };

  const filteredRequests = requests.filter(req => {
    const matchesSearch = req.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          req.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          req.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || req.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="relative flex-1 flex flex-col md:flex-row bg-sand dark:bg-night pt-16">
      <Sidebar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
      <RequestList 
        requests={filteredRequests}
        isLoading={isLoading}
        expandedId={expandedId}
        setExpandedId={setExpandedId}
        updatingId={updatingId}
        updateStatus={updateStatus}
        replyText={replyText}
        setReplyText={setReplyText}
        handleReply={handleReply}
        isReplying={isReplying}
      />
    </div>
  );
}
