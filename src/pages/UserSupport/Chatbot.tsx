import React, { useRef, useEffect } from 'react';
import { Bot, Send, Upload, Loader2, CheckCircle2 } from 'lucide-react';
import { ChatMessage } from './types';

interface ChatbotProps {
  chatMessages: ChatMessage[];
  chatInput: string;
  setChatInput: (input: string) => void;
  isTyping: boolean;
  handleChatSubmit: (e: React.FormEvent) => void;
  formData: any;
  setFormData: (data: any) => void;
  handleStepSubmit: (step: string) => void;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  uploadingFile: boolean;
  setShowForm: (show: boolean) => void;
  showForm: boolean;
}

export function Chatbot({
  chatMessages, chatInput, setChatInput, isTyping, handleChatSubmit,
  formData, setFormData, handleStepSubmit, handleFileUpload, uploadingFile,
  setShowForm, showForm
}: ChatbotProps) {
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping]);

  return (
    <div className={`flex flex-col bg-white/60 dark:bg-black/20 backdrop-blur-xl border border-dark/5 dark:border-white/5 rounded-3xl overflow-hidden shadow-xl transition-all duration-500 ${showForm ? 'lg:w-1/2' : 'w-full max-w-3xl mx-auto'} h-full max-h-[800px]`}>
      <div className="p-4 border-b border-dark/5 dark:border-white/5 bg-white/50 dark:bg-night-surface/50 flex items-center gap-3 shrink-0">
        <div className="w-10 h-10 rounded-full bg-sage/20 flex items-center justify-center text-sage">
          <Bot size={20} />
        </div>
        <div>
          <h3 className="font-medium text-dark dark:text-night-text">Project Assistant</h3>
          <p className="text-xs text-stone dark:text-night-muted">Powered by AI</p>
        </div>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto min-h-[400px] max-h-[600px] space-y-4 custom-scrollbar">
        {chatMessages.map((msg, i) => (
          <div key={msg.id || i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${msg.role === 'user' ? 'bg-dark text-white dark:bg-white dark:text-dark rounded-tr-sm' : 'bg-white dark:bg-night-surface border border-dark/5 dark:border-white/5 text-dark dark:text-night-text rounded-tl-sm shadow-sm'}`}>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
              
              {/* Inline Form */}
              {msg.step === 'name_email' && !msg.formSubmitted && (
                <div className="mt-4 bg-sand/50 dark:bg-black/20 p-4 rounded-xl border border-dark/10 dark:border-white/10 space-y-3">
                  <input 
                    type="text" 
                    placeholder="Your Name *" 
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})} 
                    disabled={isTyping}
                    className="w-full px-3 py-2 rounded-lg bg-white dark:bg-night-surface border border-dark/10 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-sage/50 text-dark dark:text-night-text disabled:opacity-50"
                  />
                  <input 
                    type="email" 
                    placeholder="Your Email *" 
                    value={formData.email} 
                    onChange={e => setFormData({...formData, email: e.target.value})} 
                    disabled={isTyping}
                    className="w-full px-3 py-2 rounded-lg bg-white dark:bg-night-surface border border-dark/10 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-sage/50 text-dark dark:text-night-text disabled:opacity-50"
                  />
                  <button 
                    onClick={() => handleStepSubmit('name_email')} 
                    disabled={isTyping}
                    className="w-full mt-2 bg-sage text-white py-2.5 rounded-lg text-sm font-medium hover:bg-sage/90 transition-colors disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
              {msg.step === 'title' && !msg.formSubmitted && (
                <div className="mt-4 bg-sand/50 dark:bg-black/20 p-4 rounded-xl border border-dark/10 dark:border-white/10 space-y-3">
                  <input 
                    type="text" 
                    placeholder="Project Title *" 
                    value={formData.title} 
                    onChange={e => setFormData({...formData, title: e.target.value})} 
                    disabled={isTyping}
                    className="w-full px-3 py-2 rounded-lg bg-white dark:bg-night-surface border border-dark/10 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-sage/50 text-dark dark:text-night-text disabled:opacity-50"
                  />
                  <button 
                    onClick={() => handleStepSubmit('title')} 
                    disabled={isTyping}
                    className="w-full mt-2 bg-sage text-white py-2.5 rounded-lg text-sm font-medium hover:bg-sage/90 transition-colors disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
              {msg.step === 'description' && !msg.formSubmitted && (
                <div className="mt-4 bg-sand/50 dark:bg-black/20 p-4 rounded-xl border border-dark/10 dark:border-white/10 space-y-3">
                  <textarea 
                    placeholder="Full Description of Objectives *" 
                    value={formData.description} 
                    onChange={e => setFormData({...formData, description: e.target.value})} 
                    disabled={isTyping}
                    className="w-full px-3 py-2 rounded-lg bg-white dark:bg-night-surface border border-dark/10 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-sage/50 min-h-[100px] resize-none text-dark dark:text-night-text disabled:opacity-50"
                  />
                  <button 
                    onClick={() => handleStepSubmit('description')} 
                    disabled={isTyping}
                    className="w-full mt-2 bg-sage text-white py-2.5 rounded-lg text-sm font-medium hover:bg-sage/90 transition-colors disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
              {msg.step === 'deadline_budget' && !msg.formSubmitted && (
                <div className="mt-4 bg-sand/50 dark:bg-black/20 p-4 rounded-xl border border-dark/10 dark:border-white/10 space-y-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input 
                      type="date" 
                      placeholder="Deadline" 
                      value={formData.deadline} 
                      onChange={e => setFormData({...formData, deadline: e.target.value})} 
                      disabled={isTyping}
                      className="w-full px-3 py-2 rounded-lg bg-white dark:bg-night-surface border border-dark/10 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-sage/50 text-dark dark:text-night-text disabled:opacity-50"
                    />
                    <input 
                      type="number" 
                      placeholder="Budget (₵)" 
                      value={formData.budget} 
                      onChange={e => setFormData({...formData, budget: e.target.value})} 
                      disabled={isTyping}
                      className="w-full px-3 py-2 rounded-lg bg-white dark:bg-night-surface border border-dark/10 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-sage/50 text-dark dark:text-night-text disabled:opacity-50"
                    />
                  </div>
                  <button 
                    onClick={() => handleStepSubmit('deadline_budget')} 
                    disabled={isTyping}
                    className="w-full mt-2 bg-sage text-white py-2.5 rounded-lg text-sm font-medium hover:bg-sage/90 transition-colors disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
              {msg.step === 'files' && !msg.formSubmitted && (
                <div className="mt-4 bg-sand/50 dark:bg-black/20 p-4 rounded-xl border border-dark/10 dark:border-white/10 space-y-3">
                  <div className="flex items-center gap-3">
                    <Upload size={20} className="text-sage" />
                    <input 
                      type="file" 
                      onChange={handleFileUpload} 
                      disabled={isTyping || uploadingFile}
                      className="w-full text-sm text-dark dark:text-night-text file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sage/10 file:text-sage hover:file:bg-sage/20 disabled:opacity-50"
                    />
                  </div>
                  {uploadingFile && <p className="text-xs text-sage flex items-center gap-2"><Loader2 size={12} className="animate-spin"/> Uploading...</p>}
                  {formData.file_url && <p className="text-xs text-emerald-600 dark:text-emerald-400">File uploaded successfully!</p>}
                  <button 
                    onClick={() => handleStepSubmit('files')} 
                    disabled={isTyping || uploadingFile}
                    className="w-full mt-2 bg-sage text-white py-2.5 rounded-lg text-sm font-medium hover:bg-sage/90 transition-colors disabled:opacity-50"
                  >
                    {formData.file_url ? 'Next' : 'Skip & Continue'}
                  </button>
                </div>
              )}
              {msg.step === 'review_submit' && !msg.formSubmitted && (
                <div className="mt-4 bg-sand/50 dark:bg-black/20 p-4 rounded-xl border border-dark/10 dark:border-white/10 space-y-3">
                  <button 
                    onClick={() => setShowForm(true)} 
                    disabled={isTyping}
                    className="w-full mt-2 bg-sage text-white py-2.5 rounded-lg text-sm font-medium hover:bg-sage/90 transition-colors disabled:opacity-50"
                  >
                    Review & Submit
                  </button>
                </div>
              )}
              {msg.step && msg.formSubmitted && (
                <div className="mt-3 p-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-lg text-sm border border-emerald-200 dark:border-emerald-800/50 flex items-center gap-2">
                  <CheckCircle2 size={16} />
                  Details saved.
                </div>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-night-surface border border-dark/5 dark:border-white/5 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm flex gap-1">
              <span className="w-2 h-2 bg-stone/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span className="w-2 h-2 bg-stone/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="w-2 h-2 bg-stone/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <form onSubmit={handleChatSubmit} className="p-4 bg-white/50 dark:bg-night-surface/50 border-t border-dark/5 dark:border-white/5">
        <div className="relative">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Type your message..."
            className="w-full pl-4 pr-12 py-3 rounded-xl bg-white dark:bg-night border border-dark/10 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-sage/50 text-dark dark:text-night-text"
            disabled={isTyping}
          />
          <button
            type="submit"
            disabled={!chatInput.trim() || isTyping}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-sage text-white rounded-lg hover:bg-sage/90 disabled:opacity-50 transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
      </form>
    </div>
  );
}
