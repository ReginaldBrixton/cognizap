export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  step?: 'name_email' | 'title' | 'description' | 'deadline_budget' | 'files' | 'review_submit';
  formSubmitted?: boolean;
}

export interface SupportMessage {
  id: number;
  request_id: number;
  sender_name: string;
  sender_type: 'user' | 'admin';
  message: string;
  created_at: string;
}

export interface SupportRequest {
  id: number;
  name: string;
  email: string;
  title: string;
  description: string;
  deadline: string | null;
  budget: string | null;
  file_url: string | null;
  status: string;
  rating: number | null;
  review: string | null;
  created_at: string;
  messages: SupportMessage[];
}
