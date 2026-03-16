import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2, Clock, AlertCircle, MessageSquare, Send, ChevronDown, ChevronUp, Star, FileText } from 'lucide-react';
import { SupportRequest } from '../UserSupport/types';

interface RequestListProps {
  requests: SupportRequest[];
  isLoading: boolean;
  expandedId: number | null;
  setExpandedId: (id: number | null) => void;
  updatingId: number | null;
  updateStatus: (id: number, status: string) => void;
  replyText: string;
  setReplyText: (text: string) => void;
  handleReply: (id: number) => void;
  isReplying: boolean;
}

export function RequestList({
  requests, isLoading, expandedId, setExpandedId, updatingId, updateStatus,
  replyText, setReplyText, handleReply, isReplying
}: RequestListProps) {

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
      case 'In Progress': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800';
      case 'Rejected': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800';
      default: return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800';
    }
  };

  return (
    <div className="flex-1 flex flex-col p-4 md:p-8 overflow-y-auto custom-scrollbar">
      <div className="mb-6">
        <h2 className="text-2xl font-serif text-dark dark:text-night-text">Project Requests</h2>
        <p className="text-sm text-stone dark:text-night-muted mt-1">Manage student project requests, collaborate, and update statuses.</p>
      </div>

      <div className="bg-white/40 dark:bg-black/10 rounded-3xl border border-dark/5 dark:border-white/5 p-4 sm:p-6 flex-1 overflow-hidden flex flex-col min-h-[600px] shadow-xl">
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <Loader2 size={48} className="animate-spin text-sage opacity-50" />
          </div>
        ) : requests.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 opacity-50">
            <Clock size={48} className="mb-4 text-stone dark:text-night-muted" />
            <p className="text-stone dark:text-night-muted text-lg">No requests found matching your filters.</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
            {requests.map((req, i) => (
              <motion.div
                key={req.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white dark:bg-night-surface rounded-2xl shadow-sm border border-dark/5 dark:border-white/5 overflow-hidden"
              >
                {/* Header Row */}
                <div 
                  className="p-6 cursor-pointer flex flex-col lg:flex-row gap-6 hover:bg-stone/5 dark:hover:bg-white/5 transition-colors"
                  onClick={() => setExpandedId(expandedId === req.id ? null : req.id)}
                >
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                      <div>
                        <h3 className="font-medium text-xl text-dark dark:text-night-text leading-tight">{req.title}</h3>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-stone dark:text-night-muted">
                          <span className="font-medium text-dark/80 dark:text-night-text/80">{req.name}</span>
                          <a href={`mailto:${req.email}`} className="hover:text-sage transition-colors" onClick={e => e.stopPropagation()}>{req.email}</a>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border whitespace-nowrap ${getStatusColor(req.status)}`}>
                          {req.status}
                        </div>
                        {expandedId === req.id ? <ChevronUp size={20} className="text-stone" /> : <ChevronDown size={20} className="text-stone" />}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-6 text-sm text-stone dark:text-night-muted">
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="opacity-70" />
                        <span>Submitted: {new Date(req.created_at).toLocaleDateString()}</span>
                      </div>
                      {req.deadline && (
                        <div className="flex items-center gap-2">
                          <AlertCircle size={16} className="opacity-70" />
                          <span>Deadline: {new Date(req.deadline).toLocaleDateString()}</span>
                        </div>
                      )}
                      {req.budget && (
                        <div className="flex items-center gap-2">
                          <span className="font-medium opacity-70">₵</span>
                          <span>Budget: ₵{Number(req.budget).toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 ml-auto">
                        <MessageSquare size={16} className="opacity-70" />
                        <span>{req.messages?.length || 0} messages</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Content */}
                <AnimatePresence>
                  {expandedId === req.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-dark/5 dark:border-white/5 bg-white/30 dark:bg-black/10"
                    >
                      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
                        
                        {/* Left Column: Details & Actions */}
                        <div className="lg:col-span-1 space-y-6">
                          <div className="bg-sand/50 dark:bg-black/20 p-4 rounded-xl">
                            <h4 className="text-xs font-medium text-stone dark:text-night-muted uppercase tracking-wider mb-2">Full Description</h4>
                            <p className="text-sm text-dark/80 dark:text-night-text/80 whitespace-pre-wrap">
                              {req.description}
                            </p>
                          </div>

                          {req.file_url && (
                            <div className="bg-sage/5 dark:bg-sage/10 p-4 rounded-xl border border-sage/20">
                              <h4 className="text-xs font-medium text-sage uppercase tracking-wider mb-2">Attached File</h4>
                              <a 
                                href={req.file_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-sage hover:text-sage/80 transition-colors"
                              >
                                <FileText size={16} />
                                View Attached File
                              </a>
                            </div>
                          )}

                          {req.rating && (
                            <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 p-4 rounded-xl">
                              <h4 className="text-xs font-medium text-amber-800 dark:text-amber-500 uppercase tracking-wider mb-2">Student Review</h4>
                              <div className="flex gap-1 mb-2 text-amber-500">
                                {[1,2,3,4,5].map(star => <Star key={star} size={14} fill={star <= req.rating! ? "currentColor" : "none"} />)}
                              </div>
                              <p className="text-sm text-amber-900/80 dark:text-amber-200/80 italic">"{req.review}"</p>
                            </div>
                          )}

                          <div>
                            <h4 className="text-xs font-medium text-stone dark:text-night-muted uppercase tracking-wider mb-3">Update Status</h4>
                            <div className="grid grid-cols-2 gap-2">
                              <button
                                onClick={() => updateStatus(req.id, 'Pending')}
                                disabled={req.status === 'Pending' || updatingId === req.id}
                                className={`py-2 px-3 rounded-lg text-xs font-medium transition-all ${req.status === 'Pending' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' : 'bg-white dark:bg-night-surface border border-dark/10 dark:border-white/10 hover:bg-amber-50 dark:hover:bg-amber-900/20 text-dark dark:text-night-text'}`}
                              >
                                {updatingId === req.id && req.status !== 'Pending' ? <Loader2 size={12} className="animate-spin mx-auto" /> : 'Pending'}
                              </button>
                              <button
                                onClick={() => updateStatus(req.id, 'In Progress')}
                                disabled={req.status === 'In Progress' || updatingId === req.id}
                                className={`py-2 px-3 rounded-lg text-xs font-medium transition-all ${req.status === 'In Progress' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-white dark:bg-night-surface border border-dark/10 dark:border-white/10 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-dark dark:text-night-text'}`}
                              >
                                {updatingId === req.id && req.status !== 'In Progress' ? <Loader2 size={12} className="animate-spin mx-auto" /> : 'In Progress'}
                              </button>
                              <button
                                onClick={() => updateStatus(req.id, 'Completed')}
                                disabled={req.status === 'Completed' || updatingId === req.id}
                                className={`py-2 px-3 rounded-lg text-xs font-medium transition-all ${req.status === 'Completed' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-white dark:bg-night-surface border border-dark/10 dark:border-white/10 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-dark dark:text-night-text'}`}
                              >
                                {updatingId === req.id && req.status !== 'Completed' ? <Loader2 size={12} className="animate-spin mx-auto" /> : 'Completed'}
                              </button>
                              <button
                                onClick={() => updateStatus(req.id, 'Rejected')}
                                disabled={req.status === 'Rejected' || updatingId === req.id}
                                className={`py-2 px-3 rounded-lg text-xs font-medium transition-all ${req.status === 'Rejected' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 'bg-white dark:bg-night-surface border border-dark/10 dark:border-white/10 hover:bg-red-50 dark:hover:bg-red-900/20 text-dark dark:text-night-text'}`}
                              >
                                {updatingId === req.id && req.status !== 'Rejected' ? <Loader2 size={12} className="animate-spin mx-auto" /> : 'Rejected'}
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Right Column: Thread */}
                        <div className="lg:col-span-2 flex flex-col bg-white/50 dark:bg-night-surface rounded-2xl border border-dark/5 dark:border-white/5 overflow-hidden h-[450px]">
                          <div className="p-4 border-b border-dark/5 dark:border-white/5 bg-white/50 dark:bg-black/20 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <MessageSquare size={16} className="text-stone" />
                              <h4 className="font-medium text-dark dark:text-night-text">Discussion Thread</h4>
                            </div>
                          </div>
                          
                          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                            {req.messages?.length === 0 ? (
                              <p className="text-sm text-stone dark:text-night-muted text-center mt-10">No messages yet. Send a message to the student.</p>
                            ) : (
                              req.messages?.map(msg => (
                                <div key={msg.id} className={`flex flex-col ${msg.sender_type === 'user' ? 'items-start' : 'items-end'}`}>
                                  <span className="text-[10px] text-stone dark:text-night-muted mb-1 px-1">{msg.sender_name} • {new Date(msg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                  <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm ${msg.sender_type === 'user' ? 'bg-sage/10 text-dark dark:bg-sage/20 dark:text-night-text border border-sage/20 rounded-tr-sm' : 'bg-dark text-white dark:bg-white dark:text-dark rounded-tl-sm'}`}>
                                    {msg.message}
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                          
                          <div className="p-3 bg-white dark:bg-night-surface border-t border-dark/5 dark:border-white/5">
                            <div className="flex gap-2">
                              <input
                                type="text"
                                placeholder="Type your reply to the student..."
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                className="flex-1 px-4 py-2.5 rounded-xl bg-sand/50 dark:bg-black/20 border border-dark/10 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-sage/50"
                                onKeyDown={(e) => e.key === 'Enter' && handleReply(req.id)}
                              />
                              <button
                                onClick={() => handleReply(req.id)}
                                disabled={isReplying || !replyText.trim()}
                                className="px-5 py-2.5 bg-dark text-white dark:bg-white dark:text-dark rounded-xl hover:bg-dark/90 dark:hover:bg-white/90 disabled:opacity-50 transition-colors flex items-center gap-2 font-medium text-sm"
                              >
                                <Send size={16} />
                                Reply
                              </button>
                            </div>
                          </div>
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
