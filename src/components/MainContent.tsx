import React from 'react';
import Dashboard from './pages/Dashboard';
import Vehicles from './pages/Vehicles';
import Reservations from './pages/Reservations';
import Customers from './pages/Customers';
import Contracts from './pages/Contracts';
import Payments from './pages/Payments';
import Maintenance from './pages/Maintenance';
import Locations from './pages/Locations';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import { useLanguage } from '../context/LanguageContext';

interface MainContentProps {
  currentPage: string;
  sidebarOpen: boolean;
}

const MainContent: React.FC<MainContentProps> = ({ currentPage, sidebarOpen }) => {
  const { t } = useLanguage();

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'vehicles':
        return <Vehicles />;
      case 'reservations':
        return <Reservations />;
      case 'customers':
        return <Customers />;
      case 'contracts':
        return <Contracts />;
      case 'payments':
        return <Payments />;
      case 'maintenance':
        return <Maintenance />;
      case 'locations':
        return <Locations />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <main className={`flex-1 transition-all duration-300 ${
      sidebarOpen ? 'ml-64' : 'ml-16'
    }`}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-6 transition-colors">
        {renderPage()}
      </div>
    </main>
  );
};

export default MainContent;