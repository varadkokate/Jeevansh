import React from 'react';
import {
  Heart, Calendar, Pill, FileText, AlertTriangle,
  ChevronRight, Clock, TrendingUp, Shield, Activity,
  Zap, Stethoscope
} from 'lucide-react';
import { patients } from '../../data/patients';
import { appointments } from '../../data/hospital';

const PatientDashboard: React.FC = () => {
  const patient = patients[0]; // Rahul Patil
  const nextAppt = appointments.find(a => a.patientId === 'p1');

  const stats = [
    { label: 'Medical Encounters', value: patient.history.length, icon: Activity, iconBg: 'bg-blue-100', iconColor: 'text-blue-700' },
    { label: 'Current Medications', value: patient.currentMedications.length, icon: Pill, iconBg: 'bg-teal-100', iconColor: 'text-teal-700' },
    { label: 'Known Allergies', value: patient.allergies.length, icon: AlertTriangle, iconBg: 'bg-orange-100', iconColor: 'text-orange-700' },
    { label: 'Critical Conditions', value: patient.criticalConditions.length, icon: Heart, iconBg: 'bg-red-100', iconColor: 'text-red-700' },
  ];

  return (
    <div className="space-y-6">
      {/* Greeting Hero */}
      <div className="rounded-2xl p-6 text-white relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a6bb5 0%, #0f4c81 60%, #083460 100%)' }}>
        <div className="absolute right-0 top-0 w-64 h-full opacity-10" style={{ background: 'radial-gradient(circle at 80% 50%, white 0%, transparent 70%)' }} />
        <div className="relative z-10">
          <p className="text-blue-200 text-sm font-medium mb-1">Good Morning 👋</p>
          <h1 className="text-2xl font-bold mb-1">{patient.name}</h1>
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-white/20 text-white text-xs font-mono px-2.5 py-1 rounded-full">{patient.healthId}</span>
            <span className="bg-green-400/30 text-green-200 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
              <Shield size={10} /> Verified
            </span>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="btn-emergency text-sm py-2.5 px-5">
              <AlertTriangle size={15} />
              Open Emergency Profile
            </button>
            <button className="btn-outline text-sm py-2.5 px-5 border-white/40 text-white hover:bg-white hover:text-blue-800">
              <FileText size={15} />
              View Complete Health Record
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, iconBg, iconColor }) => (
          <div key={label} className="stat-card">
            <div className={`w-11 h-11 rounded-xl ${iconBg} flex items-center justify-center flex-shrink-0`}>
              <Icon size={20} className={iconColor} />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{value}</p>
              <p className="text-xs text-slate-500 font-medium leading-tight">{label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Health Summary */}
        <div className="card lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-800 flex items-center gap-2">
              <Heart size={17} className="text-red-500" />
              Health Summary
            </h2>
            <span className="text-xs text-slate-400">Updated today</span>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="text-center p-3 bg-red-50 rounded-xl">
              <p className="text-2xl font-black text-red-700">{patient.bloodGroup}</p>
              <p className="text-xs text-red-500 font-semibold mt-0.5">Blood Group</p>
            </div>
            <div className="text-center p-3 bg-slate-50 rounded-xl">
              <p className="text-2xl font-black text-slate-700">{patient.age}</p>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">Age (years)</p>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-xl">
              <p className="text-2xl font-black text-blue-700">M</p>
              <p className="text-xs text-blue-500 font-semibold mt-0.5">Gender</p>
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Allergies</p>
            <div className="flex flex-wrap gap-2">
              {patient.allergies.map(a => (
                <span key={a} className="tag-allergy">⚠ {a}</span>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Critical Conditions</p>
            <div className="flex flex-wrap gap-2">
              {patient.criticalConditions.map(c => (
                <span key={c} className="tag-critical">● {c}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Next Appointment */}
          <div className="card">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-slate-800 text-sm flex items-center gap-2">
                <Calendar size={15} className="text-blue-600" />
                Next Appointment
              </h3>
            </div>
            {nextAppt ? (
              <div>
                <p className="font-semibold text-slate-800">{nextAppt.doctorName}</p>
                <p className="text-xs text-slate-500 mb-1">{nextAppt.department} · {nextAppt.hospital}</p>
                <div className="flex items-center gap-1.5 text-xs text-blue-600 font-semibold">
                  <Clock size={12} />
                  {nextAppt.date} · {nextAppt.time}
                </div>
                <span className="mt-2 inline-block text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-semibold uppercase tracking-wide">
                  {nextAppt.type}
                </span>
              </div>
            ) : (
              <p className="text-sm text-slate-400">No upcoming appointments</p>
            )}
          </div>

          {/* Recent Medication */}
          <div className="card">
            <h3 className="font-semibold text-slate-800 text-sm flex items-center gap-2 mb-3">
              <Pill size={15} className="text-teal-600" />
              Current Medications
            </h3>
            <div className="space-y-2">
              {patient.currentMedications.map(m => (
                <div key={m.name} className="flex items-center justify-between py-1.5 border-b border-slate-50 last:border-0">
                  <div>
                    <p className="text-sm font-semibold text-slate-700">{m.name}</p>
                    <p className="text-xs text-slate-400">{m.dose}</p>
                  </div>
                  <span className="tag-medication text-[10px] py-0.5">Active</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent History */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-slate-800 flex items-center gap-2">
            <TrendingUp size={17} className="text-blue-600" />
            Recent Medical History
          </h2>
          <button className="text-xs text-blue-600 font-semibold flex items-center gap-1 hover:underline">
            View All <ChevronRight size={13} />
          </button>
        </div>
        <div className="space-y-3">
          {patient.history.slice(0, 3).map(event => (
            <div key={event.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                event.type === 'emergency' ? 'bg-red-100' :
                event.type === 'consultation' ? 'bg-blue-100' :
                event.type === 'lab' ? 'bg-purple-100' : 'bg-teal-100'
              }`}>
                {event.type === 'emergency' ? <Zap size={16} className="text-red-600" /> :
                 event.type === 'consultation' ? <Stethoscope size={16} className="text-blue-600" /> :
                 <FileText size={16} className="text-purple-600" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-800 text-sm">{event.title}</p>
                <p className="text-xs text-slate-500">{event.hospital} · {event.doctor}</p>
                <p className="text-xs text-slate-400 mt-0.5">{event.date}</p>
              </div>
              <ChevronRight size={15} className="text-slate-300 group-hover:text-slate-500 transition-colors flex-shrink-0 mt-1" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
