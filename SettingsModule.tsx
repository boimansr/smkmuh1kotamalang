
import React, { useState, useEffect, useRef } from 'react';
import { 
  Moon, 
  Sun, 
  MessageCircle, 
  LogOut, 
  Smartphone,
  Info,
  Camera
} from 'lucide-react';
import { User as UserType } from '../types';

interface SettingsModuleProps {
  user: UserType;
  onLogout: () => void;
  onAvatarChange: (newAvatar: string) => void;
}

const SettingsModule: React.FC<SettingsModuleProps> = ({ user, onLogout, onAvatarChange }) => {
  const [theme, setTheme] = useState<'light' | 'black'>('light');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (theme === 'black') {
      document.documentElement.classList.add('black-theme');
      document.body.style.backgroundColor = '#000000';
    } else {
      document.documentElement.classList.remove('black-theme');
      document.body.style.backgroundColor = '#f8fafc';
    }
  }, [theme]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onAvatarChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const adminWhatsApp = "https://wa.me/6281234567890?text=Hello%20EduPro%20Admin,%20I%20need%20help%20with%20my%20account.";

  return (
    <div className="space-y-6 pb-24">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-slate-800 theme-text">Settings</h1>
        <p className="text-slate-500 text-sm theme-text-muted">Manage your account preferences and application theme.</p>
      </div>

      {/* Profile Box with Photo Upload */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 theme-card">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
            <img 
              src={user.avatar} 
              alt="Profile" 
              className="w-24 h-24 rounded-3xl object-cover border-4 border-slate-50 shadow-md group-hover:opacity-80 transition-opacity" 
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="text-white" size={24} />
            </div>
            <div className="absolute -bottom-2 -right-2 p-2 bg-blue-600 text-white rounded-xl border-4 border-white shadow-lg">
               <Camera size={14} />
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="hidden" 
              accept="image/*"
            />
          </div>
          <div className="text-center sm:text-left flex-1">
            <h3 className="text-xl font-bold text-slate-800 theme-text">{user.name}</h3>
            <p className="text-sm text-slate-500 font-medium theme-text-muted">{user.email}</p>
            <div className="mt-3 flex flex-wrap justify-center sm:justify-start gap-2">
              <span className="text-[10px] font-bold px-3 py-1 bg-blue-50 text-blue-600 rounded-full uppercase tracking-wider no-invert">
                {user.role}
              </span>
              <span className="text-[10px] font-bold px-3 py-1 bg-slate-50 text-slate-400 rounded-full uppercase tracking-wider no-invert">
                {user.nisn || user.nip || 'ID-001'}
              </span>
            </div>
            <p className="text-[10px] text-slate-400 mt-3 font-medium italic theme-text-muted">Tap photo to upload new image</p>
          </div>
        </div>
      </div>

      {/* Appearance Box (Black Theme Toggle) */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden theme-card">
        <div className="p-4 bg-slate-50/50 border-b border-slate-50 theme-card-header">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 theme-text">
            <Smartphone size={18} className="text-blue-600" />
            Appearance
          </h3>
        </div>
        <div className="p-4">
          <div className="flex gap-3">
            <button 
              onClick={() => setTheme('light')}
              className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-2xl transition-all border-2 ${theme === 'light' ? 'bg-blue-50 border-blue-200 shadow-sm' : 'bg-slate-50 border-transparent hover:bg-slate-100'}`}
            >
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-amber-500 border border-slate-100">
                <Sun size={24} />
              </div>
              <span className={`text-xs font-bold ${theme === 'light' ? 'text-blue-600' : 'text-slate-500'}`}>Light Mode</span>
            </button>
            <button 
              onClick={() => setTheme('black')}
              className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-2xl transition-all border-2 ${theme === 'black' ? 'bg-slate-900 border-slate-700 shadow-lg' : 'bg-slate-50 border-transparent hover:bg-slate-100'}`}
            >
              <div className="w-12 h-12 bg-black rounded-xl shadow-sm flex items-center justify-center text-blue-400 border border-slate-800">
                <Moon size={24} />
              </div>
              <span className={`text-xs font-bold ${theme === 'black' ? 'text-blue-400' : 'text-slate-500'}`}>Black Mode</span>
            </button>
          </div>
        </div>
      </div>

      {/* Support Box (WhatsApp) */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden theme-card">
        <div className="p-4 bg-slate-50/50 border-b border-slate-50 theme-card-header">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 theme-text">
            <Info size={18} className="text-blue-600" />
            Help & Support
          </h3>
        </div>
        <div className="p-6">
          <p className="text-xs text-slate-500 mb-6 leading-relaxed theme-text-muted">
            Having trouble with your account or found a technical issue? Our admin team is available via WhatsApp for immediate assistance.
          </p>
          <a 
            href={adminWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 bg-[#25D366] text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-green-100 active:scale-[0.98] transition-all hover:bg-[#128C7E] no-invert"
          >
            <MessageCircle size={20} />
            Contact Admin WhatsApp
          </a>
        </div>
      </div>

      {/* Logout Menu at Bottom */}
      <div className="bg-red-50 p-4 rounded-3xl border border-red-100 mt-8 no-invert">
        <button 
          onClick={onLogout}
          className="w-full py-4 bg-white text-red-600 rounded-2xl font-bold flex items-center justify-center gap-3 border border-red-100 shadow-sm active:scale-[0.98] transition-all hover:bg-red-600 hover:text-white group"
        >
          <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
          Sign Out of Account
        </button>
        <p className="text-center text-[10px] text-red-400 mt-3 font-medium uppercase tracking-widest">
          Build v2.4.0 • Secured Session
        </p>
      </div>

      <style>{`
        /* Black Theme Styles */
        .black-theme {
          color-scheme: dark;
        }
        .black-theme .theme-text {
          color: #ffffff !important;
        }
        .black-theme .theme-text-muted {
          color: #94a3b8 !important;
        }
        .black-theme .theme-card {
          background-color: #111111 !important;
          border-color: #222222 !important;
          box-shadow: none !important;
        }
        .black-theme .theme-card-header {
          background-color: #1a1a1a !important;
          border-color: #222222 !important;
        }
        .black-theme .theme-divide > * {
          border-color: #222222 !important;
        }
        .black-theme .theme-divide button:hover {
          background-color: #1a1a1a !important;
        }
        .black-theme input, .black-theme select {
          background-color: #1a1a1a !important;
          color: #ffffff !important;
          border-color: #333333 !important;
        }
        .black-theme header {
          background-color: rgba(0,0,0,0.85) !important;
          border-color: #222222 !important;
        }
        .black-theme .bg-white {
          background-color: #111111 !important;
        }
        .black-theme .bg-slate-50 {
          background-color: #0a0a0a !important;
        }
        .black-theme .border-slate-100, .black-theme .border-slate-200 {
          border-color: #222222 !important;
        }
        /* Components that shouldn't change in black mode */
        .black-theme .no-invert {
          filter: none !important;
        }
      `}</style>
    </div>
  );
};

export default SettingsModule;
