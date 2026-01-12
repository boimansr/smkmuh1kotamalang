
import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, 
  QrCode, 
  History, 
  CheckCircle, 
  ShieldCheck,
  MapPin,
  Clock,
  AlertCircle
} from 'lucide-react';

const AttendanceModule: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const startCamera = async () => {
      if (isScanning) {
        setHasError(false);
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } } 
          });
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (err) {
          console.error("Error accessing camera:", err);
          setHasError(true);
          setIsScanning(false);
        }
      } else {
        stopCamera();
      }
    };

    startCamera();

    return () => {
      stopCamera();
    };
  }, [isScanning]);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-slate-800">Presence Access</h1>
        <p className="text-slate-500 text-sm">Use your unique QR code or Camera for identity verification.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Camera / QR Scanner Area */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center theme-card">
          <div className="w-full max-w-sm aspect-square bg-slate-900 rounded-3xl relative overflow-hidden group shadow-2xl">
            {isScanning ? (
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-black">
                <video 
                  ref={videoRef}
                  autoPlay 
                  playsInline 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)] animate-pulse" style={{ top: 'auto', bottom: '0', animation: 'scan 2s infinite linear' }}></div>
              </div>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8">
                {hasError ? (
                  <>
                    <AlertCircle size={64} className="mb-4 text-red-400" />
                    <p className="text-sm font-medium text-red-200">Camera Access Denied</p>
                    <p className="text-[10px] opacity-60 mt-2">Please enable camera permissions in your browser settings.</p>
                  </>
                ) : (
                  <>
                    <Camera size={64} className="mb-4 text-blue-400 opacity-20" />
                    <p className="text-sm font-medium opacity-60">Ready to Scan</p>
                  </>
                )}
              </div>
            )}
            
            {/* Scanning UI Overlays */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-blue-500 rounded-tl-lg pointer-events-none"></div>
            <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-blue-500 rounded-tr-lg pointer-events-none"></div>
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-blue-500 rounded-bl-lg pointer-events-none"></div>
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-blue-500 rounded-br-lg pointer-events-none"></div>
          </div>

          <div className="mt-8 flex gap-4 w-full max-w-sm">
            <button 
              onClick={() => setIsScanning(!isScanning)}
              className={`flex-1 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg transition-all active:scale-95 no-invert ${
                isScanning 
                ? 'bg-slate-100 text-slate-600 hover:bg-slate-200 shadow-slate-200' 
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200'
              }`}
            >
              <QrCode size={20} />
              {isScanning ? 'Cancel Scan' : 'Scan My QR'}
            </button>
          </div>
          <p className="mt-4 text-[10px] text-slate-400 flex items-center gap-1 uppercase tracking-widest font-bold theme-text-muted">
            <ShieldCheck size={12} className="text-green-500" />
            Secure Verification Active
          </p>
        </div>

        {/* Status & Stats */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 theme-card">
             <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 theme-text">
               <History size={18} className="text-blue-600" />
               Recent Presence
             </h3>
             <div className="space-y-3">
               {[
                 { date: 'Today, 07 Oct', time: '06:55 AM', status: 'In-Time', location: 'Gate A' },
                 { date: 'Yesterday, 06 Oct', time: '07:02 AM', status: 'Late', location: 'Gate B' },
                 { date: 'Fri, 04 Oct', time: '06:48 AM', status: 'In-Time', location: 'Gate A' },
               ].map((item, i) => (
                 <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl theme-divide theme-card">
                   <div className="flex items-center gap-3">
                     <div className={`p-2 rounded-xl no-invert ${item.status === 'In-Time' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
                        <CheckCircle size={18} />
                     </div>
                     <div>
                       <p className="text-sm font-bold text-slate-800 theme-text">{item.date}</p>
                       <p className="text-[10px] text-slate-500 flex items-center gap-2 mt-0.5 theme-text-muted">
                         <span className="flex items-center gap-1"><Clock size={10} /> {item.time}</span>
                         <span className="flex items-center gap-1"><MapPin size={10} /> {item.location}</span>
                       </p>
                     </div>
                   </div>
                   <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full no-invert ${
                     item.status === 'In-Time' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                   }`}>
                     {item.status}
                   </span>
                 </div>
               ))}
             </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-3xl text-white shadow-xl relative overflow-hidden no-invert">
             <div className="z-10 relative">
               <h3 className="font-bold mb-1">Weekly Summary</h3>
               <p className="text-[10px] text-slate-400 mb-6 uppercase tracking-tighter">Week 42 • Semester 1</p>
               
               <div className="grid grid-cols-2 gap-4">
                 <div>
                   <p className="text-2xl font-bold">100%</p>
                   <p className="text-[10px] text-slate-400 font-bold uppercase">Presence</p>
                 </div>
                 <div>
                   <p className="text-2xl font-bold">2</p>
                   <p className="text-[10px] text-slate-400 font-bold uppercase">Late Incidents</p>
                 </div>
               </div>
             </div>
             <QrCode size={100} className="absolute bottom-[-20px] right-[-20px] text-white/5 rotate-12" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { top: 0; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default AttendanceModule;
