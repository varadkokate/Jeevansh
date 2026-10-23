import React, { createContext, useContext, useState } from 'react';
import type { Role } from '../i18n/translations';
import { translations } from '../i18n/translations';

interface AppContextType {
  role: Role;
  setRole: (r: Role) => void;
  language: 'en' | 'hi' | 'mr';
  setLanguage: (l: 'en' | 'hi' | 'mr') => void;
  t: (key: keyof typeof translations.en) => string;
  currentPatientId: string;
  setCurrentPatientId: (id: string) => void;
  currentDoctorId: string;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<Role>('doctor');
  const [language, setLanguage] = useState<'en' | 'hi' | 'mr'>('en');
  const [currentPatientId, setCurrentPatientId] = useState('p1');
  const currentDoctorId = 'd1';

  const t = (key: keyof typeof translations.en) =>
    translations[language][key] ?? translations.en[key];

  return (
    <AppContext.Provider value={{ role, setRole, language, setLanguage, t, currentPatientId, setCurrentPatientId, currentDoctorId }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
};
