import React from 'react';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard, FileText, Calendar, Pill, ClipboardList,
  QrCode, ShieldCheck, Users, AlertTriangle, Bot, GitMerge,
  BarChart3, BedDouble, Stethoscope, X
} from 'lucide-react';

interface SidebarProps {
  activePage: string;
  setActivePage: (p: string) => void;
  open: boolean;
  setOpen: (v: boolean) => void;
}

const patientNav = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'records', label: 'Health Records', icon: FileText },
  { key: 'appointments', label: 'Appointments', icon: Calendar },
  { key: 'medications', label: 'Medications', icon: Pill },
  { key: 'reports', label: 'Reports', icon: ClipboardList },
  { key: 'emergency-id', label: 'Emergency ID', icon: QrCode },
  { key: 'privacy', label: 'Privacy & Access', icon: ShieldCheck },
];

const doctorNav = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'patients', label: 'Patients', icon: Users },
  { key: 'emergency', label: 'Emergency', icon: AlertTriangle },
  { key: 'records', label: 'Health Records', icon: FileText },
  { key: 'ai-agent', label: 'AI Health Agent', icon: Bot },
  { key: 'referrals', label: 'Referrals', icon: GitMerge },
];

const adminNav = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'appointments', label: 'Appointments', icon: Calendar },
  { key: 'doctors', label: 'Doctors', icon: Stethoscope },
  { key: 'resources', label: 'Resources', icon: BedDouble },
  { key: 'emergency', label: 'Emergency', icon: AlertTriangle },
  { key: 'reports', label: 'Reports', icon: BarChart3 },
];

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage, open, setOpen }) => {
  const { role } = useApp();

  const navItems = role === 'patient' ? patientNav : role === 'doctor' ? doctorNav : adminNav;

  const roleColors = {
    patient: { bg: 'bg-teal-700', text: 'Rahul Patil', sub: 'JVS-2847-9142' },
    doctor: { bg: 'bg-blue-800', text: 'Dr. Anil Sharma', sub: 'Cardiology' },
    admin: { bg: 'bg-purple-800', text: 'Admin — City Hospital', sub: 'Hospital Administrator' },
  };

  const info = roleColors[role];

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed top-14 left-0 bottom-0 w-60 bg-white border-r border-slate-200 z-30 flex flex-col transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        style={{ boxShadow: '1px 0 8px 0 rgb(0 0 0 / 0.04)' }}
      >
        {/* User info */}
        <div className={`${info.bg} px-4 py-3 flex items-center gap-3`}>
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold text-white text-sm flex-shrink-0">
            {info.text.charAt(0)}
          </div>
          <div className="min-w-0">
            <p className="text-white font-semibold text-sm truncate">{info.text}</p>
            <p className="text-white/60 text-xs truncate">{info.sub}</p>
          </div>
          <button
            className="ml-auto p-1 rounded hover:bg-white/10 transition-colors lg:hidden text-white"
            onClick={() => setOpen(false)}
          >
            <X size={14} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3 px-2 overflow-y-auto">
          {navItems.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => { setActivePage(key); setOpen(false); }}
              className={`sidebar-link w-full text-left mb-0.5 ${activePage === key ? 'active' : ''}`}
            >
              <Icon size={17} className="flex-shrink-0" />
              {label}
            </button>
          ))}
        </nav>

        {/* Bottom integration note */}
        <div className="px-4 py-3 border-t border-slate-100">
          <p className="text-xs text-slate-400 font-medium mb-1.5">Integration Ready</p>
          <div className="flex flex-wrap gap-1">
            {['ABDM', 'FHIR', 'DigiLocker'].map(tag => (
              <span key={tag} className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-medium">{tag}</span>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
