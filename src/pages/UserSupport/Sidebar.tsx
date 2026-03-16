import React from 'react';
import { MessageSquare, User, FileText, LogOut, LogIn } from 'lucide-react';
import { User as FirebaseUser } from 'firebase/auth';

interface SidebarProps {
  activeTab: 'new' | 'my_requests' | 'public_board';
  setActiveTab: (tab: 'new' | 'my_requests' | 'public_board') => void;
  user: FirebaseUser | null;
  handleLogin: () => void;
  handleLogout: () => void;
}

export function Sidebar({ activeTab, setActiveTab, user, handleLogin, handleLogout }: SidebarProps) {
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-64 lg:w-72 bg-white/50 dark:bg-black/20 border-r border-dark/5 dark:border-white/5 flex-col p-6 shrink-0 h-[calc(100vh-64px)] sticky top-16">
        <div className="mb-8">
          <h1 className="text-2xl font-serif tracking-tight text-dark dark:text-night-text">Project Hub</h1>
          <p className="text-xs text-stone dark:text-night-muted mt-1">Research Collaboration</p>
        </div>

        <div className="flex flex-col gap-2 mb-auto">
          <button
            onClick={() => setActiveTab('new')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'new' ? 'bg-sage text-white shadow-sm' : 'text-stone dark:text-night-muted hover:bg-white/50 dark:hover:bg-black/20 hover:text-dark dark:hover:text-night-text'}`}
          >
            <MessageSquare size={18} />
            <span>New Request</span>
          </button>
          <button
            onClick={() => setActiveTab('my_requests')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'my_requests' ? 'bg-sage text-white shadow-sm' : 'text-stone dark:text-night-muted hover:bg-white/50 dark:hover:bg-black/20 hover:text-dark dark:hover:text-night-text'}`}
          >
            <User size={18} />
            <span>My Requests</span>
          </button>
          <button
            onClick={() => setActiveTab('public_board')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'public_board' ? 'bg-sage text-white shadow-sm' : 'text-stone dark:text-night-muted hover:bg-white/50 dark:hover:bg-black/20 hover:text-dark dark:hover:text-night-text'}`}
          >
            <FileText size={18} />
            <span>Public Board</span>
          </button>
        </div>

        <div className="mt-8 pt-4 border-t border-dark/5 dark:border-white/5">
          {user ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 truncate">
                <div className="w-8 h-8 rounded-full bg-sage/20 text-sage flex items-center justify-center font-medium shrink-0">
                  {user.displayName?.charAt(0) || user.email?.charAt(0)}
                </div>
                <div className="truncate">
                  <p className="text-sm font-medium text-dark dark:text-night-text truncate">{user.displayName}</p>
                  <p className="text-xs text-stone dark:text-night-muted truncate">{user.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg text-stone dark:text-night-muted hover:text-dark dark:hover:text-night-text hover:bg-white/50 dark:hover:bg-black/20 transition-all shrink-0"
                title="Log Out"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="w-full flex items-center justify-center gap-2 bg-dark text-white dark:bg-white dark:text-dark px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-dark/90 dark:hover:bg-white/90 transition-colors"
            >
              <LogIn size={16} />
              Sign In
            </button>
          )}
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-t border-dark/10 dark:border-white/10 pb-safe">
        <div className="flex justify-around items-center p-2">
          <button
            onClick={() => setActiveTab('new')}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${activeTab === 'new' ? 'text-sage' : 'text-stone dark:text-night-muted'}`}
          >
            <MessageSquare size={20} />
            <span className="text-[10px] font-medium">New</span>
          </button>
          <button
            onClick={() => setActiveTab('my_requests')}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${activeTab === 'my_requests' ? 'text-sage' : 'text-stone dark:text-night-muted'}`}
          >
            <User size={20} />
            <span className="text-[10px] font-medium">Mine</span>
          </button>
          <button
            onClick={() => setActiveTab('public_board')}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${activeTab === 'public_board' ? 'text-sage' : 'text-stone dark:text-night-muted'}`}
          >
            <FileText size={20} />
            <span className="text-[10px] font-medium">Public</span>
          </button>
          {user ? (
            <button
              onClick={handleLogout}
              className="flex flex-col items-center gap-1 p-2 rounded-xl transition-all text-stone dark:text-night-muted"
            >
              <LogOut size={20} />
              <span className="text-[10px] font-medium">Logout</span>
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className="flex flex-col items-center gap-1 p-2 rounded-xl transition-all text-stone dark:text-night-muted"
            >
              <LogIn size={20} />
              <span className="text-[10px] font-medium">Login</span>
            </button>
          )}
        </div>
      </div>
    </>
  );
}
