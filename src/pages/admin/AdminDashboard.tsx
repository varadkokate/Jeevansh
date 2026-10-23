import React from 'react';
import { doctors, appointments } from '../../data/hospital';
import {
  BedDouble, Users, AlertTriangle, Calendar, GitMerge,
  BarChart3, TrendingUp, CheckCircle, Clock
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const stats = [
    { label: 'Doctors Available', value: doctors.filter(d => d.status === 'available').length, icon: Users, color: 'text-blue-700', iconBg: 'bg-blue-100' },
    { label: "Today's Appointments", value: appointments.length + 7, icon: Calendar, color: 'text-teal-700', iconBg: 'bg-teal-100' },
    { label: 'Emergency Cases', value: 3, icon: AlertTriangle, color: 'text-red-700', iconBg: 'bg-red-100' },
    { label: 'Available Beds', value: 47, icon: BedDouble, color: 'text-green-700', iconBg: 'bg-green-100' },
    { label: 'Pending Referrals', value: 5, icon: GitMerge, color: 'text-amber-700', iconBg: 'bg-amber-100' },
    { label: 'Avg. Wait Time', value: '18 min', icon: Clock, color: 'text-purple-700', iconBg: 'bg-purple-100' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl p-6 text-white relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #4c1d95 0%, #6d28d9 100%)' }}>
        <div className="absolute right-0 top-0 w-48 h-full opacity-10" style={{ background: 'radial-gradient(circle at 80%, white, transparent 70%)' }} />
        <div className="relative z-10">
          <p className="text-purple-200 text-sm font-medium">Jeevansh Admin Console · Pan-India</p>
          <h1 className="text-2xl font-bold">City Hospital, Pune</h1>
          <p className="text-purple-300 text-sm">Hospital Administrator · {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map(({ label, value, icon: Icon, color, iconBg }) => (
          <div key={label} className="stat-card">
            <div className={`w-11 h-11 rounded-xl ${iconBg} flex items-center justify-center flex-shrink-0`}>
              <Icon size={20} className={color} />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{value}</p>
              <p className="text-xs text-slate-500 font-medium leading-tight">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Doctor Availability Board */}
      <div className="card">
        <h2 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <Users size={17} className="text-blue-600" />
          Doctor Availability
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="text-left pb-3 pr-4">Doctor</th>
                <th className="text-left pb-3 pr-4">Department</th>
                <th className="text-left pb-3 pr-4">Status</th>
                <th className="text-left pb-3 pr-4">Next Available</th>
                <th className="text-left pb-3">Today's Patients</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {doctors.map(doc => (
                <tr key={doc.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 pr-4">
                    <div>
                      <p className="font-semibold text-slate-800">{doc.name}</p>
                      <p className="text-xs text-slate-400">{doc.qualification.split(',')[0]}</p>
                    </div>
                  </td>
                  <td className="py-3 pr-4 text-slate-600">{doc.department}</td>
                  <td className="py-3 pr-4">
                    <span className={`badge-${doc.status}`}>
                      {doc.status === 'available' ? '● Available' : doc.status === 'busy' ? '◑ Busy' : '○ Offline'}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-slate-600 text-xs">{doc.nextAvailable}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-100 rounded-full h-1.5 w-16">
                        <div
                          className="bg-blue-500 h-1.5 rounded-full"
                          style={{ width: `${Math.min(100, (doc.todayPatients / 25) * 100)}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-500">{doc.todayPatients}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Emergency overview */}
        <div className="card">
          <h2 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
            <AlertTriangle size={16} className="text-red-600" />
            Emergency Cases
          </h2>
          <div className="space-y-2">
            {[
              { patient: 'Mohan Kumar', condition: 'Cardiac arrest — ICU', time: '2:18 PM', status: 'Critical' },
              { patient: 'Lata Mishra', condition: 'Polytrauma — post-accident', time: '3:05 PM', status: 'Serious' },
              { patient: 'Vijay Singh', condition: 'Hypoglycaemia — stabilising', time: '3:31 PM', status: 'Stable' },
            ].map((e, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-red-100 bg-red-50">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${e.status === 'Critical' ? 'bg-red-600' : e.status === 'Serious' ? 'bg-amber-500' : 'bg-green-500'}`} />
                <div className="flex-1">
                  <p className="font-semibold text-slate-800 text-sm">{e.patient}</p>
                  <p className="text-xs text-slate-500">{e.condition}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400">{e.time}</p>
                  <span className={`text-[10px] font-bold ${e.status === 'Critical' ? 'text-red-700' : e.status === 'Serious' ? 'text-amber-700' : 'text-green-700'}`}>{e.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bed availability */}
        <div className="card">
          <h2 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
            <BedDouble size={16} className="text-teal-600" />
            Bed Availability
          </h2>
          <div className="space-y-2.5">
            {[
              { ward: 'ICU', total: 12, available: 3 },
              { ward: 'Cardiology', total: 20, available: 8 },
              { ward: 'General Ward', total: 60, available: 22 },
              { ward: 'Emergency', total: 15, available: 5 },
              { ward: 'Neurology', total: 18, available: 9 },
            ].map(({ ward, total, available }) => (
              <div key={ward} className="flex items-center gap-3">
                <span className="text-sm text-slate-600 w-28 flex-shrink-0">{ward}</span>
                <div className="flex-1 bg-slate-100 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      available / total < 0.25 ? 'bg-red-500' :
                      available / total < 0.5 ? 'bg-amber-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${(available / total) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-slate-500 w-16 text-right flex-shrink-0">{available}/{total} free</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
