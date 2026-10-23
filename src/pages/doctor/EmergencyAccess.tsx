import React, { useState } from 'react';
import { patients } from '../../data/patients';
import { aiSummaries } from '../../data/hospital';
import {
  AlertTriangle, QrCode, CheckCircle2, ArrowRight,
  Droplets, Pill, Heart, Shield, FileText, ClipboardList,
  Brain, ChevronRight, Lock
} from 'lucide-react';

type Step = 'scan' | 'verify' | 'profile' | null;

const EmergencyAccess: React.FC = () => {
  const [step, setStep] = useState<Step>(null);
  const [selectedPatient, setSelectedPatient] = useState(patients[0]);
  const [scanning, setScanning] = useState(false);

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setStep('verify');
    }, 2000);
  };

  const resetFlow = () => {
    setStep(null);
    setScanning(false);
  };

  const patient = selectedPatient;

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <AlertTriangle size={20} className="text-red-600" />
            Emergency Patient Access
          </h1>
          <p className="text-sm text-slate-500">Securely access critical medical information in emergency situations</p>
        </div>
        {step && (
          <button onClick={resetFlow} className="text-xs text-slate-500 border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors">
            ← Reset
          </button>
        )}
      </div>

      {/* Progress steps */}
      <div className="flex items-center gap-2">
        {[
          { key: 'scan', label: 'Scan / Enter ID' },
          { key: 'verify', label: 'Verify Patient' },
          { key: 'profile', label: 'Emergency Profile' },
        ].map(({ key, label }, i, arr) => {
          const isActive = step === key;
          const isDone = (step === 'verify' && i === 0) || (step === 'profile' && i <= 1);
          return (
            <React.Fragment key={key}>
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                isDone ? 'bg-green-100 text-green-700' :
                isActive ? 'bg-blue-700 text-white' :
                'bg-slate-100 text-slate-400'
              }`}>
                {isDone ? <CheckCircle2 size={12} /> : null}
                {label}
              </div>
              {i < arr.length - 1 && <ArrowRight size={13} className="text-slate-300 flex-shrink-0" />}
            </React.Fragment>
          );
        })}
      </div>

      {/* Step: Landing */}
      {!step && (
        <div className="card text-center py-10">
          <div className="w-20 h-20 rounded-2xl bg-red-100 flex items-center justify-center mx-auto mb-5 emergency-pulse">
            <AlertTriangle size={36} className="text-red-600" />
          </div>
          <h2 className="text-lg font-bold text-slate-800 mb-2">Emergency Patient Access</h2>
          <p className="text-sm text-slate-500 mb-6 max-w-md mx-auto leading-relaxed">
            Scan the patient's Jeevansh Emergency QR code to securely access critical medical information. Every access is logged and consent-controlled.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={handleScan} disabled={scanning} className="btn-emergency">
              {scanning ? (
                <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Scanning...</>
              ) : (
                <><QrCode size={18} /> Scan QR Code</>
              )}
            </button>
            <button onClick={() => setStep('verify')} className="btn-outline">
              Type Health ID
            </button>
          </div>
          <div className="flex items-center justify-center gap-4 mt-6">
            {[
              { icon: Shield, label: 'Emergency Access' },
              { icon: ClipboardList, label: 'Fully Logged' },
              { icon: Lock, label: 'Consent Controlled' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-xs text-slate-500">
                <Icon size={13} className="text-slate-400" /> {label}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step: Verify */}
      {step === 'verify' && (
        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
              <CheckCircle2 size={22} className="text-green-600" />
            </div>
            <div>
              <h2 className="font-bold text-slate-800">Patient Identified</h2>
              <p className="text-xs text-slate-500">Identity verified via Jeevansh Health ID</p>
            </div>
          </div>

          {/* Patient selector for demo */}
          <div className="mb-4 p-3 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-xs font-semibold text-blue-700 mb-2">Demo: Select patient to view</p>
            <div className="flex gap-2 flex-wrap">
              {patients.map(p => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPatient(p)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                    selectedPatient.id === p.id ? 'bg-blue-700 text-white' : 'bg-white text-blue-700 border border-blue-200'
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="p-3 bg-slate-50 rounded-xl">
              <p className="text-xs text-slate-500 font-semibold">Patient Name</p>
              <p className="font-bold text-slate-800">{patient.name}</p>
              <p className="text-xs text-slate-400">{patient.nameHindi}</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <p className="text-xs text-slate-500 font-semibold">Health ID</p>
              <p className="font-mono font-bold text-blue-700 text-sm">{patient.healthId}</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <p className="text-xs text-slate-500 font-semibold">Age / Gender</p>
              <p className="font-bold text-slate-800">{patient.age} yrs · {patient.gender}</p>
            </div>
            <div className="p-3 bg-red-50 rounded-xl">
              <p className="text-xs text-red-600 font-semibold">Blood Group</p>
              <p className="font-black text-2xl text-red-700">{patient.bloodGroup}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 bg-green-50 rounded-xl border border-green-200 mb-4">
            <CheckCircle2 size={18} className="text-green-600" />
            <div>
              <p className="text-sm font-bold text-green-800">Identity Verified</p>
              <p className="text-xs text-green-600">Jeevansh Health ID confirmed · Emergency access authorized</p>
            </div>
          </div>

          <button onClick={() => setStep('profile')} className="btn-emergency w-full justify-center">
            Access Critical Information <ChevronRight size={16} />
          </button>
        </div>
      )}

      {/* Step: Emergency Profile */}
      {step === 'profile' && (
        <div className="space-y-4">
          {/* Header */}
          <div className="rounded-2xl p-5 text-white" style={{ background: 'linear-gradient(135deg, #b91c1c 0%, #7f1d1d 100%)' }}>
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle size={16} className="text-red-200" />
              <span className="text-red-200 text-xs font-bold uppercase tracking-wider">Emergency Health Profile</span>
            </div>
            <h2 className="text-xl font-bold">{patient.name}</h2>
            <p className="text-red-200 text-sm">{patient.healthId} · {patient.age}y · {patient.gender}</p>
          </div>

          {/* Critical info grid */}
          <div className="grid grid-cols-2 gap-3">
            {/* Blood Group */}
            <div className="card bg-red-50 border-red-200 text-center p-4">
              <div className="flex items-center gap-1.5 justify-center mb-1">
                <Droplets size={14} className="text-red-600" />
                <p className="text-xs font-bold text-red-700 uppercase tracking-wider">Blood Group</p>
              </div>
              <p className="text-4xl font-black text-red-700">{patient.bloodGroup}</p>
            </div>

            {/* Allergies */}
            <div className="card bg-orange-50 border-orange-200">
              <div className="flex items-center gap-1.5 mb-2">
                <AlertTriangle size={14} className="text-orange-600" />
                <p className="text-xs font-bold text-orange-700 uppercase tracking-wider">Allergies</p>
              </div>
              {patient.allergies.map(a => (
                <div key={a} className="tag-allergy mb-1 inline-block">⚠ {a}</div>
              ))}
            </div>

            {/* Critical Conditions */}
            <div className="card bg-red-50 border-red-200 col-span-2">
              <div className="flex items-center gap-1.5 mb-2">
                <Heart size={14} className="text-red-600" />
                <p className="text-xs font-bold text-red-700 uppercase tracking-wider">Critical Conditions</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {patient.criticalConditions.map(c => (
                  <span key={c} className="tag-critical">● {c}</span>
                ))}
              </div>
            </div>

            {/* Current Medications */}
            <div className="card col-span-2">
              <div className="flex items-center gap-1.5 mb-3">
                <Pill size={14} className="text-teal-600" />
                <p className="text-xs font-bold text-teal-700 uppercase tracking-wider">Current Medications</p>
              </div>
              <div className="space-y-2">
                {patient.currentMedications.map(m => (
                  <div key={m.name} className="flex items-center justify-between py-1.5 border-b border-slate-50 last:border-0">
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{m.name}</p>
                      <p className="text-xs text-slate-400">{m.dose}</p>
                    </div>
                    <span className="tag-medication">Active</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Summary */}
          <div className="card border-blue-200 bg-gradient-to-br from-blue-50 to-slate-50">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-blue-700 flex items-center justify-center">
                <Brain size={15} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-sm">AI-Generated Clinical Context</h3>
                <p className="text-xs text-blue-600">Jeevansh Health Agent</p>
              </div>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">{aiSummaries[patient.id]}</p>
            <div className="ai-disclaimer">
              <Shield size={12} />
              AI ASSISTIVE SUMMARY — NOT A DIAGNOSIS. Verify against original medical records.
            </div>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-3 gap-3">
            <button className="btn-outline justify-center flex-col py-3 h-auto">
              <FileText size={18} className="mb-1" />
              <span className="text-xs">Full History</span>
            </button>
            <button className="btn-outline justify-center flex-col py-3 h-auto">
              <ClipboardList size={18} className="mb-1" />
              <span className="text-xs">Reports</span>
            </button>
            <button className="btn-outline justify-center flex-col py-3 h-auto">
              <Pill size={18} className="mb-1" />
              <span className="text-xs">Medications</span>
            </button>
          </div>

          {/* Access logged notice */}
          <div className="flex items-center gap-2 p-3 bg-slate-100 rounded-xl text-xs text-slate-600">
            <Shield size={13} className="text-slate-500 flex-shrink-0" />
            <span><strong>Access logged:</strong> This emergency access has been recorded and will be visible to the patient. Emergency access override is active.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmergencyAccess;
