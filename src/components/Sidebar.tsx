import React from 'react';
import { 
  LayoutDashboard, 
  Car, 
  Users, 
  FileText, 
  BarChart3, 
  Settings, 
  CreditCard,
  Calendar,
  MapPin,
  Wrench
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface SidebarProps {
  isOpen: boolean;
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, currentPage, setCurrentPage }) => {
  const { t } = useLanguage();

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: t('dashboard') },
    { id: 'vehicles', icon: Car, label: t('vehicles') },
    { id: 'reservations', icon: Calendar, label: t('reservations') },
    { id: 'customers', icon: Users, label: t('customers') },
    { id: 'contracts', icon: FileText, label: t('contracts') },
    { id: 'payments', icon: CreditCard, label: t('payments') },
    { id: 'maintenance', icon: Wrench, label: t('maintenance') },
    { id: 'locations', icon: MapPin, label: t('locations') },
    { id: 'analytics', icon: BarChart3, label: t('analytics') },
    { id: 'settings', icon: Settings, label: t('settings') }
  ];

  return (
    <aside className={`fixed left-0 top-16 h-full bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 transition-all duration-300 z-40 ${
      isOpen ? 'w-64' : 'w-16'
    }`}>
      <div className="flex flex-col h-full">
        <nav className="flex-1 py-6">
          <div className="px-3 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`w-full flex items-center px-3 py-3 rounded-lg transition-colors ${
                    currentPage === item.id
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {isOpen && (
                    <span className="ml-3 font-medium">{item.label}</span>
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-700">
          {isOpen && (
            <div className="text-center">
              <p className="text-xs text-slate-600 dark:text-slate-400">{t('version')} 1.0.0</p>
              <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">AutoRent Pro</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;