import React, { useState } from 'react';
import { patients } from '../../data/patients';
import { FileText, ChevronDown, ChevronUp, Zap, Stethoscope, FlaskConical, Pill, ExternalLink } from 'lucide-react';

const typeColors: Record<string, { bg: string; icon: React.ReactNode; label: string }> = {
  emergency: { bg: 'bg-red-100 text-red-700', icon: <Zap size={15} className="text-red-600" />, label: 'Emergency' },
  consultation: { bg: 'bg-blue-100 text-blue-700', icon: <Stethoscope size={15} className="text-blue-600" />, label: 'Consultation' },
  lab: { bg: 'bg-purple-100 text-purple-700', icon: <FlaskConical size={15} className="text-purple-600" />, label: 'Lab' },
  prescription: { bg: 'bg-teal-100 text-teal-700', icon: <Pill size={15} className="text-teal-600" />, label: 'Prescription' },
  surgery: { bg: 'bg-orange-100 text-orange-700', icon: <FileText size={15} className="text-orange-600" />, label: 'Surgery' },
};

const HealthRecords: React.FC = () => {
  const patient = patients[0];
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filterType, setFilterType] = useState('all');

  const years = [...new Set(patient.history.map(h => h.year))].sort((a, b) => b - a);

  const filtered = filterType === 'all' ? patient.history : patient.history.filter(h => h.type === filterType);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Health Records</h1>
          <p className="text-sm text-slate-500">{patient.name} · {patient.healthId}</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', 'emergency', 'consultation', 'lab'].map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors capitalize ${
                filterType === type
                  ? 'bg-blue-700 text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {type === 'all' ? 'All Records' : type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-8">
        {years.map(year => {
          const events = filtered.filter(h => h.year === year);
          if (!events.length) return null;
          return (
            <div key={year}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-lg font-black text-slate-700">{year}</span>
                <div className="flex-1 h-px bg-slate-200" />
                <span className="text-xs text-slate-400 font-medium">{events.length} record{events.length > 1 ? 's' : ''}</span>
              </div>

              <div className="space-y-3 pl-4 border-l-2 border-slate-200">
                {events.map(event => {
                  const t = typeColors[event.type] || typeColors.consultation;
                  const isOpen = expanded === event.id;
                  return (
                    <div key={event.id} className={`card relative transition-all ${isOpen ? 'ring-2 ring-blue-200' : ''}`}>
                      {/* timeline dot */}
                      <div className={`absolute -left-[21px] w-4 h-4 rounded-full border-2 border-white ${
                        event.type === 'emergency' ? 'bg-red-500' :
                        event.type === 'consultation' ? 'bg-blue-500' :
                        event.type === 'lab' ? 'bg-purple-500' : 'bg-teal-500'
                      } top-5`} />

                      <div
                        className="flex items-start justify-between gap-3 cursor-pointer"
                        onClick={() => setExpanded(isOpen ? null : event.id)}
                      >
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                            event.type === 'emergency' ? 'bg-red-100' :
                            event.type === 'consultation' ? 'bg-blue-100' :
                            event.type === 'lab' ? 'bg-purple-100' : 'bg-teal-100'
                          }`}>
                            {t.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="font-semibold text-slate-800 text-sm">{event.title}</h3>
                              <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${t.bg}`}>{t.label}</span>
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5">{event.hospital}</p>
                            <p className="text-xs text-slate-400">{event.doctor} · {event.date}</p>
                          </div>
                        </div>
                        <div className="flex-shrink-0 text-slate-400">
                          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </div>
                      </div>

                      {isOpen && (
                        <div className="mt-4 pt-4 border-t border-slate-100 space-y-3 animate-[fadeIn_0.2s_ease]">
                          <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Diagnosis</p>
                            <p className="text-sm text-slate-800">{event.diagnosis}</p>
                          </div>
                          {event.prescription && (
                            <div>
                              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Prescription</p>
                              <p className="text-sm text-slate-800">{event.prescription}</p>
                            </div>
                          )}
                          <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Clinical Notes</p>
                            <p className="text-sm text-slate-700 leading-relaxed">{event.notes}</p>
                          </div>
                          {event.reports && event.reports.length > 0 && (
                            <div>
                              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Reports</p>
                              <div className="flex flex-wrap gap-2">
                                {event.reports.map(r => (
                                  <button key={r} className="flex items-center gap-1.5 text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg font-medium border border-blue-200 hover:bg-blue-100 transition-colors">
                                    <FileText size={12} /> {r} <ExternalLink size={10} />
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HealthRecords;
