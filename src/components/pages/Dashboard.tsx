import React from 'react';
import { Car, Users, FileText, TrendingUp, Calendar, AlertCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import StatCard from '../ui/StatCard';
import Card from '../ui/Card';

const Dashboard: React.FC = () => {
  const { t } = useLanguage();

  const stats = [
    {
      title: t('totalVehicles'),
      value: '48',
      change: '+2',
      icon: Car,
      color: 'bg-blue-500'
    },
    {
      title: t('activeReservations'),
      value: '32',
      change: '+5',
      icon: Calendar,
      color: 'bg-green-500'
    },
    {
      title: t('totalCustomers'),
      value: '156',
      change: '+12',
      icon: Users,
      color: 'bg-purple-500'
    },
    {
      title: t('monthlyRevenue'),
      value: '€24,580',
      change: '+8%',
      icon: TrendingUp,
      color: 'bg-yellow-500'
    }
  ];

  const recentReservations = [
    { id: 1, customer: 'Marie Dubois', vehicle: 'Peugeot 208', date: '2025-01-15', status: 'active' },
    { id: 2, customer: 'Jean Martin', vehicle: 'Renault Clio', date: '2025-01-16', status: 'pending' },
    { id: 3, customer: 'Sophie Laurent', vehicle: 'BMW X3', date: '2025-01-17', status: 'completed' },
    { id: 4, customer: 'Pierre Moreau', vehicle: 'Mercedes A-Class', date: '2025-01-18', status: 'active' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">{t('dashboard')}</h1>
        <p className="text-slate-400">{new Date().toLocaleDateString()}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          return (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              icon={stat.icon}
              color={stat.color}
              trend="up"
            />
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Reservations */}
        <Card>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">{t('recentReservations')}</h3>
          <div className="space-y-4">
            {recentReservations.map((reservation) => (
              <div key={reservation.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <Car className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">{reservation.customer}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{reservation.vehicle}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-700 dark:text-slate-300">{reservation.date}</p>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    reservation.status === 'active' ? 'bg-green-500 text-white' :
                    reservation.status === 'pending' ? 'bg-yellow-500 text-black' :
                    'bg-slate-500 text-white'
                  }`}>
                    {reservation.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Alerts */}
        <Card>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">{t('alerts')}</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-4 bg-red-50 dark:bg-red-500 dark:bg-opacity-10 border border-red-200 dark:border-red-500 rounded-lg">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
              <div>
                <p className="font-medium text-red-700 dark:text-red-400">{t('maintenanceAlert')}</p>
                <p className="text-sm text-red-600 dark:text-red-300">BMW X3 - Révision dans 2 jours</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-yellow-50 dark:bg-yellow-500 dark:bg-opacity-10 border border-yellow-200 dark:border-yellow-500 rounded-lg">
              <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0" />
              <div>
                <p className="font-medium text-yellow-700 dark:text-yellow-400">{t('returnAlert')}</p>
                <p className="text-sm text-yellow-600 dark:text-yellow-300">Retour prévu aujourd'hui - Peugeot 208</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;