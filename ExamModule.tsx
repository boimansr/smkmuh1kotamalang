
import React, { useState } from 'react';
import { QrCode, ExternalLink, BookOpen, Clock, FileText, CheckCircle } from 'lucide-react';
import { MAJORS } from '../constants';

const ExamModule: React.FC = () => {
  const [selectedMajor, setSelectedMajor] = useState(MAJORS[0].id);

  const mockExams = [
    { id: 'e1', subject: 'Adaptive Web Design', time: '08:00 - 10:00', date: 'Dec 12, 2024', status: 'Available' },
    { id: 'e2', subject: 'Advanced Backend Systems', time: '10:30 - 12:30', date: 'Dec 12, 2024', status: 'Upcoming' },
    { id: 'e3', subject: 'Cloud Infrastructure', time: '08:00 - 10:00', date: 'Dec 13, 2024', status: 'Upcoming' },
  ];

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-slate-800">Semester Exams</h1>
        <p className="text-slate-500 text-sm">Access your exam papers and schedules securely.</p>
      </div>

      {/* 6 Majors Bar */}
      <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-100 overflow-x-auto no-scrollbar">
        <div className="flex gap-2 min-w-max">
          {MAJORS.map((major) => (
            <button
              key={major.id}
              onClick={() => setSelectedMajor(major.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedMajor === major.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                  : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
              }`}
            >
              {major.code}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-bold text-slate-800 flex items-center gap-2 px-1">
            <BookOpen size={18} className="text-blue-600" />
            Today's Exams
          </h3>
          {mockExams.map((exam) => (
            <div key={exam.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-200 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                  <FileText size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">{exam.subject}</h4>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-3">
                    <span className="flex items-center gap-1"><Clock size={12} /> {exam.time}</span>
                    <span className="flex items-center gap-1"><BookOpen size={12} /> {exam.date}</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  exam.status === 'Available' 
                  ? 'bg-green-600 text-white hover:bg-green-700' 
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}>
                  {exam.status === 'Available' ? 'Start Exam' : 'Locked'}
                </button>
                <button className="p-2 bg-slate-50 text-slate-400 rounded-xl hover:text-blue-600 transition-colors">
                  <ExternalLink size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center">
            <div className="inline-block p-3 bg-blue-50 rounded-2xl text-blue-600 mb-4">
              <QrCode size={32} />
            </div>
            <h3 className="font-bold text-slate-800 mb-2">Exam Question QR</h3>
            <p className="text-xs text-slate-500 mb-6 px-4">Scan this code at the exam hall to download the digital question sheet.</p>
            
            <div className="relative aspect-square max-w-[200px] mx-auto bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden">
               <img 
                 src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=EduPro-Exam-12345" 
                 alt="Exam QR Code"
                 className="w-[80%] h-[80%] opacity-80"
               />
               <div className="absolute inset-0 border-4 border-white pointer-events-none rounded-2xl"></div>
            </div>
            
            <p className="text-[10px] text-slate-400 mt-4 font-mono">TOKEN: EXM-2024-V3</p>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl text-white shadow-xl">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <CheckCircle size={18} className="text-green-400" />
              Exam Rules
            </h3>
            <ul className="space-y-3 text-[11px] text-slate-400">
              <li className="flex gap-2"><span>•</span> No external devices permitted.</li>
              <li className="flex gap-2"><span>•</span> System logs active sessions.</li>
              <li className="flex gap-2"><span>•</span> Tab switching is restricted.</li>
              <li className="flex gap-2"><span>•</span> Ensure stable internet connection.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamModule;
