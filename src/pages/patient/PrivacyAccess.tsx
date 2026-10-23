import React, { useState } from 'react';
import { accessLogs } from '../../data/hospital';
import { ShieldCheck, Eye, EyeOff, Clock, Building2, AlertTriangle, Lock, User, CheckCircle } from 'lucide-react';

const PrivacyAccess: React.FC = () => {
  const [revoked, setRevoked] = useState<string[]>([]);

  const handleRevoke = (id: string) => {
    setRevoked(prev => [...prev, id]);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <ShieldCheck size={20} className="text-blue-700" />
          Privacy & Access
        </h1>
        <p className="text-sm text-slate-500">See who has accessed your health records and manage your data permissions.</p>
      </div>

      {/* Consent flow diagram */}
      <div className="card">
        <h2 className="font-semibold text-slate-800 text-sm mb-4">How Jeevansh Protects Your Data</h2>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {[
            { icon: User, label: 'You', color: 'bg-blue-100 text-blue-700' },
            { icon: Lock, label: 'Your Consent', color: 'bg-teal-100 text-teal-700' },
            { icon: CheckCircle, label: 'Authorized Doctor', color: 'bg-green-100 text-green-700' },
            { icon: Eye, label: 'Health Records', color: 'bg-purple-100 text-purple-700' },
          ].map(({ icon: Icon, label, color }, i, arr) => (
            <React.Fragment key={label}>
              <div className="flex flex-col items-center gap-1">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color}`}>
                  <Icon size={20} />
                </div>
                <span className="text-xs font-semibold text-slate-600">{label}</span>
              </div>
              {i < arr.length - 1 && (
                <div className="text-slate-300 text-lg font-bold">→</div>
              )}
            </React.Fragment>
          ))}
        </div>
        <p className="text-xs text-slate-500 text-center mt-4 leading-relaxed">
          Jeevansh does not allow unrestricted AI or third-party access to your medical data. Every access requires explicit authorization and is permanently logged.
        </p>
      </div>

      {/* Access Restrictions */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'No Unauthorized AI Access', icon: EyeOff, color: 'text-red-600 bg-red-50' },
          { label: 'All Accesses Logged', icon: Clock, color: 'text-blue-600 bg-blue-50' },
          { label: 'Revoke Anytime', icon: ShieldCheck, color: 'text-teal-600 bg-teal-50' },
        ].map(({ label, icon: Icon, color }) => (
          <div key={label} className="card text-center p-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center mx-auto mb-2 ${color.split(' ')[1]}`}>
              <Icon size={17} className={color.split(' ')[0]} />
            </div>
            <p className="text-xs font-semibold text-slate-700 leading-tight">{label}</p>
          </div>
        ))}
      </div>

      {/* Access Log */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-slate-800 flex items-center gap-2">
            <Clock size={16} className="text-slate-500" />
            Who Accessed My Records
          </h2>
          <span className="text-xs bg-slate-100 text-slate-500 px-2.5 py-1 rounded-full font-medium">
            {accessLogs.length} entries
          </span>
        </div>

        <div className="space-y-3">
          {accessLogs.map(log => {
            const isRevoked = revoked.includes(log.id);
            return (
              <div
                key={log.id}
                className={`p-4 rounded-xl border transition-all ${
                  isRevoked ? 'bg-slate-50 border-slate-200 opacity-60' :
                  log.type === 'Emergency Access' ? 'bg-red-50 border-red-200' :
                  'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      log.type === 'Emergency Access' ? 'bg-red-100' : 'bg-blue-100'
                    }`}>
                      <Building2 size={16} className={log.type === 'Emergency Access' ? 'text-red-600' : 'text-blue-600'} />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">{log.accessedBy}</p>
                      <p className="text-xs text-slate-500">{log.role} · {log.hospital}</p>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                          log.type === 'Emergency Access' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {log.type === 'Emergency Access' ? '🚨 ' : ''}{log.type}
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Clock size={10} /> {log.dateTime}
                        </span>
                      </div>
                    </div>
                  </div>

                  {log.canRevoke && !isRevoked && (
                    <button
                      onClick={() => handleRevoke(log.id)}
                      className="text-xs text-red-600 border border-red-200 px-2.5 py-1 rounded-lg font-semibold hover:bg-red-50 transition-colors flex-shrink-0"
                    >
                      Revoke
                    </button>
                  )}
                  {isRevoked && (
                    <span className="text-xs text-slate-400 font-medium flex-shrink-0">Revoked</span>
                  )}
                  {log.type === 'Emergency Access' && (
                    <div className="flex items-center gap-1 text-amber-600 text-[10px] font-semibold flex-shrink-0">
                      <AlertTriangle size={11} />
                      Emergency
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Upcoming consent */}
      <div className="card bg-teal-50 border-teal-200">
        <div className="flex gap-3">
          <CheckCircle size={18} className="text-teal-700 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-teal-900 text-sm">Consent-Based AI Access</p>
            <p className="text-teal-700 text-xs mt-1 leading-relaxed">
              Jeevansh's AI Health Agent only reads records that authorized providers have explicitly been granted access to. The AI generates assistive summaries — it never independently diagnoses, prescribes, or stores your data separately.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyAccess;
