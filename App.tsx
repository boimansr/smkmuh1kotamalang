
import React, { useState, useEffect, useRef } from 'react';
import { 
  Bell, 
  User as UserIcon,
  ChevronDown,
  LayoutDashboard,
  Calendar,
  Users,
  MessageSquare,
  Settings,
  X,
  Clock,
  CheckCircle2,
  Info,
  TrendingUp
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import Sidebar from './components/Sidebar';
import { RealTimeClock, StatsCard, InfoCard } from './components/Widgets';
import AttendanceModule from './components/AttendanceModule';
import AcademicModule from './components/AcademicModule';
import ExamModule from './components/ExamModule';
import SettingsModule from './components/SettingsModule';
import { UserRole, User } from './types';
import { MOCK_STUDENT, ANNOUNCEMENTS } from './constants';

const MOCK_NOTIFICATIONS = [
  {
    id: 'n1',
    title: 'New Assignment: Web Dev',
    description: 'Teacher Anita uploaded a new task for React State Management.',
    time: '2 mins ago',
    image: 'https://picsum.photos/seed/task1/100/100',
    type: 'assignment'
  },
  {
    id: 'n2',
    title: 'Exam Schedule Update',
    description: 'The final semester exam for Multimedia has been moved to Dec 15.',
    time: '1 hour ago',
    image: 'https://picsum.photos/seed/exam/100/100',
    type: 'exam'
  },
  {
    id: 'n3',
    title: 'Attendance Verified',
    description: 'Your presence for Monday, 07 Oct has been successfully recorded.',
    time: '3 hours ago',
    image: 'https://picsum.photos/seed/verified/100/100',
    type: 'attendance'
  }
];

const ATTENDANCE_DATA = [
  { name: 'Present', value: 92, color: '#3b82f6' },
  { name: 'Late', value: 5, color: '#f59e0b' },
  { name: 'Absent', value: 3, color: '#ef4444' },
];

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  // Simulate authentication
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentUser(MOCK_STUDENT);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setActiveTab('dashboard');
  };

  const handleAvatarChange = (newAvatar: string) => {
    if (currentUser) {
      setCurrentUser({ ...currentUser, avatar: newAvatar });
    }
  };

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200 overflow-hidden border border-white">
            <div className="p-8 bg-blue-600 text-white text-center relative overflow-hidden">
               <div className="absolute top-[-10%] right-[-10%] w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-md relative z-10 border border-white/30">
                <span className="text-3xl font-bold">EP</span>
              </div>
              <h1 className="text-2xl font-bold relative z-10">EduPro SMK</h1>
              <p className="text-blue-100 text-sm mt-1 relative z-10 opacity-80">Vocational Excellence Portal</p>
            </div>
            <form onSubmit={handleLogin} className="p-8 space-y-6 bg-white">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Username</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-900 placeholder-slate-400"
                  placeholder="Enter username"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Password</label>
                <input 
                  type="password" 
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-900 placeholder-slate-400"
                  placeholder="••••••••"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                />
              </div>
              <button 
                type="submit"
                className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all active:scale-[0.98]"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between overflow-hidden relative theme-card">
                  <div className="z-10 relative">
                    <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 leading-tight theme-text">Hi, {currentUser?.name}!</h1>
                    <p className="text-slate-500 mt-2 text-sm md:text-base theme-text-muted">Ready for today's vocational challenges?</p>
                    <div className="mt-6 flex flex-wrap gap-2 md:gap-3">
                      <button 
                        onClick={() => setActiveTab('attendance')}
                        className="px-5 py-3 bg-blue-600 text-white rounded-2xl text-xs md:text-sm font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all no-invert"
                      >
                        Presence Access
                      </button>
                      <button 
                        onClick={() => setActiveTab('exams')}
                        className="px-5 py-3 bg-slate-50 text-slate-700 rounded-2xl text-xs md:text-sm font-bold border border-slate-200 hover:bg-white transition-all theme-card no-invert"
                      >
                        Check Exams
                      </button>
                    </div>
                  </div>
                  <div className="hidden lg:block absolute right-[-20px] bottom-[-20px] opacity-10">
                    <LayoutDashboard size={180} className="text-blue-600" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  <StatsCard 
                    title="Current Major" 
                    value="Software Eng. (RPL)" 
                    icon={<Users className="text-blue-600" size={20} />} 
                    color="bg-blue-50" 
                  />
                  <StatsCard 
                    title="Average Grade" 
                    value="3.85 / 4.0" 
                    icon={<Calendar className="text-green-600" size={20} />} 
                    color="bg-green-50" 
                  />
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <InfoCard title="Announcements" subtitle="Stay updated" icon={<Bell size={18} />}>
                    <div className="space-y-3">
                      {ANNOUNCEMENTS.map((ann) => (
                        <div key={ann.id} className="p-3 bg-slate-50 rounded-2xl border border-transparent hover:border-slate-200 cursor-pointer transition-all theme-card theme-divide">
                          <div className="flex justify-between mb-1">
                            <span className="text-[10px] uppercase font-extrabold text-blue-600 no-invert">{ann.category}</span>
                            <span className="text-[10px] text-slate-400 theme-text-muted">{ann.date}</span>
                          </div>
                          <h4 className="font-bold text-slate-800 text-xs md:text-sm theme-text">{ann.title}</h4>
                        </div>
                      ))}
                    </div>
                  </InfoCard>
                </div>
              </div>

              <div className="space-y-6">
                <RealTimeClock />
                
                {/* Student Attendance Diagram */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 theme-card">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-slate-800 theme-text">Attendance Diagram</h3>
                    <TrendingUp size={18} className="text-blue-600" />
                  </div>
                  <div className="h-[220px] w-full relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={ATTENDANCE_DATA}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                          stroke="none"
                        >
                          {ATTENDANCE_DATA.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-[-10px]">
                      <span className="text-2xl font-black text-slate-800 theme-text">92%</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest theme-text-muted">Presence</span>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {ATTENDANCE_DATA.map((item) => (
                      <div key={item.name} className="text-center">
                        <div className="flex items-center justify-center gap-1.5 mb-1">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                          <span className="text-[10px] font-bold text-slate-500 theme-text-muted">{item.name}</span>
                        </div>
                        <p className="text-xs font-bold text-slate-800 theme-text">{item.value}%</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'attendance':
        return <AttendanceModule />;
      case 'academic':
        return <AcademicModule />;
      case 'exams':
        return <ExamModule />;
      case 'settings':
        return currentUser ? <SettingsModule user={currentUser} onLogout={handleLogout} onAvatarChange={handleAvatarChange} /> : null;
      default:
        return (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
             <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
               <Settings size={32} />
             </div>
             <p className="font-medium">Coming soon!</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-300">
      <Sidebar 
        role={currentUser?.role || UserRole.STUDENT} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={handleLogout}
      />
      
      <div className="md:pl-64 min-h-screen transition-all duration-300 pb-28 md:pb-0">
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 md:px-8 py-3 md:py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm md:hidden no-invert">
                EP
             </div>
             <span className="font-bold text-slate-800 tracking-tight text-lg theme-text">EduPro SMK</span>
          </div>
          
          <div className="flex items-center gap-3 md:gap-6">
            <div className="relative" ref={notificationRef}>
              <button 
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <Bell size={24} />
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white shadow-sm no-invert"></span>
              </button>

              {/* Notification Box Bar (Dropdown) */}
              {isNotificationOpen && (
                <div className="absolute right-0 mt-3 w-80 md:w-96 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-[60] animate-in fade-in slide-in-from-top-2 duration-200 theme-card">
                  <div className="p-5 border-b border-slate-50 flex items-center justify-between bg-slate-50/50 theme-card-header">
                    <h3 className="font-bold text-slate-800 theme-text">Notifications</h3>
                    <button onClick={() => setIsNotificationOpen(false)} className="text-slate-400 hover:text-slate-600">
                      <X size={18} />
                    </button>
                  </div>
                  <div className="max-h-[400px] overflow-y-auto">
                    {MOCK_NOTIFICATIONS.map((notif) => (
                      <div key={notif.id} className="p-4 hover:bg-blue-50/50 transition-colors flex gap-4 border-b border-slate-50 last:border-0 group cursor-pointer theme-divide">
                        <div className="w-12 h-12 rounded-2xl overflow-hidden shrink-0 border border-slate-100 no-invert">
                          <img src={notif.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex justify-between items-start">
                            <h4 className="text-sm font-bold text-slate-800 leading-tight theme-text">{notif.title}</h4>
                            <span className="text-[10px] text-slate-400 whitespace-nowrap theme-text-muted">{notif.time}</span>
                          </div>
                          <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed theme-text-muted">{notif.description}</p>
                          <div className="flex items-center gap-2 pt-1 no-invert">
                            {notif.type === 'assignment' && <span className="text-[9px] font-bold px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full uppercase tracking-tighter">New Task</span>}
                            {notif.type === 'exam' && <span className="text-[9px] font-bold px-2 py-0.5 bg-amber-100 text-amber-600 rounded-full uppercase tracking-tighter">Urgent</span>}
                            {notif.type === 'attendance' && <span className="text-[9px] font-bold px-2 py-0.5 bg-green-100 text-green-600 rounded-full uppercase tracking-tighter">Verified</span>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full py-4 text-xs font-bold text-blue-600 hover:bg-slate-50 border-t border-slate-50 transition-all uppercase tracking-widest no-invert">
                    Mark All as Read
                  </button>
                </div>
              )}
            </div>
            
            <div className="h-6 md:h-8 w-px bg-slate-200 hidden sm:block theme-divide"></div>
            
            <div className="flex items-center gap-2 md:gap-3 cursor-pointer group">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-slate-800 leading-none theme-text">{currentUser?.name}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase mt-1 tracking-wider theme-text-muted">{currentUser?.role}</p>
              </div>
              <div className="relative">
                <img src={currentUser?.avatar} className="w-8 h-8 md:w-10 md:h-10 rounded-xl border-2 border-white shadow-md group-hover:ring-2 group-hover:ring-blue-400 transition-all no-invert" alt="" />
                <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full no-invert"></div>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 md:p-8 max-w-7xl mx-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
