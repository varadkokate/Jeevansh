import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';
import './index.css';

// Patient pages
import PatientDashboard from './pages/patient/PatientDashboard';
import HealthRecords from './pages/patient/HealthRecords';
import EmergencyID from './pages/patient/EmergencyID';
import PrivacyAccess from './pages/patient/PrivacyAccess';
import Medications from './pages/patient/Medications';
import AppointmentsPage from './pages/patient/AppointmentsPage';
import ReportsPage from './pages/patient/ReportsPage';

// Doctor pages
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import EmergencyAccess from './pages/doctor/EmergencyAccess';
import AIHealthAgent from './pages/doctor/AIHealthAgent';
import ReferralsPage from './pages/doctor/ReferralsPage';
import PatientsPage from './pages/doctor/PatientsPage';

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';

// Demo
import SIHDemo from './pages/SIHDemo';

const AppContent: React.FC = () => {
  const { role } = useApp();
  const [activePage, setActivePage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderPage = () => {
    if (activePage === 'sih-demo') return <SIHDemo />;

    if (role === 'patient') {
      switch (activePage) {
        case 'dashboard': return <PatientDashboard />;
        case 'records': return <HealthRecords />;
        case 'appointments': return <AppointmentsPage />;
        case 'medications': return <Medications />;
        case 'reports': return <ReportsPage />;
        case 'emergency-id': return <EmergencyID />;
        case 'privacy': return <PrivacyAccess />;
        default: return <PatientDashboard />;
      }
    }

    if (role === 'doctor') {
      switch (activePage) {
        case 'dashboard': return <DoctorDashboard setActivePage={setActivePage} />;
        case 'patients': return <PatientsPage />;
        case 'emergency': return <EmergencyAccess />;
        case 'records': return <HealthRecords />;
        case 'ai-agent': return <AIHealthAgent />;
        case 'referrals': return <ReferralsPage />;
        default: return <DoctorDashboard setActivePage={setActivePage} />;
      }
    }

    if (role === 'admin') {
      switch (activePage) {
        case 'dashboard': return <AdminDashboard />;
        case 'appointments': return <AppointmentsPage />;
        case 'doctors': return <PatientsPage />;
        case 'resources': return <AdminDashboard />;
        case 'emergency': return <EmergencyAccess />;
        case 'reports': return <ReportsPage />;
        default: return <AdminDashboard />;
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <TopBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar activePage={activePage} setActivePage={setActivePage} open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Main Content */}
      <main className="lg:ml-60 pt-14 min-h-screen">
        <div className="p-4 sm:p-6 max-w-5xl mx-auto">
          {renderPage()}
        </div>
      </main>

      {/* SIH Demo floating button */}
      {activePage !== 'sih-demo' && (
        <button
          onClick={() => setActivePage('sih-demo')}
          className="fixed bottom-6 right-6 btn-emergency shadow-2xl z-50 rounded-2xl px-5 py-3"
          style={{ boxShadow: '0 8px 32px -4px rgb(185 28 28 / 0.6)' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
          Start Emergency Demo
        </button>
      )}
      {activePage === 'sih-demo' && (
        <button
          onClick={() => setActivePage('dashboard')}
          className="fixed bottom-6 right-6 btn-outline bg-white shadow-xl z-50 rounded-2xl px-5 py-3 border-slate-300"
        >
          ← Back to App
        </button>
      )}
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
