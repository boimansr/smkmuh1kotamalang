
import React from 'react';
import { 
  Calendar, 
  Award, 
  Clock, 
  FileCheck, 
  ChevronRight, 
  Trophy,
  Dribbble,
  Code,
  ShieldAlert,
  Users
} from 'lucide-react';
import { ASSIGNMENTS, MAJORS } from '../constants';

const AcademicModule: React.FC = () => {
  const extracurriculars = [
    { id: 1, name: 'Pramuka (Scouts)', icon: <ShieldAlert size={20} />, members: 120, color: 'bg-amber-50 text-amber-600' },
    { id: 3, name: 'Futsal & Basket', icon: <Dribbble size={20} />, members: 85, color: 'bg-orange-50 text-orange-600' },
    { id: 4, name: 'Robotics & Dev', icon: <Code size={20} />, members: 30, color: 'bg-emerald-50 text-emerald-600' },
    { id: 5, name: 'Red Cross (PMR)', icon: <Trophy size={20} />, members: 55, color: 'bg-red-50 text-red-600' },
  ];

  return (
    <div className="space-y-8 pb-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 theme-text">Academic</h1>
          <p className="text-slate-500 text-sm theme-text-muted">Track your subjects, grades, and school life.</p>
        </div>
      </div>

      {/* Extracurricular Activities Row */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-bold text-slate-800 flex items-center gap-2 text-sm md:text-base theme-text">
            <Users size={18} className="text-blue-600" />
            Extracurricular Activities
          </h3>
          <span className="text-[10px] font-bold text-slate-400 theme-text-muted uppercase tracking-widest">Active Memberships</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {extracurriculars.map((activity) => (
            <div 
              key={activity.id} 
              className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer theme-card text-center flex flex-col items-center justify-center group"
            >
              <div className={`w-12 h-12 rounded-2xl ${activity.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform no-invert shadow-sm`}>
                {activity.icon}
              </div>
              <h4 className="text-[11px] font-black text-slate-800 theme-text uppercase tracking-tight leading-tight line-clamp-2 min-h-[2.5rem] flex items-center justify-center">
                {activity.name}
              </h4>
              <p className="text-[9px] text-slate-400 font-bold mt-1 theme-text-muted">
                {activity.members} Members
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden theme-card">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between theme-card-header">
              <h3 className="font-bold text-slate-800 flex items-center gap-2 text-sm md:text-base theme-text">
                <Calendar size={18} className="text-blue-600" />
                Schedule
              </h3>
              <span className="text-[10px] font-bold text-slate-400 bg-white px-3 py-1 rounded-full shadow-sm theme-card theme-text-muted no-invert">
                Mon, 7 Oct
              </span>
            </div>
            <div className="divide-y divide-slate-50 theme-divide">
              {[
                { time: '07:00 - 09:00', subject: 'Web Development', room: 'Lab RPL 2', teacher: 'Anita W.' },
                { time: '09:15 - 11:15', subject: 'UI/UX Design', room: 'Lab RPL 1', teacher: 'Anita W.' },
                { time: '12:30 - 14:30', subject: 'Product Management', room: 'Class XII', teacher: 'Bambang S.' },
              ].map((item, i) => (
                <div key={i} className="p-4 hover:bg-slate-50 transition-colors flex items-center gap-4">
                  <div className="text-[10px] md:text-xs font-extrabold text-blue-600 w-24 shrink-0 no-invert">{item.time}</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-800 text-sm theme-text">{item.subject}</h4>
                    <p className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5 theme-text-muted">
                      <Clock size={10} /> {item.room} • {item.teacher}
                    </p>
                  </div>
                  <ChevronRight size={16} className="text-slate-300" />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-4 md:p-6 theme-card">
            <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2 text-sm md:text-base theme-text">
              <FileCheck size={18} className="text-indigo-600" />
              Assignments
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              {ASSIGNMENTS.map((as) => (
                <div key={as.id} className="p-4 rounded-2xl border border-slate-100 hover:border-blue-200 transition-all cursor-pointer theme-card">
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-[9px] uppercase font-extrabold px-2 py-0.5 rounded-full no-invert ${
                      as.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                      as.status === 'Submitted' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {as.status}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium theme-text-muted">{as.dueDate}</span>
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm mb-1 line-clamp-1 theme-text">{as.title}</h4>
                  <p className="text-[11px] text-slate-500 theme-text-muted">{as.subject}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-6 text-white shadow-xl no-invert">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Award size={22} />
              Performance
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="opacity-80 uppercase tracking-widest">GPA (IPK)</span>
                  <span>3.85 / 4.0</span>
                </div>
                <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                  <div className="bg-white h-full rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-6">
                <div className="bg-white/10 p-3 rounded-xl backdrop-blur-md border border-white/10">
                  <p className="text-[9px] uppercase text-white/60 font-bold tracking-widest">Credits</p>
                  <p className="text-lg font-bold">24</p>
                </div>
                <div className="bg-white/10 p-3 rounded-xl backdrop-blur-md border border-white/10">
                  <p className="text-[9px] uppercase text-white/60 font-bold tracking-widest">Rank</p>
                  <p className="text-lg font-bold">3 / 36</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-4 md:p-6 theme-card">
            <h3 className="font-bold text-slate-800 mb-4 text-sm md:text-base theme-text">Major Info</h3>
            <div className="space-y-3">
              {MAJORS.slice(0, 2).map((m) => (
                <div key={m.id} className="group p-3 hover:bg-slate-50 rounded-2xl transition-all cursor-pointer border border-transparent hover:border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-[10px] no-invert">
                      {m.code}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors theme-text">{m.name}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5 theme-text-muted">{m.headOfDepartment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicModule;
