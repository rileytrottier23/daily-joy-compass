
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, BarChart2, Settings, MessageCircle } from 'lucide-react';

const BottomNav: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-around items-center h-16 bg-primary text-white border-t border-gray-200 z-10">
      <Link to="/" className={`flex flex-col items-center justify-center ${isActive('/') ? 'text-white' : 'text-white/70'}`}>
        <Home size={24} />
        <span className="text-xs mt-1">Home</span>
      </Link>
      <Link to="/calendar" className={`flex flex-col items-center justify-center ${isActive('/calendar') ? 'text-white' : 'text-white/70'}`}>
        <Calendar size={24} />
        <span className="text-xs mt-1">Calendar</span>
      </Link>
      <Link to="/chat" className={`flex flex-col items-center justify-center ${isActive('/chat') ? 'text-white' : 'text-white/70'}`}>
        <MessageCircle size={24} />
        <span className="text-xs mt-1">Chat</span>
      </Link>
      <Link to="/dashboard" className={`flex flex-col items-center justify-center ${isActive('/dashboard') ? 'text-white' : 'text-white/70'}`}>
        <BarChart2 size={24} />
        <span className="text-xs mt-1">Stats</span>
      </Link>
      <Link to="/settings" className={`flex flex-col items-center justify-center ${isActive('/settings') ? 'text-white' : 'text-white/70'}`}>
        <Settings size={24} />
        <span className="text-xs mt-1">Settings</span>
      </Link>
    </div>
  );
};

export default BottomNav;
