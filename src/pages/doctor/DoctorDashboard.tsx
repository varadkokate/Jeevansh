import React from 'react';
import { doctors, appointments } from '../../data/hospital';
import { patients } from '../../data/patients';
import {
  Users, AlertTriangle, Clock, BedDouble,
  Stethoscope, ChevronRight, Activity, Search, TrendingUp
} from 'lucide-react';

const DoctorDashboard: React.FC<{ setActivePage: (p: string) => void }> = ({ setActivePage }) => {
  const doctor = doctors[0];

  const stats = [
    { label: "Today's Patients", value: doctor.todayPatients, icon: Users, color: 'text-blue-700', iconBg: 'bg-blue-100', sub: 'Consultations & visits' },
    { label: 'Emergency Cases', value: doctor.emergencyCases, icon: AlertTriangle, color: 'text-red-700', iconBg: 'bg-red-100', sub: 'Require immediate attention' },
    { label: 'Pending Reviews', value: 4, icon: Clock, color: 'text-amber-700', iconBg: 'bg-amber-100', sub: 'Reports & referrals' },
    { label: 'Available Beds', value: 12, icon: BedDouble, color: 'text-teal-700', iconBg: 'bg-teal-100', sub: 'In cardiology ward' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="rounded-2xl p-6 text-white relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #1a6bb5 100%)' }}>
        <div className="absolute right-0 top-0 w-48 h-full opacity-10" style={{ background: 'radial-gradient(circle at 80%, white, transparent 70%)' }} />
        <div className="relative z-10">
          <p className="text-blue-200 text-sm font-medium">Jeevansh Doctor Console · Pan-India</p>
          <h1 className="text-2xl font-bold mb-0.5">{doctor.name}</h1>
          <p className="text-blue-300 text-sm">{doctor.specialty} · {doctor.hospital}</p>
          <p className="text-blue-200 text-xs mt-1">{doctor.qualification} · {doctor.experience} years experience</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, color, iconBg, sub }) => (
          <div key={label} className="stat-card flex-col items-start gap-3">
            <div className="flex items-center gap-3 w-full">
              <div className={`w-11 h-11 rounded-xl ${iconBg} flex items-center justify-center flex-shrink-0`}>
                <Icon size={20} className={color} />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">{value}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-700">{label}</p>
              <p className="text-xs text-slate-400">{sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Search Patient */}
      <div className="card">
        <h2 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
          <Search size={16} className="text-blue-600" />
          Patient Search
        </h2>
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by Health ID, Name, Phone..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all"
            />
          </div>
          <button className="btn-primary whitespace-nowrap">Search</button>
        </div>

        <div className="mt-4 space-y-2">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Recent Patients</p>
          {patients.slice(0, 3).map(p => (
            <div key={p.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm flex-shrink-0">
                {p.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800">{p.name}</p>
                <p className="text-xs text-slate-400">{p.healthId} · {p.age}y · {p.bloodGroup}</p>
              </div>
              <ChevronRight size={14} className="text-slate-300 group-hover:text-slate-500 transition-colors" />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Today's appointments */}
        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-slate-800 flex items-center gap-2">
              <Activity size={16} className="text-blue-600" />
              Today's Schedule
            </h2>
            <span className="text-xs text-blue-600 font-semibold cursor-pointer hover:underline">View All</span>
          </div>
          <div className="space-y-2">
            {[
              { time: '9:00 AM', name: 'Rahul Patil', type: 'Follow-up', status: 'completed' },
              { time: '10:30 AM', name: 'Sunita Rao', type: 'Consultation', status: 'completed' },
              { time: '11:45 AM', name: 'Mohan Kumar', type: 'Emergency', status: 'in-progress' },
              { time: '3:00 PM', name: 'Priya Shah', type: 'Follow-up', status: 'scheduled' },
              { time: '4:30 PM', name: 'Amit Wagh', type: 'Consultation', status: 'scheduled' },
            ].map((appt, i) => (
              <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                <span className="text-xs font-mono text-slate-400 w-16 flex-shrink-0">{appt.time}</span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-700">{appt.name}</p>
                  <p className="text-xs text-slate-400">{appt.type}</p>
                </div>
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                  appt.status === 'completed' ? 'bg-green-100 text-green-700' :
                  appt.status === 'in-progress' ? 'bg-amber-100 text-amber-700' :
                  'bg-blue-100 text-blue-700'
                }`}>{appt.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h2 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
            <TrendingUp size={16} className="text-teal-600" />
            Quick Actions
          </h2>
          <div className="space-y-2">
            {[
              { label: 'Scan Emergency QR', icon: AlertTriangle, action: () => setActivePage('emergency'), color: 'btn-emergency' },
              { label: 'Access Patient Records', icon: Users, action: () => setActivePage('patients'), color: 'btn-primary' },
              { label: 'Open AI Health Agent', icon: Stethoscope, action: () => setActivePage('ai-agent'), color: 'btn-teal' },
            ].map(({ label, icon: Icon, action, color }) => (
              <button key={label} onClick={action} className={`${color} w-full justify-center`}>
                <Icon size={16} /> {label}
              </button>
            ))}
          </div>

          {/* Doctor availability */}
          <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">My Status</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm font-semibold text-slate-700">Available</span>
              <span className="text-xs text-slate-400">· Next slot: Now</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">{doctor.qualification}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
