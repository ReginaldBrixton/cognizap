import React from 'react';
import { Upload, Loader2, X } from 'lucide-react';

interface RequestFormProps {
  formData: any;
  setFormData: (data: any) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  uploadingFile: boolean;
  isSubmitting: boolean;
  setShowForm: (show: boolean) => void;
}

export function RequestForm({
  formData, setFormData, handleSubmit, handleFileUpload, uploadingFile, isSubmitting, setShowForm
}: RequestFormProps) {
  return (
    <div className="lg:w-1/2 bg-white/60 dark:bg-black/20 backdrop-blur-xl border border-dark/5 dark:border-white/5 rounded-3xl p-6 shadow-xl relative h-full max-h-[800px] overflow-y-auto custom-scrollbar">
      <button 
        onClick={() => setShowForm(false)} 
        className="absolute top-4 right-4 p-2 text-stone dark:text-night-muted hover:text-dark dark:hover:text-night-text bg-white/50 dark:bg-black/20 rounded-full transition-colors"
      >
        <X size={20} />
      </button>
      <div className="mb-6">
        <h2 className="text-xl font-serif text-dark dark:text-night-text">Review & Submit Request</h2>
        <p className="text-sm text-stone dark:text-night-muted">Please verify your details before submitting.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-stone dark:text-night-muted mb-1">Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-night-surface border border-dark/10 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-sage/50 text-dark dark:text-night-text"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-stone dark:text-night-muted mb-1">Email *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-night-surface border border-dark/10 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-sage/50 text-dark dark:text-night-text"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-stone dark:text-night-muted mb-1">Project Title *</label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-night-surface border border-dark/10 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-sage/50 text-dark dark:text-night-text"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-stone dark:text-night-muted mb-1">Description *</label>
          <textarea
            required
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-night-surface border border-dark/10 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-sage/50 resize-none text-dark dark:text-night-text"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-stone dark:text-night-muted mb-1">Deadline</label>
            <input
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-night-surface border border-dark/10 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-sage/50 text-dark dark:text-night-text"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-stone dark:text-night-muted mb-1">Budget (₵)</label>
            <input
              type="number"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-night-surface border border-dark/10 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-sage/50 text-dark dark:text-night-text"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-stone dark:text-night-muted mb-1">Attachment</label>
          <div className="flex items-center gap-4">
            <label className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-dark/10 dark:border-white/10 rounded-xl cursor-pointer hover:bg-white/50 dark:hover:bg-night-surface/50 transition-colors">
              <Upload size={18} className="text-stone dark:text-night-muted" />
              <span className="text-sm text-stone dark:text-night-muted">
                {uploadingFile ? 'Uploading...' : 'Choose File'}
              </span>
              <input
                type="file"
                className="hidden"
                onChange={handleFileUpload}
                disabled={uploadingFile}
              />
            </label>
            {formData.file_url && (
              <span className="text-xs text-sage font-medium">File attached</span>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || uploadingFile}
          className="w-full bg-dark text-white dark:bg-white dark:text-dark py-3.5 rounded-xl text-sm font-medium hover:bg-dark/90 dark:hover:bg-white/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 mt-6"
        >
          {isSubmitting ? <><Loader2 size={16} className="animate-spin" /> Submitting...</> : 'Submit Request'}
        </button>
      </form>
    </div>
  );
}
