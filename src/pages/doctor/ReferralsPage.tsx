import React, { useState } from 'react';
import { patients } from '../../data/patients';
import { GitMerge, ChevronRight, CheckCircle2, Clock, AlertTriangle, Send } from 'lucide-react';

interface Referral {
  id: string;
  patient: string;
  healthId: string;
  department: string;
  hospital: string;
  doctor: string;
  priority: string;
  reason: string;
  status: 'Sent' | 'Accepted' | 'Scheduled';
  date: string;
}

const mockReferrals: Referral[] = [
  {
    id: 'r1',
    patient: 'Rahul Patil',
    healthId: 'JVS-2847-9142',
    department: 'Cardiology',
    hospital: 'Jehangir Hospital',
    doctor: 'Dr. Kavitha Rao',
    priority: 'High',
    reason: 'Cardiology follow-up post-emergency visit. Troponin elevation noted.',
    status: 'Accepted',
    date: '2026-10-20',
  },
  {
    id: 'r2',
    patient: 'Amit Deshmukh',
    healthId: 'JVS-5521-7783',
    department: 'Nephrology',
    hospital: 'KEM Hospital',
    doctor: 'Unassigned',
    priority: 'Medium',
    reason: 'CKD Stage 3b — declining eGFR. Second opinion required.',
    status: 'Sent',
    date: '2026-10-22',
  },
];

const statusColor = (s: string) =>
  s === 'Scheduled' ? 'bg-green-100 text-green-700' :
  s === 'Accepted' ? 'bg-blue-100 text-blue-700' :
  'bg-amber-100 text-amber-700';

const ReferralsPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ patient: '', department: '', hospital: '', doctor: '', priority: 'Medium', reason: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowForm(false);
      setForm({ patient: '', department: '', hospital: '', doctor: '', priority: 'Medium', reason: '' });
    }, 2000);
  };

  const departments = ['Cardiology', 'Nephrology', 'Pulmonology', 'Endocrinology', 'Neurology', 'Orthopedics', 'General Surgery'];
  const hospitals = ['City Hospital, Pune', 'Sahyadri Hospital', 'Jehangir Hospital', 'Ruby Hall Clinic', 'KEM Hospital'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <GitMerge size={20} className="text-blue-700" />
            Referral & Care Coordination
          </h1>
          <p className="text-sm text-slate-500">Manage patient referrals and inter-hospital coordination</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">
          <Send size={15} />
          New Referral
        </button>
      </div>

      {/* Referral Form */}
      {showForm && (
        <div className="card border-blue-200">
          <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Send size={16} className="text-blue-600" />
            Create Patient Referral
          </h2>

          {submitted ? (
            <div className="text-center py-8">
              <CheckCircle2 size={48} className="text-green-600 mx-auto mb-3" />
              <p className="font-bold text-green-800 text-lg">Referral Sent!</p>
              <p className="text-sm text-green-600">The receiving hospital has been notified via the Jeevansh network.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1 block">Patient</label>
                <select
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                  value={form.patient} onChange={e => setForm(f => ({ ...f, patient: e.target.value }))}
                >
                  <option value="">Select patient...</option>
                  {patients.map(p => <option key={p.id} value={p.name}>{p.name} · {p.healthId}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1 block">Department</label>
                <select
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                  value={form.department} onChange={e => setForm(f => ({ ...f, department: e.target.value }))}
                >
                  <option value="">Select department...</option>
                  {departments.map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1 block">Hospital</label>
                <select
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                  value={form.hospital} onChange={e => setForm(f => ({ ...f, hospital: e.target.value }))}
                >
                  <option value="">Select hospital...</option>
                  {hospitals.map(h => <option key={h}>{h}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1 block">Priority</label>
                <select
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                  value={form.priority} onChange={e => setForm(f => ({ ...f, priority: e.target.value }))}
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                  <option>Emergency</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="text-xs font-semibold text-slate-600 mb-1 block">Reason for Referral</label>
                <textarea
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
                  rows={3}
                  placeholder="Describe the clinical reason for referral..."
                  value={form.reason} onChange={e => setForm(f => ({ ...f, reason: e.target.value }))}
                />
              </div>
              <div className="col-span-2 flex gap-3">
                <button onClick={handleSubmit} className="btn-primary">
                  <Send size={15} />
                  Send Secure Referral
                </button>
                <button onClick={() => setShowForm(false)} className="btn-outline">Cancel</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Existing Referrals */}
      <div className="space-y-3">
        <h2 className="font-semibold text-slate-800">Active Referrals</h2>
        {mockReferrals.map(ref => (
          <div key={ref.id} className="card hover:ring-2 hover:ring-blue-200 transition-all cursor-pointer">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                <GitMerge size={18} className="text-blue-700" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <div>
                    <h3 className="font-semibold text-slate-800">{ref.patient}</h3>
                    <p className="text-xs text-slate-500 font-mono">{ref.healthId}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      ref.priority === 'High' ? 'bg-red-100 text-red-700' :
                      ref.priority === 'Medium' ? 'bg-amber-100 text-amber-700' :
                      'bg-slate-100 text-slate-600'
                    }`}>{ref.priority} Priority</span>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${statusColor(ref.status)}`}>
                      {ref.status === 'Sent' ? '→ ' : ref.status === 'Accepted' ? '✓ ' : '📅 '}
                      {ref.status}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 mt-1.5">
                  <strong>{ref.department}</strong> · {ref.hospital} → {ref.doctor}
                </p>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{ref.reason}</p>

                {/* Status timeline */}
                <div className="flex items-center gap-1 mt-3">
                  {(['Sent', 'Accepted', 'Scheduled'] as const).map((s, i) => {
                    const idx = ['Sent', 'Accepted', 'Scheduled'].indexOf(ref.status);
                    const done = i <= idx;
                    return (
                      <React.Fragment key={s}>
                        <div className={`flex items-center gap-1 text-[10px] font-semibold ${done ? 'text-blue-700' : 'text-slate-300'}`}>
                          {done ? <CheckCircle2 size={11} /> : <Clock size={11} />}
                          {s}
                        </div>
                        {i < 2 && <div className={`h-px flex-1 ${done && i < idx ? 'bg-blue-400' : 'bg-slate-200'}`} />}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
              <ChevronRight size={15} className="text-slate-300 flex-shrink-0 mt-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReferralsPage;
