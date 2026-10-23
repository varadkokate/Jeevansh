import React from 'react';
import { patients } from '../../data/patients';
import { Search, AlertTriangle, ChevronRight, User, Heart, Pill } from 'lucide-react';

const PatientsPage: React.FC = () => {
  const [search, setSearch] = React.useState('');
  const filtered = patients.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.healthId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-slate-800">Patients</h1>
        <p className="text-sm text-slate-500">Search and access patient records</p>
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search by name, Health ID..."
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="space-y-3">
        {filtered.map(patient => (
          <div key={patient.id} className="card hover:ring-2 hover:ring-blue-200 transition-all cursor-pointer group">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-blue-700 font-black text-lg flex-shrink-0">
                {patient.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-slate-800">{patient.name}</h3>
                    <p className="text-xs font-mono text-blue-600 mb-1">{patient.healthId}</p>
                    <p className="text-xs text-slate-500">{patient.age}y · {patient.gender} · {patient.bloodGroup}</p>
                  </div>
                  <ChevronRight size={16} className="text-slate-300 group-hover:text-blue-500 transition-colors flex-shrink-0 mt-1" />
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  {patient.criticalConditions.map(c => (
                    <span key={c} className="flex items-center gap-1 text-[10px] bg-red-50 text-red-700 border border-red-200 px-2 py-0.5 rounded-full font-semibold">
                      <Heart size={9} /> {c}
                    </span>
                  ))}
                  {patient.allergies.map(a => (
                    <span key={a} className="flex items-center gap-1 text-[10px] bg-orange-50 text-orange-700 border border-orange-200 px-2 py-0.5 rounded-full font-semibold">
                      <AlertTriangle size={9} /> {a}
                    </span>
                  ))}
                  <span className="flex items-center gap-1 text-[10px] bg-teal-50 text-teal-700 border border-teal-200 px-2 py-0.5 rounded-full font-semibold">
                    <Pill size={9} /> {patient.currentMedications.length} meds
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientsPage;
