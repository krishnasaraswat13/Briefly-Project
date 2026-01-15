import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Bell, User, Menu } from 'lucide-react';

const Header = ({ toggleSidebar }) => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full h-16 backdrop-blur-xl border-b border-primary/30 shadow-lg shadow-primary/10">
      <div className="flex items-center justify-between h-full px-4">
        {/* Mobile Menu */}
        <button
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg hover:bg-primary/10 transition-colors"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <Menu size={24} className="text-primary" />
        </button>

        <div className="hidden md:block"></div>

        <div className="flex items-center gap-3">
          <button className="relative inline-flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 bg-primary/20 hover:bg-primary/30 border border-primary/30">
            <Bell
              size={20}
              strokeWidth={2}
              className="text-primary group-hover:scale-110 transition-transform duration-200"
            />

            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full animate-pulse"></span>
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-3 border-l border-primary/30 pl-3">
            <div className="flex items-center gap-3 px-3 py-1.5 rounded-xl transition-colors duration-200 cursor-pointer group hover:bg-primary/10">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-primary to-secondary transition-all duration-200">
                <User size={18} strokeWidth={2.5} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-light">{user?.username || 'User'}</p>
                <p className="text-xs text-primary/70">{user?.email || 'user@example.com'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
