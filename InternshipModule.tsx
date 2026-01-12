import React from 'react';
import { 
  Building2, 
  MapPin, 
  Users, 
  FileText, 
  CheckCircle2, 
  ExternalLink, 
  Search, 
  ArrowRight,
  // Fixed: Added missing icon imports
  Calendar,
  Clock
} from 'lucide-react';
import { COMPANIES } from '../constants';

const InternshipModule: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Internship Program (PKL)</h1>
          <p className="text-slate-500">Professional industry experience preparation and tracking.</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search industry partner..." 
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none w-64"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {COMPANIES.map((company) => (
              <div key={company.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-blue-50 p-3 rounded-2xl text-blue-600">
                    <Building2 size={24} />
                  </div>
                  <span className={`text-[10px] uppercase font-bold px-3 py-1 rounded-full ${
                    company.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {company.available ? 'Slots Available' : 'Slots Full'}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-800">{company.name}</h3>
                <p className="text-sm text-slate-500 font-medium">{company.industry}</p>
                <div className="mt-4 flex items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1"><MapPin size={14} /> {company.location}</span>
                  <span className="flex items-center gap-1"><Users size={14} /> {company.slots} Quota</span>
                </div>
                <div className="mt-6 flex gap-2">
                  <button className="flex-1 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors">
                    Apply Now
                  </button>
                  <button className="p-2 border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50 transition-colors">
                    <ExternalLink size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
              <FileText size={20} className="text-blue-600" />
              PKL Logbook & Reporting
            </h3>
            <div className="space-y-4">
              {[
                { week: 1, topic: 'Introduction to Production System', status: 'Approved', date: 'Oct 01, 2024' },
                { week: 2, topic: 'Backend API Development with Node.js', status: 'Pending', date: 'Oct 08, 2024' },
              ].map((log, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-lg flex flex-col items-center justify-center border border-slate-100">
                      <span className="text-[10px] text-slate-400 font-bold">WEEK</span>
                      <span className="text-lg font-bold text-blue-600 leading-none">{log.week}</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">{log.topic}</h4>
                      <p className="text-xs text-slate-500">{log.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${
                      log.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {log.status}
                    </span>
                    <button className="text-blue-600 hover:underline text-xs font-semibold">Edit Log</button>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 border-2 border-dashed border-slate-200 text-slate-400 rounded-xl text-sm font-medium hover:border-blue-300 hover:text-blue-500 transition-colors">
              + New Weekly Log Entry
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 rounded-2xl p-6 text-white">
            <h3 className="font-bold text-lg mb-4">Required Documents</h3>
            <ul className="space-y-4">
              {[
                { name: 'Application Letter', done: true },
                { name: 'Recommendation Form', done: true },
                { name: 'Internship Agreement', done: false },
                { name: 'Parent Approval', done: false },
              ].map((doc, i) => (
                <li key={i} className="flex items-center justify-between text-sm">
                  <span className={doc.done ? 'text-white/60 line-through' : ''}>{doc.name}</span>
                  {doc.done ? (
                    <CheckCircle2 size={16} className="text-green-400" />
                  ) : (
                    <button className="text-blue-400 font-bold hover:underline">Upload</button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-lg shadow-blue-200">
            <h3 className="font-bold text-lg mb-2">Pre-PKL Seminar</h3>
            <p className="text-sm text-blue-100 mb-6">Learn how to conduct yourself in a professional environment.</p>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs">
                <Calendar size={14} /> Oct 12, 2024
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Clock size={14} /> 08:00 AM - 12:00 PM
              </div>
            </div>
            <button className="w-full mt-6 py-2 bg-white text-blue-600 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-blue-50">
              Register Now <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternshipModule;