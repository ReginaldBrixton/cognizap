import React from 'react';
import { Search, Filter } from 'lucide-react';

interface SidebarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (filter: string) => void;
}

export function Sidebar({ searchTerm, setSearchTerm, statusFilter, setStatusFilter }: SidebarProps) {
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-64 lg:w-72 bg-white/50 dark:bg-black/20 border-r border-dark/5 dark:border-white/5 flex-col p-6 shrink-0 h-[calc(100vh-64px)] sticky top-16">
        <div className="mb-8">
          <h1 className="text-2xl font-serif tracking-tight text-dark dark:text-night-text">Admin Dashboard</h1>
          <p className="text-xs text-stone dark:text-night-muted mt-1">Researcher Portal</p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone/50 dark:text-night-muted/50" size={18} />
            <input
              type="text"
              placeholder="Search requests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/60 dark:bg-black/20 border border-dark/10 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-sage/50 transition-all text-dark dark:text-night-text text-sm"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-stone/50 dark:text-night-muted/50" size={18} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/60 dark:bg-black/20 border border-dark/10 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-sage/50 transition-all text-dark dark:text-night-text appearance-none text-sm"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Mobile Top Bar */}
      <div className="md:hidden p-4 bg-white/50 dark:bg-black/20 border-b border-dark/5 dark:border-white/5 sticky top-16 z-40 backdrop-blur-xl">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone/50 dark:text-night-muted/50" size={16} />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-white/60 dark:bg-black/20 border border-dark/10 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-sage/50 transition-all text-dark dark:text-night-text text-sm"
            />
          </div>
          <div className="relative w-1/3">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-stone/50 dark:text-night-muted/50" size={16} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-white/60 dark:bg-black/20 border border-dark/10 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-sage/50 transition-all text-dark dark:text-night-text appearance-none text-sm"
            >
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
}
