import React, { useState } from 'react';
import { patients } from '../../data/patients';
import { aiSummaries } from '../../data/hospital';
import {
  Brain, Search, Send, User, AlertTriangle, Pill,
  FileText, Clock, Shield, ChevronRight, Sparkles
} from 'lucide-react';

const quickPrompts = [
  "Summarize this patient's history",
  "Show recent medications",
  "What allergies should I know?",
  "Summarize previous hospital visits",
  "Show important changes in the last 12 months",
  "Are there any critical drug interactions to be aware of?",
];

interface Message {
  role: 'user' | 'agent';
  content: string;
}

const generateResponse = (prompt: string, patientId: string): string => {
  const patient = patients.find(p => p.id === patientId)!;
  const base = aiSummaries[patientId];

  if (prompt.toLowerCase().includes('allerg')) {
    return `**Allergy Alert for ${patient.name}:**\n\n` +
      patient.allergies.map(a => `⚠️ **${a}** — Avoid completely. No exceptions in acute settings.`).join('\n') +
      `\n\nPlease verify against the original allergy record before administering any medication. This is an AI-generated summary — not a clinical directive.`;
  }
  if (prompt.toLowerCase().includes('medic')) {
    return `**Current Medications for ${patient.name}:**\n\n` +
      patient.currentMedications.map(m => `• **${m.name}** — ${m.dose} (since ${m.since})`).join('\n') +
      `\n\nPlease review the full prescription record for contraindications.`;
  }
  if (prompt.toLowerCase().includes('summar') || prompt.toLowerCase().includes('histor')) {
    return `**Patient Context Summary — ${patient.name}:**\n\n${base}\n\n*${patient.history.length} medical encounters | ${patient.history.filter(h => h.reports?.length).length} with lab reports | ${patient.history.filter(h => h.prescription).length} with prescriptions*`;
  }
  if (prompt.toLowerCase().includes('visit') || prompt.toLowerCase().includes('hospital')) {
    const events = patient.history.slice(0, 4);
    return `**Recent Hospital Visits for ${patient.name}:**\n\n` +
      events.map(e => `• **${e.title}** — ${e.hospital} (${e.date})\n  Diagnosis: ${e.diagnosis}`).join('\n\n') +
      `\n\nFor complete records, refer to the original documents.`;
  }
  // Default response
  return `**Regarding ${patient.name}:**\n\n${base}\n\n*Based on ${patient.history.length} records available in Jeevansh.*`;
};

const AIHealthAgent: React.FC = () => {
  const [selectedPatient, setSelectedPatient] = useState(patients[0]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    setTimeout(() => {
      const response = generateResponse(text, selectedPatient.id);
      setMessages(prev => [...prev, { role: 'agent', content: response }]);
      setLoading(false);
    }, 1200);
  };

  const patient = selectedPatient;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Brain size={20} className="text-blue-700" />
          Jeevansh Health Agent
        </h1>
        <p className="text-sm text-slate-500">AI-powered clinical context assistant. Not a diagnostic tool.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Patient Context Panel */}
        <div className="space-y-4">
          {/* Patient selector */}
          <div className="card">
            <h3 className="font-semibold text-slate-800 text-sm mb-3 flex items-center gap-2">
              <User size={15} className="text-blue-600" />
              Active Patient
            </h3>
            <div className="space-y-2">
              {patients.map(p => (
                <button
                  key={p.id}
                  onClick={() => { setSelectedPatient(p); setMessages([]); }}
                  className={`w-full text-left p-2.5 rounded-xl border transition-all ${
                    selectedPatient.id === p.id
                      ? 'border-blue-300 bg-blue-50'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs flex-shrink-0">
                      {p.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className={`text-sm font-semibold truncate ${selectedPatient.id === p.id ? 'text-blue-700' : 'text-slate-700'}`}>{p.name}</p>
                      <p className="text-[10px] text-slate-400 truncate">{p.healthId}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Patient Context Summary */}
          <div className="card">
            <h3 className="font-semibold text-slate-800 text-sm mb-3">Patient Context</h3>
            <div className="space-y-3">
              <div>
                <p className="text-[10px] font-bold text-red-600 uppercase tracking-wider mb-1.5">Important</p>
                <div className="space-y-1">
                  {patient.allergies.map(a => (
                    <div key={a} className="flex items-center gap-1.5 text-xs">
                      <AlertTriangle size={11} className="text-orange-500 flex-shrink-0" />
                      <span className="font-medium text-orange-700">Allergy: {a}</span>
                    </div>
                  ))}
                  {patient.criticalConditions.map(c => (
                    <div key={c} className="flex items-center gap-1.5 text-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                      <span className="font-medium text-slate-700">{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[10px] font-bold text-teal-600 uppercase tracking-wider mb-1.5">Current Meds</p>
                <div className="space-y-1">
                  {patient.currentMedications.map(m => (
                    <div key={m.name} className="flex items-center gap-1.5 text-xs">
                      <Pill size={10} className="text-teal-500 flex-shrink-0" />
                      <span className="text-slate-600">{m.name} · {m.dose}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Records</p>
                <div className="space-y-1 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5"><FileText size={10} className="text-slate-400" /> {patient.history.length} medical encounters</div>
                  <div className="flex items-center gap-1.5"><Clock size={10} className="text-slate-400" /> Last: {patient.history[0]?.date}</div>
                </div>
              </div>
            </div>

            <div className="ai-disclaimer mt-3">
              <Shield size={10} />
              AI-generated information. Verify against original records.
            </div>
          </div>
        </div>

        {/* Chat Panel */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {/* Chat window */}
          <div className="card flex-1 flex flex-col" style={{ minHeight: '400px' }}>
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 mb-3">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <Sparkles size={14} className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-slate-800 text-sm">Jeevansh Health Agent</p>
                <p className="text-[10px] text-teal-600 font-semibold">Active · {patient.name}</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-3 min-h-0" style={{ maxHeight: '350px' }}>
              {messages.length === 0 && (
                <div className="text-center py-8">
                  <Brain size={36} className="text-slate-200 mx-auto mb-3" />
                  <p className="text-sm text-slate-400 font-medium">Ask about {patient.name}'s clinical context</p>
                  <p className="text-xs text-slate-300 mt-1">All responses are AI-generated summaries, not diagnoses</p>
                </div>
              )}
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'agent' && (
                    <div className="w-6 h-6 rounded-full gradient-primary flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                      <Brain size={11} className="text-white" />
                    </div>
                  )}
                  <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                    msg.role === 'user'
                      ? 'bg-blue-700 text-white rounded-tr-sm'
                      : 'bg-slate-100 text-slate-800 rounded-tl-sm'
                  }`}>
                    <p className="whitespace-pre-line leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="w-6 h-6 rounded-full gradient-primary flex items-center justify-center mr-2 flex-shrink-0">
                    <Brain size={11} className="text-white" />
                  </div>
                  <div className="bg-slate-100 rounded-2xl rounded-tl-sm px-4 py-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="mt-3 pt-3 border-t border-slate-100">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
                  placeholder={`Ask about ${patient.name}...`}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all"
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={loading || !input.trim()}
                  className="btn-primary px-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Prompts */}
          <div className="card">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Quick Queries</p>
            <div className="flex flex-wrap gap-2">
              {quickPrompts.map(prompt => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  className="text-xs bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-600 px-3 py-1.5 rounded-lg font-medium transition-colors border border-transparent hover:border-blue-200 flex items-center gap-1"
                >
                  <ChevronRight size={11} className="flex-shrink-0" />
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="flex items-start gap-2 p-3 bg-amber-50 rounded-xl border border-amber-200">
            <Shield size={14} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800 leading-relaxed">
              <strong>AI-generated information.</strong> Jeevansh Health Agent provides assistive clinical context summaries only. It does not independently diagnose, prescribe, or make clinical decisions. Always verify AI output against original medical records.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIHealthAgent;
