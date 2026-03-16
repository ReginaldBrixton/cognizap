import React, { useState } from 'react';
import { FileText, Clock, CheckCircle2, ChevronRight, MessageSquare, Send, Loader2, User } from 'lucide-react';
import { SupportRequest } from './types';

interface RequestListProps {
  requests: SupportRequest[];
  title: string;
  description: string;
  user: any;
  handleReplySubmit: (e: React.FormEvent, requestId: number) => void;
  replyText: string;
  setReplyText: (text: string) => void;
  isSubmittingReply: boolean;
}

export function RequestList({
  requests, title, description, user, handleReplySubmit, replyText, setReplyText, isSubmittingReply
}: RequestListProps) {
  const [selectedRequest, setSelectedRequest] = useState<SupportRequest | null>(null);

  if (selectedRequest) {
    return (
      <div className="bg-white/60 dark:bg-black/20 backdrop-blur-xl border border-dark/5 dark:border-white/5 rounded-3xl p-6 shadow-xl h-full flex flex-col max-h-[800px]">
        <button 
          onClick={() => setSelectedRequest(null)}
          className="flex items-center gap-2 text-sm text-stone dark:text-night-muted hover:text-dark dark:hover:text-night-text mb-6 transition-colors w-fit"
        >
          <ChevronRight size={16} className="rotate-180" />
          Back to List
        </button>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-serif text-dark dark:text-night-text mb-2">{selectedRequest.title}</h2>
              <div className="flex items-center gap-4 text-sm text-stone dark:text-night-muted">
                <span>{new Date(selectedRequest.created_at).toLocaleDateString()}</span>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                  selectedRequest.status === 'completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800/50' :
                  selectedRequest.status === 'in_progress' ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800/50' :
                  'bg-stone/10 text-stone border-stone/20 dark:bg-white/5 dark:text-night-muted dark:border-white/10'
                }`}>
                  {selectedRequest.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white/50 dark:bg-night-surface/50 rounded-2xl p-5 border border-dark/5 dark:border-white/5 mb-8">
            <p className="text-dark dark:text-night-text text-sm leading-relaxed whitespace-pre-wrap">{selectedRequest.description}</p>
            
            <div className="mt-6 grid grid-cols-2 gap-4 pt-6 border-t border-dark/5 dark:border-white/5">
              {selectedRequest.deadline && (
                <div>
                  <p className="text-xs text-stone dark:text-night-muted mb-1">Deadline</p>
                  <p className="text-sm font-medium text-dark dark:text-night-text">{new Date(selectedRequest.deadline).toLocaleDateString()}</p>
                </div>
              )}
              {selectedRequest.budget && (
                <div>
                  <p className="text-xs text-stone dark:text-night-muted mb-1">Budget</p>
                  <p className="text-sm font-medium text-dark dark:text-night-text">₵{selectedRequest.budget}</p>
                </div>
              )}
              {selectedRequest.file_url && (
                <div className="col-span-2">
                  <p className="text-xs text-stone dark:text-night-muted mb-1">Attachment</p>
                  <a href={selectedRequest.file_url} target="_blank" rel="noopener noreferrer" className="text-sm text-sage hover:underline flex items-center gap-1">
                    <FileText size={14} /> View File
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-serif text-dark dark:text-night-text mb-4 flex items-center gap-2">
              <MessageSquare size={18} className="text-sage" />
              Messages
            </h3>
            
            <div className="space-y-4">
              {selectedRequest.messages?.map((msg) => (
                <div key={msg.id} className={`flex flex-col ${msg.sender_type === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                    msg.sender_type === 'user' 
                      ? 'bg-dark text-white dark:bg-white dark:text-dark rounded-tr-sm' 
                      : 'bg-white dark:bg-night-surface border border-dark/5 dark:border-white/5 text-dark dark:text-night-text rounded-tl-sm shadow-sm'
                  }`}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                  </div>
                  <span className="text-[10px] text-stone dark:text-night-muted mt-1 px-1">
                    {msg.sender_name} • {new Date(msg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </span>
                </div>
              ))}
              {(!selectedRequest.messages || selectedRequest.messages.length === 0) && (
                <p className="text-sm text-stone dark:text-night-muted text-center py-8 bg-white/30 dark:bg-night-surface/30 rounded-2xl border border-dark/5 dark:border-white/5">
                  No messages yet.
                </p>
              )}
            </div>
          </div>
        </div>

        {user && (
          <form onSubmit={(e) => handleReplySubmit(e, selectedRequest.id)} className="mt-4 pt-4 border-t border-dark/5 dark:border-white/5 shrink-0">
            <div className="relative">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type a reply..."
                className="w-full pl-4 pr-12 py-3 rounded-xl bg-white dark:bg-night-surface border border-dark/10 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-sage/50 text-dark dark:text-night-text text-sm"
                disabled={isSubmittingReply}
              />
              <button
                type="submit"
                disabled={!replyText.trim() || isSubmittingReply}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-sage text-white rounded-lg hover:bg-sage/90 disabled:opacity-50 transition-colors"
              >
                {isSubmittingReply ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              </button>
            </div>
          </form>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white/60 dark:bg-black/20 backdrop-blur-xl border border-dark/5 dark:border-white/5 rounded-3xl p-6 shadow-xl h-full flex flex-col max-h-[800px]">
      <div className="mb-6 shrink-0">
        <h2 className="text-2xl font-serif text-dark dark:text-night-text">{title}</h2>
        <p className="text-sm text-stone dark:text-night-muted">{description}</p>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-3">
        {requests.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-white/50 dark:bg-night-surface/50 rounded-full flex items-center justify-center mx-auto mb-4 border border-dark/5 dark:border-white/5">
              <FileText size={24} className="text-stone dark:text-night-muted" />
            </div>
            <p className="text-dark dark:text-night-text font-medium">No requests found</p>
            <p className="text-sm text-stone dark:text-night-muted mt-1">They will appear here once created.</p>
          </div>
        ) : (
          requests.map((req) => (
            <div 
              key={req.id} 
              onClick={() => setSelectedRequest(req)}
              className="group bg-white/50 dark:bg-night-surface/50 border border-dark/5 dark:border-white/5 rounded-2xl p-4 hover:border-sage/30 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-dark dark:text-night-text group-hover:text-sage transition-colors line-clamp-1">{req.title}</h3>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-medium border shrink-0 ml-3 ${
                  req.status === 'completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800/50' :
                  req.status === 'in_progress' ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800/50' :
                  'bg-stone/10 text-stone border-stone/20 dark:bg-white/5 dark:text-night-muted dark:border-white/10'
                }`}>
                  {req.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>
              <p className="text-sm text-stone dark:text-night-muted line-clamp-2 mb-4">{req.description}</p>
              <div className="flex items-center justify-between text-xs text-stone dark:text-night-muted">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1"><Clock size={12} /> {new Date(req.created_at).toLocaleDateString()}</span>
                  <span className="flex items-center gap-1"><User size={12} /> {req.name}</span>
                </div>
                <div className="flex items-center gap-1 text-sage opacity-0 group-hover:opacity-100 transition-opacity">
                  View Details <ChevronRight size={14} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
