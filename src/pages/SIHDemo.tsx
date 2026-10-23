import React, { useState, useEffect } from 'react';
import { patients } from '../data/patients';
import { aiSummaries } from '../data/hospital';
import {
  Play, AlertTriangle, CheckCircle2, QrCode, User,
  Heart, Brain, FileText, Shield, ClipboardList,
  ArrowDown, X, Droplets, Pill, Lock, Zap
} from 'lucide-react';

interface DemoStep {
  key: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  detail?: React.ReactNode;
}

const SIHDemo: React.FC = () => {
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [autoPlay, setAutoPlay] = useState(false);
  const patient = patients[0];

  const steps: DemoStep[] = [
    {
      key: 'arrive',
      icon: <AlertTriangle className="text-red-500" size={22} />,
      title: 'Patient Arrives Unconscious',
      description: 'Rahul Patil, 42, brought to City Hospital emergency — unconscious, no verbal response.',
      detail: (
        <div className="p-3 bg-red-50 rounded-xl border border-red-200 text-sm text-red-800">
          <strong>Scenario:</strong> Patient arrives at a hospital where he has never been treated before. No relatives present. No medical documents.
        </div>
      ),
    },
    {
      key: 'scan',
      icon: <QrCode className="text-blue-600" size={22} />,
      title: 'Jeevansh QR Code Scanned',
      description: 'Doctor scans the patient\'s Jeevansh Emergency QR from their phone / wristband.',
      detail: (
        <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-xl border border-blue-200">
          <div className="bg-white rounded-xl p-2 border border-blue-200">
            <div className="w-16 h-16 bg-slate-800 rounded-sm grid grid-cols-5 gap-px p-1">
              {Array.from({ length: 25 }).map((_, i) => (
                <div key={i} className={`rounded-[1px] ${[0,1,5,6,10,11,14,15,20,21,24,3,8,16,23].includes(i) ? 'bg-white' : 'bg-transparent'}`} />
              ))}
            </div>
          </div>
          <div>
            <p className="font-semibold text-blue-800 text-sm">Jeevansh Emergency QR</p>
            <p className="text-xs text-blue-600">Contains only Health ID — no raw medical data</p>
            <p className="text-xs text-blue-500 mt-1">Scanning... <span className="font-bold">Connected to Jeevansh system</span></p>
          </div>
        </div>
      ),
    },
    {
      key: 'identity',
      icon: <CheckCircle2 className="text-green-600" size={22} />,
      title: 'Identity Verified',
      description: 'Patient identified in under 3 seconds via Jeevansh Health ID.',
      detail: (
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-green-50 rounded-xl border border-green-200">
            <p className="text-xs font-semibold text-green-700 mb-1">Patient Name</p>
            <p className="font-bold text-green-900">{patient.name}</p>
          </div>
          <div className="p-3 bg-green-50 rounded-xl border border-green-200">
            <p className="text-xs font-semibold text-green-700 mb-1">Health ID</p>
            <p className="font-mono font-bold text-green-800 text-sm">{patient.healthId}</p>
          </div>
          <div className="p-3 bg-red-50 rounded-xl border border-red-200 text-center">
            <p className="text-xs font-semibold text-red-600">Blood Group</p>
            <p className="text-2xl font-black text-red-700">{patient.bloodGroup}</p>
          </div>
          <div className="p-3 bg-green-50 rounded-xl border border-green-200">
            <p className="text-xs font-semibold text-green-700">Age / Gender</p>
            <p className="font-bold text-green-900">{patient.age}y · {patient.gender}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'history',
      icon: <Heart className="text-red-600" size={22} />,
      title: 'Critical History Retrieved',
      description: 'Complete emergency profile loaded instantly — allergies, conditions, medications.',
      detail: (
        <div className="space-y-2">
          {patient.allergies.map(a => (
            <div key={a} className="flex items-center gap-2 p-2.5 bg-orange-50 rounded-xl border border-orange-200">
              <AlertTriangle size={14} className="text-orange-600 flex-shrink-0" />
              <span className="text-sm font-bold text-orange-800">⚠ ALLERGY: {a}</span>
            </div>
          ))}
          {patient.criticalConditions.map(c => (
            <div key={c} className="flex items-center gap-2 p-2.5 bg-red-50 rounded-xl border border-red-200">
              <Heart size={14} className="text-red-600 flex-shrink-0" />
              <span className="text-sm font-semibold text-red-800">{c}</span>
            </div>
          ))}
          {patient.currentMedications.map(m => (
            <div key={m.name} className="flex items-center gap-2 p-2.5 bg-teal-50 rounded-xl border border-teal-200">
              <Pill size={14} className="text-teal-600 flex-shrink-0" />
              <span className="text-sm text-teal-800">{m.name} · <span className="text-xs">{m.dose}</span></span>
            </div>
          ))}
        </div>
      ),
    },
    {
      key: 'ai',
      icon: <Brain className="text-blue-700" size={22} />,
      title: 'AI Summarizes Relevant History',
      description: 'Jeevansh Health Agent generates an assistive clinical context summary for the emergency doctor.',
      detail: (
        <div className="p-4 bg-gradient-to-br from-blue-50 to-slate-50 rounded-xl border border-blue-200">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded bg-blue-700 flex items-center justify-center">
              <Brain size={12} className="text-white" />
            </div>
            <span className="font-semibold text-blue-900 text-sm">Jeevansh Health Agent</span>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">{aiSummaries[patient.id]}</p>
          <div className="mt-3 flex items-center gap-1.5 text-[10px] text-slate-500 border-t border-slate-200 pt-2.5">
            <Shield size={10} />
            AI ASSISTIVE SUMMARY — NOT A DIAGNOSIS. Verify against original records.
          </div>
        </div>
      ),
    },
    {
      key: 'review',
      icon: <FileText className="text-slate-600" size={22} />,
      title: 'Doctor Reviews Original Records',
      description: 'Treating physician verifies original documents — previous ECG, lab reports, prescriptions.',
      detail: (
        <div className="space-y-2">
          {patient.history.slice(0, 2).map(h => (
            <div key={h.id} className="p-3 bg-white rounded-xl border border-slate-200">
              <p className="font-semibold text-slate-800 text-sm">{h.title}</p>
              <p className="text-xs text-slate-500">{h.hospital} · {h.date}</p>
              <p className="text-xs text-slate-600 mt-1">{h.diagnosis}</p>
            </div>
          ))}
        </div>
      ),
    },
    {
      key: 'treat',
      icon: <Zap className="text-amber-500" size={22} />,
      title: 'Treatment & Referral',
      description: 'Doctor initiates treatment informed by full patient context. Cardiology referral created in Jeevansh.',
      detail: (
        <div className="p-3 bg-green-50 rounded-xl border border-green-200 space-y-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-green-600" />
            <span className="text-sm font-semibold text-green-800">Treatment Initiated — Penicillin avoided (allergy noted)</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-green-600" />
            <span className="text-sm font-semibold text-green-800">Cardiology referral created in Jeevansh network</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-green-600" />
            <span className="text-sm font-semibold text-green-800">Current medications updated in patient record</span>
          </div>
        </div>
      ),
    },
    {
      key: 'log',
      icon: <Shield className="text-blue-700" size={22} />,
      title: 'Access Logged — Patient Notified',
      description: 'Every access is permanently recorded. Patient can see who accessed their records.',
      detail: (
        <div className="space-y-2">
          <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
            <p className="text-xs font-bold text-blue-700 uppercase mb-1">Access Log Entry</p>
            <p className="text-sm font-semibold text-slate-800">Dr. Anil Sharma — City Hospital</p>
            <p className="text-xs text-slate-500">Emergency Access · Today, {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</p>
          </div>
          <div className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-xl border border-slate-200">
            <Lock size={13} className="text-slate-500" />
            <span className="text-xs text-slate-600">Patient will be notified and can view this access in their Privacy dashboard</span>
          </div>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (autoPlay && started && currentStep < steps.length - 1) {
      const timer = setTimeout(() => setCurrentStep(s => s + 1), 2200);
      return () => clearTimeout(timer);
    }
    if (currentStep === steps.length - 1) setAutoPlay(false);
  }, [autoPlay, currentStep, started]);

  const startDemo = () => {
    setStarted(true);
    setCurrentStep(0);
    setAutoPlay(true);
  };

  const resetDemo = () => {
    setStarted(false);
    setCurrentStep(-1);
    setAutoPlay(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      {/* Header */}
      <div className="rounded-2xl p-6 text-white relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f4c81 0%, #083460 100%)' }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 0%, transparent 50%), radial-gradient(circle at 80% 50%, white 0%, transparent 50%)' }} />
        <div className="relative z-10 text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-4">
            <Play size={28} className="text-white ml-1" />
          </div>
          <h1 className="text-2xl font-black mb-2">Jeevansh — SIH Demo Mode</h1>
          <p className="text-blue-200 text-sm mb-4 leading-relaxed max-w-md mx-auto">
            Watch the complete Jeevansh emergency workflow — from unconscious patient to informed treatment — pan-India, in under 60 seconds.
          </p>

          {!started ? (
            <button onClick={startDemo} className="btn-emergency mx-auto text-base px-8 py-3">
              <Play size={20} />
              Start Emergency Demo
            </button>
          ) : (
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setAutoPlay(!autoPlay)}
                className={`px-5 py-2 rounded-xl font-semibold text-sm transition-all ${autoPlay ? 'bg-white/20 text-white' : 'bg-white text-blue-800'}`}
              >
                {autoPlay ? '⏸ Pause' : '▶ Auto Play'}
              </button>
              <button onClick={resetDemo} className="p-2 bg-white/10 rounded-xl hover:bg-white/20 transition-colors">
                <X size={16} className="text-white" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Steps */}
      {started && (
        <div className="space-y-3">
          {steps.map((step, index) => {
            const isActive = index === currentStep;
            const isDone = index < currentStep;
            const isPending = index > currentStep;

            return (
              <div key={step.key}>
                <div
                  onClick={() => setCurrentStep(index)}
                  className={`demo-step cursor-pointer ${isActive ? 'active' : isDone ? 'completed' : ''} ${isPending ? 'opacity-40' : ''}`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isDone ? 'bg-green-100' : isActive ? 'bg-blue-100' : 'bg-slate-100'
                  }`}>
                    {isDone ? <CheckCircle2 size={20} className="text-green-600" /> : step.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${
                        isDone ? 'text-green-600' : isActive ? 'text-blue-600' : 'text-slate-400'
                      }`}>Step {index + 1}</span>
                      {isActive && (
                        <span className="text-[10px] bg-blue-700 text-white px-2 py-0.5 rounded-full font-bold">ACTIVE</span>
                      )}
                      {isDone && (
                        <span className="text-[10px] bg-green-600 text-white px-2 py-0.5 rounded-full font-bold">DONE</span>
                      )}
                    </div>
                    <p className={`font-bold text-sm ${isActive ? 'text-blue-800' : isDone ? 'text-green-800' : 'text-slate-600'}`}>
                      {step.title}
                    </p>
                    <p className={`text-xs ${isActive ? 'text-blue-600' : 'text-slate-500'}`}>{step.description}</p>
                  </div>
                </div>

                {isActive && step.detail && (
                  <div className="ml-14 mt-2 animate-[slideUp_0.25s_ease]">
                    {step.detail}
                  </div>
                )}

                {isActive && index < steps.length - 1 && (
                  <div className="flex justify-center my-1">
                    <ArrowDown size={16} className="text-blue-400" />
                  </div>
                )}
              </div>
            );
          })}

          {currentStep === steps.length - 1 && (
            <div className="card bg-gradient-to-br from-green-50 to-teal-50 border-green-200 text-center p-6 animate-[slideUp_0.3s_ease]">
              <CheckCircle2 size={48} className="text-green-600 mx-auto mb-3" />
              <h2 className="text-xl font-bold text-green-900 mb-2">Emergency Resolved</h2>
              <p className="text-sm text-green-700 leading-relaxed mb-4">
                Patient received informed treatment in minutes — not hours. Jeevansh connected his fragmented medical journey across hospitals and enabled a life-saving outcome.
              </p>
              <div className="bg-white rounded-xl p-4 text-left mb-4">
                <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">What Jeevansh Delivered</p>
                <div className="space-y-1.5">
                  {[
                    '✓ Identity verified in under 3 seconds',
                    '✓ Full medical history from previous hospitals loaded instantly',
                    '✓ Critical allergies flagged — prevented wrong medication',
                    '✓ AI clinical context summarized — no time wasted on paperwork',
                    '✓ Referral created within the Jeevansh network — pan-India',
                    '✓ Access logged — patient notified and in control',
                  ].map(line => (
                    <p key={line} className="text-xs text-slate-700">{line}</p>
                  ))}
                </div>
              </div>
              <button onClick={resetDemo} className="btn-primary mx-auto">
                Restart Demo
              </button>
            </div>
          )}

          {/* Navigation */}
          {currentStep < steps.length - 1 && (
            <div className="flex justify-between">
              <button
                onClick={() => setCurrentStep(s => Math.max(0, s - 1))}
                disabled={currentStep === 0}
                className="btn-outline disabled:opacity-30"
              >
                ← Previous
              </button>
              <button
                onClick={() => setCurrentStep(s => Math.min(steps.length - 1, s + 1))}
                className="btn-primary"
              >
                Next Step →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SIHDemo;
