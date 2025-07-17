import React from 'react';
import { Car, Users, FileText, TrendingUp, Calendar, AlertCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

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
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                  <p className="text-green-400 text-sm mt-1">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Reservations */}
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h3 className="text-xl font-semibold text-white mb-4">{t('recentReservations')}</h3>
          <div className="space-y-4">
            {recentReservations.map((reservation) => (
              <div key={reservation.id} className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <Car className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{reservation.customer}</p>
                    <p className="text-sm text-slate-400">{reservation.vehicle}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-300">{reservation.date}</p>
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
        </div>

        {/* Alerts */}
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
          <h3 className="text-xl font-semibold text-white mb-4">{t('alerts')}</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-4 bg-red-500 bg-opacity-10 border border-red-500 rounded-lg">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
              <div>
                <p className="font-medium text-red-400">{t('maintenanceAlert')}</p>
                <p className="text-sm text-red-300">BMW X3 - Révision dans 2 jours</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-yellow-500 bg-opacity-10 border border-yellow-500 rounded-lg">
              <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0" />
              <div>
                <p className="font-medium text-yellow-400">{t('returnAlert')}</p>
                <p className="text-sm text-yellow-300">Retour prévu aujourd'hui - Peugeot 208</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;