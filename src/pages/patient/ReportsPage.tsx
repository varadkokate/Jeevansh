import React from 'react';
import { patients } from '../../data/patients';
import { FileText, FlaskConical, Download, ExternalLink } from 'lucide-react';

const ReportsPage: React.FC = () => {
  const patient = patients[0];
  const allReports = patient.history
    .filter(h => h.reports && h.reports.length > 0)
    .flatMap(h => (h.reports || []).map(r => ({
      name: r,
      event: h.title,
      date: h.date,
      hospital: h.hospital,
      doctor: h.doctor,
      type: h.type,
    })));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Reports & Documents</h1>
          <p className="text-sm text-slate-500">{allReports.length} reports across {patient.history.filter(h => h.reports?.length).length} visits</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {allReports.map((r, i) => (
          <div key={i} className="card hover:ring-2 hover:ring-blue-200 transition-all cursor-pointer group">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                <FlaskConical size={18} className="text-purple-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-800 text-sm">{r.name}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{r.event}</p>
                <p className="text-xs text-slate-400">{r.hospital} · {r.date}</p>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors" title="Download">
                  <Download size={14} className="text-slate-500" />
                </button>
                <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors" title="View">
                  <ExternalLink size={14} className="text-slate-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {allReports.length === 0 && (
        <div className="card text-center py-12">
          <FileText size={40} className="text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 font-medium">No reports available</p>
        </div>
      )}
    </div>
  );
};

export default ReportsPage;
