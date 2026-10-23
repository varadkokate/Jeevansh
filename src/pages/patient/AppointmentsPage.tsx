import React from 'react';
import { appointments } from '../../data/hospital';
import { Calendar, Clock, MapPin, Stethoscope, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const statusIcons = {
  scheduled: { icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50', label: 'Scheduled' },
  completed: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50', label: 'Completed' },
  cancelled: { icon: XCircle, color: 'text-red-600', bg: 'bg-red-50', label: 'Cancelled' },
  'in-progress': { icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-50', label: 'In Progress' },
};

const typeColors: Record<string, string> = {
  consultation: 'bg-blue-100 text-blue-700',
  'follow-up': 'bg-teal-100 text-teal-700',
  emergency: 'bg-red-100 text-red-700',
  lab: 'bg-purple-100 text-purple-700',
  procedure: 'bg-orange-100 text-orange-700',
};

const AppointmentsPage: React.FC = () => {
  const patientAppts = appointments.filter(a => a.patientId === 'p1');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Appointments</h1>
          <p className="text-sm text-slate-500">Your scheduled and past visits</p>
        </div>
        <button className="btn-primary">
          <Calendar size={15} />
          Book Appointment
        </button>
      </div>

      <div className="space-y-3">
        {patientAppts.length === 0 && (
          <div className="card text-center py-12">
            <Calendar size={40} className="text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-medium">No appointments scheduled</p>
          </div>
        )}
        {patientAppts.map(appt => {
          const s = statusIcons[appt.status];
          const SIcon = s.icon;
          return (
            <div key={appt.id} className="card hover:ring-2 hover:ring-blue-200 transition-all cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Stethoscope size={20} className="text-blue-700" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <div>
                      <h3 className="font-semibold text-slate-800">{appt.doctorName}</h3>
                      <p className="text-sm text-slate-500">{appt.department}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${typeColors[appt.type] || 'bg-slate-100 text-slate-500'}`}>
                        {appt.type}
                      </span>
                      <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${s.bg}`}>
                        <SIcon size={11} className={s.color} />
                        <span className={`text-[10px] font-semibold ${s.color}`}>{s.label}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-2 flex-wrap">
                    <span className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Calendar size={12} /> {appt.date}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Clock size={12} /> {appt.time}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-slate-500">
                      <MapPin size={12} /> {appt.hospital}
                    </span>
                  </div>
                  {appt.notes && (
                    <p className="text-xs text-slate-400 mt-1.5 italic">{appt.notes}</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Placeholder for past */}
      <div className="card bg-slate-50">
        <h3 className="font-semibold text-slate-600 text-sm mb-3">Past Appointments</h3>
        <p className="text-xs text-slate-400">View complete appointment history in your Health Records section.</p>
      </div>
    </div>
  );
};

export default AppointmentsPage;
