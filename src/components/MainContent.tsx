import React from 'react';
import Dashboard from './pages/Dashboard';
import Vehicles from './pages/Vehicles';
import Reservations from './pages/Reservations';
import Customers from './pages/Customers';
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
        return <div className="p-6"><h2 className="text-2xl font-bold text-white">{t('contracts')}</h2></div>;
      case 'payments':
        return <div className="p-6"><h2 className="text-2xl font-bold text-white">{t('payments')}</h2></div>;
      case 'maintenance':
        return <div className="p-6"><h2 className="text-2xl font-bold text-white">{t('maintenance')}</h2></div>;
      case 'locations':
        return <div className="p-6"><h2 className="text-2xl font-bold text-white">{t('locations')}</h2></div>;
      case 'analytics':
        return <div className="p-6"><h2 className="text-2xl font-bold text-white">{t('analytics')}</h2></div>;
      case 'settings':
        return <div className="p-6"><h2 className="text-2xl font-bold text-white">{t('settings')}</h2></div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <main className={`flex-1 transition-all duration-300 ${
      sidebarOpen ? 'ml-64' : 'ml-16'
    }`}>
      <div className="min-h-screen bg-slate-900 p-6">
        {renderPage()}
      </div>
    </main>
  );
};

export default MainContent;