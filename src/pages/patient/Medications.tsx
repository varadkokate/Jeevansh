import React from 'react';
import { patients } from '../../data/patients';
import { Pill, AlertTriangle, Calendar, Clock } from 'lucide-react';

const Medications: React.FC = () => {
  const patient = patients[0];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-800">Medications</h1>
        <p className="text-sm text-slate-500">{patient.name} · Current & historical prescription record</p>
      </div>

      {/* Current medications */}
      <div className="card">
        <h2 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <Pill size={17} className="text-teal-600" />
          Current Medications
          <span className="ml-auto badge-available">{patient.currentMedications.length} Active</span>
        </h2>
        <div className="space-y-3">
          {patient.currentMedications.map((med, i) => (
            <div key={med.name} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:bg-white hover:border-teal-200 transition-all">
              <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center text-teal-700 font-black text-sm flex-shrink-0">
                {i + 1}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-slate-800">{med.name}</p>
                <p className="text-xs text-slate-500 mt-0.5">{med.dose}</p>
                <div className="flex items-center gap-1 text-xs text-slate-400 mt-1">
                  <Calendar size={11} />
                  Since {med.since}
                </div>
              </div>
              <span className="tag-medication">Active</span>
            </div>
          ))}
        </div>
      </div>

      {/* Allergy alert */}
      <div className="card bg-orange-50 border-orange-200">
        <h2 className="font-semibold text-orange-800 mb-3 flex items-center gap-2">
          <AlertTriangle size={17} className="text-orange-600" />
          Drug Allergy Alert
        </h2>
        <p className="text-xs text-orange-700 mb-3">The following drugs / drug classes must be avoided for this patient:</p>
        <div className="flex flex-wrap gap-2">
          {patient.allergies.map(a => (
            <span key={a} className="tag-allergy text-sm py-1 px-3">⚠ {a}</span>
          ))}
        </div>
      </div>

      {/* Historical prescriptions from records */}
      <div className="card">
        <h2 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <Clock size={17} className="text-slate-500" />
          Historical Prescriptions
        </h2>
        <div className="space-y-3">
          {patient.history.filter(h => h.prescription).map(event => (
            <div key={event.id} className="p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-slate-700">{event.prescription}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{event.title} · {event.date}</p>
                  <p className="text-xs text-slate-400">{event.doctor} · {event.hospital}</p>
                </div>
                <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-medium capitalize whitespace-nowrap">{event.type}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Medications;
