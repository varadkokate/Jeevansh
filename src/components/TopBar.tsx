import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Activity, Shield, ChevronDown, Globe, Menu, X,
  Stethoscope, UserCircle, Building2
} from 'lucide-react';

interface TopBarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
}

const roleLabels = {
  patient: { label: 'Patient View', icon: UserCircle, color: 'text-teal-600' },
  doctor: { label: 'Doctor Console', icon: Stethoscope, color: 'text-blue-700' },
  admin: { label: 'Admin Dashboard', icon: Building2, color: 'text-purple-700' },
};

const TopBar: React.FC<TopBarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const { role, setRole, language, setLanguage } = useApp();
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  const RoleIcon = roleLabels[role].icon;

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-slate-200 px-4 flex items-center justify-between h-14" style={{ boxShadow: '0 1px 4px 0 rgb(0 0 0 / 0.06)' }}>
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors lg:hidden"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center">
            <Activity size={14} className="text-white" />
          </div>
          <div>
            <span className="font-black text-base tracking-tight" style={{ color: 'var(--color-primary)' }}>JEEVANSH</span>
            <span className="hidden sm:inline text-xs text-slate-400 ml-2 font-medium">India's Unified Health Platform</span>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        {/* Language */}
        <div className="relative">
          <button
            onClick={() => { setShowLangMenu(!showLangMenu); setShowRoleMenu(false); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-100 text-sm font-medium text-slate-600 transition-colors"
          >
            <Globe size={15} />
            <span className="hidden sm:inline">{language === 'en' ? 'English' : language === 'hi' ? 'हिंदी' : 'मराठी'}</span>
            <ChevronDown size={13} />
          </button>
          {showLangMenu && (
            <div className="absolute right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg w-36 z-50 overflow-hidden">
              {(['en', 'hi', 'mr'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => { setLanguage(lang); setShowLangMenu(false); }}
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 transition-colors ${language === lang ? 'font-semibold text-blue-700 bg-blue-50' : 'text-slate-700'}`}
                >
                  {lang === 'en' ? 'English' : lang === 'hi' ? 'हिंदी' : 'मराठी'}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Role Switcher */}
        <div className="relative">
          <button
            onClick={() => { setShowRoleMenu(!showRoleMenu); setShowLangMenu(false); }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-sm font-semibold transition-colors"
            style={{ color: 'var(--color-primary)' }}
          >
            <RoleIcon size={15} />
            <span className="hidden sm:inline">{roleLabels[role].label}</span>
            <ChevronDown size={13} />
          </button>
          {showRoleMenu && (
            <div className="absolute right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg w-44 z-50 overflow-hidden">
              {(Object.keys(roleLabels) as Array<keyof typeof roleLabels>).map((r) => {
                const Icon = roleLabels[r].icon;
                return (
                  <button
                    key={r}
                    onClick={() => { setRole(r); setShowRoleMenu(false); }}
                    className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 hover:bg-slate-50 transition-colors ${role === r ? 'font-semibold bg-blue-50 text-blue-700' : 'text-slate-700'}`}
                  >
                    <Icon size={15} />
                    {roleLabels[r].label}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Integration ready badge */}
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 border border-green-200">
          <Shield size={11} className="text-green-600" />
          <span className="text-xs font-semibold text-green-700">ABDM Ready</span>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
