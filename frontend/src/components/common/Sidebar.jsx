import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';
import { LayoutDashboard, FileText, User, LogOut, Brain, X, Dock, Sun, Moon } from 'lucide-react';

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    {
      to: '/dashboard',
      icon: LayoutDashboard,
      text: 'Dashboard',
    },
    {
      to: '/documents',
      icon: FileText,
      text: 'Documents',
    },
    {
      to: '/flashcards',
      icon: Dock,
      text: 'Flashcards',
    },
    {
      to: '/profile',
      icon: User,
      text: 'Profile',
    },
  ];

  return (
    <>
      <div
        className={`fixed inset-0 z-40 md: hidden transition-opacity duration-200 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={toggleSidebar}
        aria-hidden="true"
      ></div>

      <aside
        className={`fixed top-0 left-0 h-full w-64 glass-panel z-50 md:relative md:w-64 md:shrink-0 md:flex md:flex-col md:translate-x-0 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Logo and Close button for mobile */}
        <div className="flex items-center justify-between h-16 px-2 border-b border-white/5">
          <div className="flex items-center gap-3 pl-2">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl shadow-[0_0_15px_rgba(124,58,237,0.4)] bg-primary animate-pulse-glow">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl md:text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary">Briefly.</h1>
          </div>
          <button onClick={toggleSidebar} className="md:hidden text-foreground/70 hover:text-foreground transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={toggleSidebar}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${isActive ? 'bg-gradient-to-r from-primary/80 to-secondary/80 shadow-[0_4px_20px_rgba(124,58,237,0.3)] text-white' : 'text-foreground/70 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5'}`
              }
            >
              {({ isActive }) => (
                <>
                  <link.icon
                    size={20}
                    strokeWidth={isActive ? 2.5 : 2}
                    className={`transition-all duration-300 mr-2 ${isActive ? 'text-white' : 'text-foreground/50 group-hover:scale-110 group-hover:text-primary'}`}
                  />
                  {link.text}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Theme and Logout Section */}
        <div className="px-3 py-4 border-t border-border space-y-2">
          <button
            onClick={toggleTheme}
            className="group flex items-center justify-between w-full px-4 py-3 text-sm font-semibold text-foreground/70 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              {theme === 'dark' ? (
                <Moon size={20} strokeWidth={2} className="text-foreground/50 group-hover:text-primary transition-colors" />
              ) : (
                <Sun size={20} strokeWidth={2} className="text-foreground/50 group-hover:text-accent transition-colors" />
              )}
              <span>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
            </div>
          </button>
          
          <button
            onClick={handleLogout}
            className="group flex items-center gap-3 w-full px-4 py-3 text-sm font-semibold text-foreground/70 hover:text-white hover:bg-red-500/90 hover:shadow-[0_4px_20px_rgba(239,68,68,0.4)] rounded-xl transition-all duration-300 cursor-pointer"
          >
            <LogOut
              size={20}
              strokeWidth={2}
              className="transition-transform duration-300 mr-2 group-hover:scale-110 text-foreground/50 group-hover:text-white"
            />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
