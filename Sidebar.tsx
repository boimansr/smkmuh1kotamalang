
import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  CheckCircle, 
  Settings,
  LogOut,
  FileText
} from 'lucide-react';
import { UserRole } from '../types';

const SCHOOL_LOGO = "https://upload.wikimedia.org/wikipedia/id/3/36/Logo_SMK_Bisa_Hebat.png";

interface SidebarProps {
  role: UserRole;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ role, activeTab, setActiveTab, onLogout }) => {
  const menuItems = [
    { id: 'dashboard', icon: <LayoutDashboard size={20} />, label: 'Home', roles: [UserRole.STUDENT, UserRole.TEACHER, UserRole.ADMIN] },
    { id: 'academic', icon: <BookOpen size={20} />, label: 'Academy', roles: [UserRole.STUDENT, UserRole.TEACHER] },
    { id: 'attendance', icon: <CheckCircle size={20} />, label: 'Scan', roles: [UserRole.STUDENT, UserRole.TEACHER] },
    { id: 'exams', icon: <FileText size={20} />, label: 'Exams', roles: [UserRole.STUDENT, UserRole.TEACHER] },
  ];

  const filteredItems = menuItems.filter(item => item.roles.includes(role));

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col h-full bg-white border-r border-slate-200 w-64 fixed left-0 top-0 transition-all duration-300 z-50 theme-card">
        <div className="p-6 flex items-center gap-3">
          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center p-2 shadow-md border border-slate-100 no-invert">
            <img src={SCHOOL_LOGO} alt="SMK Bisa Hebat" className="w-full h-full object-contain" />
          </div>
          <span className="text-xl font-bold text-slate-800 theme-text">EduPro <span className="text-blue-600 no-invert">SMK</span></span>
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-4">
          {filteredItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-blue-50 text-blue-600 shadow-sm no-invert'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800 theme-text-muted'
              }`}
            >
              <div className={activeTab === item.id ? 'no-invert' : ''}>{item.icon}</div>
              {item.label}
            </button>
          ))}
          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
              activeTab === 'settings'
                ? 'bg-blue-50 text-blue-600 shadow-sm no-invert'
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800 theme-text-muted'
            }`}
          >
            <div className={activeTab === 'settings' ? 'no-invert' : ''}><Settings size={20} /></div>
            Settings
          </button>
        </nav>

        <div className="p-4 border-t border-slate-100 theme-divide">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all duration-200 no-invert"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Bottom Navigation - Centered & Optimized Sizing */}
      <div className="md:hidden fixed bottom-6 left-0 right-0 flex justify-center px-4 z-50">
        <div className="bg-white/90 backdrop-blur-xl border border-white/50 shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-2xl flex items-center justify-between p-1.5 w-full max-w-sm theme-card">
          {filteredItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center flex-1 py-2 px-1 rounded-xl transition-all duration-300 ${
                activeTab === item.id ? 'text-blue-600 no-invert' : 'text-slate-400 theme-text-muted'
              }`}
            >
              <div className={`p-2 rounded-xl transition-all ${activeTab === item.id ? 'bg-blue-100/50 scale-110 shadow-sm no-invert' : ''}`}>
                {React.cloneElement(item.icon as React.ReactElement, { size: 18 })}
              </div>
              <span className="text-[9px] font-bold mt-1 tracking-tight">{item.label}</span>
            </button>
          ))}
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex flex-col items-center justify-center flex-1 py-2 px-1 rounded-xl transition-all duration-300 ${
              activeTab === 'settings' ? 'text-blue-600 no-invert' : 'text-slate-400 theme-text-muted'
            }`}
          >
            <div className={`p-2 rounded-xl transition-all ${activeTab === 'settings' ? 'bg-blue-100/50 scale-110 shadow-sm no-invert' : ''}`}>
              <Settings size={18} />
            </div>
            <span className="text-[9px] font-bold mt-1 tracking-tight">Settings</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
