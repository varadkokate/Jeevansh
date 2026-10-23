import React, { useRef } from 'react';
import { QRCodeSVG as QRCode } from 'qrcode.react';
import { patients } from '../../data/patients';
import {
  QrCode, Shield, AlertTriangle, Droplets, Heart,
  Download, Phone, MapPin, User, Wifi, WifiOff
} from 'lucide-react';

const EmergencyID: React.FC = () => {
  const patient = patients[0];
  const qrRef = useRef<HTMLDivElement>(null);

  const qrData = JSON.stringify({
    healthId: patient.healthId,
    name: patient.name,
    bloodGroup: patient.bloodGroup,
    system: 'JEEVANSH',
    version: '1.0',
  });

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-800">Emergency Health ID</h1>
        <p className="text-sm text-slate-500">Present this card or QR code in emergencies for immediate health profile access.</p>
      </div>

      {/* Health ID Card */}
      <div ref={qrRef} className="rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f4c81 0%, #083460 100%)', boxShadow: '0 16px 48px -8px rgb(8 52 96 / 0.5)' }}>
        {/* Card Header */}
        <div className="px-6 pt-5 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <Heart size={16} className="text-white" />
            </div>
            <div>
              <p className="text-white font-black text-lg tracking-tight leading-none">JEEVANSH</p>
              <p className="text-blue-300 text-[10px] font-medium tracking-wider">INDIA'S UNIFIED HEALTH PLATFORM</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 bg-green-400/20 px-2.5 py-1 rounded-full">
            <Wifi size={11} className="text-green-300" />
            <span className="text-green-300 text-[10px] font-bold">EMERGENCY ENABLED</span>
          </div>
        </div>

        {/* Card Body */}
        <div className="px-6 pb-5 flex gap-5">
          {/* Patient Info */}
          <div className="flex-1">
            <h2 className="text-white text-xl font-bold mb-0.5">{patient.name}</h2>
            <p className="text-blue-300 text-xs font-medium mb-3">{patient.nameHindi}</p>
            <div className="font-mono text-sm font-bold tracking-widest text-blue-200 mb-4 bg-white/10 px-3 py-1.5 rounded-lg inline-block">
              {patient.healthId}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white/10 rounded-xl p-2.5">
                <p className="text-blue-300 text-[10px] font-semibold uppercase tracking-wider">Age</p>
                <p className="text-white font-bold">{patient.age} yrs</p>
              </div>
              <div className="bg-white/10 rounded-xl p-2.5">
                <p className="text-blue-300 text-[10px] font-semibold uppercase tracking-wider">Blood Group</p>
                <p className="text-red-300 font-black text-lg">{patient.bloodGroup}</p>
              </div>
            </div>
            {/* Critical allergy */}
            <div className="mt-2 bg-red-500/20 border border-red-400/30 rounded-xl p-2.5">
              <div className="flex items-center gap-1.5 mb-1">
                <AlertTriangle size={11} className="text-red-300" />
                <p className="text-red-300 text-[10px] font-bold uppercase tracking-wider">Allergy Alert</p>
              </div>
              <p className="text-white text-xs font-semibold">{patient.allergies.join(', ')}</p>
            </div>
          </div>

          {/* QR */}
          <div className="flex-shrink-0">
            <div className="bg-white rounded-2xl p-3">
              <QRCode value={qrData} size={140} level="M" />
            </div>
            <p className="text-blue-300 text-[10px] text-center mt-2 font-medium">Scan for Emergency Access</p>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-black/20 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Phone size={13} className="text-blue-300" />
            <div>
              <p className="text-blue-300 text-[10px] font-semibold">Emergency Contact</p>
              <p className="text-white text-xs font-medium">{patient.emergencyContact} · {patient.emergencyPhone}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <WifiOff size={12} className="text-amber-300" />
            <span className="text-amber-300 text-[10px] font-semibold">Offline Ready</span>
          </div>
        </div>
      </div>

      {/* Download button */}
      <div className="flex gap-3">
        <button className="btn-primary flex-1 justify-center">
          <Download size={16} />
          Download Emergency Card
        </button>
        <button className="btn-outline flex-1 justify-center">
          <QrCode size={16} />
          Share Health ID
        </button>
      </div>

      {/* Info note */}
      <div className="card bg-blue-50 border-blue-200">
        <div className="flex gap-3">
          <Shield size={18} className="text-blue-700 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-blue-900 text-sm">Your Data is Protected</p>
            <p className="text-blue-700 text-xs mt-1 leading-relaxed">
              The QR code contains only your Health ID — no medical information is stored inside the QR itself. Scanning the QR gives authorized emergency responders access to critical information only after identity verification through the Jeevansh system. Every access is logged and visible to you.
            </p>
          </div>
        </div>
      </div>

      {/* Offline profile */}
      <div className="card">
        <h3 className="font-semibold text-slate-800 text-sm mb-3 flex items-center gap-2">
          <WifiOff size={15} className="text-amber-500" />
          Offline Emergency Profile
        </h3>
        <p className="text-xs text-slate-500 mb-3">Critical information accessible even without internet connectivity</p>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-red-50 rounded-xl border border-red-100">
            <div className="flex items-center gap-1.5 mb-1">
              <Droplets size={13} className="text-red-600" />
              <p className="text-xs font-semibold text-red-700">Blood Group</p>
            </div>
            <p className="text-xl font-black text-red-700">{patient.bloodGroup}</p>
          </div>
          <div className="p-3 bg-orange-50 rounded-xl border border-orange-100">
            <div className="flex items-center gap-1.5 mb-1">
              <AlertTriangle size={13} className="text-orange-600" />
              <p className="text-xs font-semibold text-orange-700">Allergies</p>
            </div>
            <p className="text-sm font-bold text-orange-700">{patient.allergies[0]}</p>
            {patient.allergies.length > 1 && <p className="text-xs text-orange-500">+{patient.allergies.length - 1} more</p>}
          </div>
          <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 col-span-2">
            <div className="flex items-center gap-1.5 mb-1">
              <User size={13} className="text-blue-600" />
              <p className="text-xs font-semibold text-blue-700">Emergency Contact</p>
            </div>
            <p className="text-sm font-semibold text-blue-800">{patient.emergencyContact}</p>
            <p className="text-sm font-bold text-blue-700">{patient.emergencyPhone}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyID;
