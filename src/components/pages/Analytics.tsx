import React, { useState } from 'react';
import { BarChart3, TrendingUp, TrendingDown, Calendar, DollarSign, Users, Car, Eye } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useNotification } from '../../context/NotificationContext';
import Card from '../ui/Card';
import Button from '../ui/Button';

const Analytics: React.FC = () => {
  const { t } = useLanguage();
  const { showNotification } = useNotification();
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Données simulées pour les graphiques
  const revenueData = [
    { month: 'Jan', revenue: 15420, rentals: 45 },
    { month: 'Fév', revenue: 18650, rentals: 52 },
    { month: 'Mar', revenue: 22340, rentals: 61 },
    { month: 'Avr', revenue: 19870, rentals: 48 },
    { month: 'Mai', revenue: 24580, rentals: 67 },
    { month: 'Juin', revenue: 28920, rentals: 78 }
  ];

  const vehiclePerformance = [
    { category: 'Citadine', rentals: 156, revenue: '45,680€', utilization: 78 },
    { category: 'Berline', rentals: 89, revenue: '32,450€', utilization: 65 },
    { category: 'SUV', rentals: 67, revenue: '28,920€', utilization: 82 },
    { category: 'Utilitaire', rentals: 34, revenue: '15,670€', utilization: 45 }
  ];

  const topCustomers = [
    { name: 'Sophie Laurent', rentals: 12, spent: '2,340€', lastRental: '2025-01-15' },
    { name: 'Marie Dubois', rentals: 8, spent: '1,250€', lastRental: '2025-01-14' },
    { name: 'Jean Martin', rentals: 6, spent: '980€', lastRental: '2025-01-12' },
    { name: 'Pierre Moreau', rentals: 4, spent: '650€', lastRental: '2025-01-10' }
  ];

  const kpis = [
    {
      title: 'Revenus Mensuels',
      value: '24,580€',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'bg-green-500'
    },
    {
      title: 'Taux d\'Occupation',
      value: '73%',
      change: '+5.2%',
      trend: 'up',
      icon: BarChart3,
      color: 'bg-blue-500'
    },
    {
      title: 'Nouveaux Clients',
      value: '28',
      change: '-3.1%',
      trend: 'down',
      icon: Users,
      color: 'bg-purple-500'
    },
    {
      title: 'Durée Moyenne',
      value: '4.2j',
      change: '+0.8j',
      trend: 'up',
      icon: Calendar,
      color: 'bg-yellow-500'
    }
  ];

  const handleExportReport = () => {
    showNotification('Rapport exporté avec succès', 'success');
  };

  const handleViewDetails = (type: string) => {
    showNotification(`Affichage des détails: ${type}`, 'info');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{t('analytics')}</h1>
        <div className="flex space-x-3">
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-slate-900 dark:text-white"
          >
            <option value="week">Cette semaine</option>
            <option value="month">Ce mois</option>
            <option value="quarter">Ce trimestre</option>
            <option value="year">Cette année</option>
          </select>
          <Button 
            variant="primary" 
            onClick={handleExportReport}
          >
            Exporter Rapport
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <Card key={index}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">{kpi.title}</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{kpi.value}</p>
                  <div className="flex items-center mt-1">
                    {kpi.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-400 mr-1" />
                    )}
                    <span className={`text-sm ${
                      kpi.trend === 'up' 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {kpi.change}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${kpi.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Évolution des Revenus</h3>
            <Button variant="ghost" size="sm" icon={Eye} onClick={() => handleViewDetails('revenue')}>
              Détails
            </Button>
          </div>
          <div className="space-y-4">
            {revenueData.map((data, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 text-sm text-slate-600 dark:text-slate-400">{data.month}</div>
                  <div className="flex-1">
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(data.revenue / 30000) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{data.revenue.toLocaleString()}€</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">{data.rentals} locations</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Vehicle Performance */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Performance par Catégorie</h3>
            <Button variant="ghost" size="sm" icon={Eye} onClick={() => handleViewDetails('vehicles')}>
              Détails
            </Button>
          </div>
          <div className="space-y-4">
            {vehiclePerformance.map((category, index) => (
              <div key={index} className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-slate-900 dark:text-white">{category.category}</h4>
                  <span className="text-sm text-slate-600 dark:text-slate-400">{category.utilization}% utilisé</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">{category.rentals} locations</span>
                  <span className="font-medium text-green-600 dark:text-green-400">{category.revenue}</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-1 mt-2">
                  <div 
                    className="bg-green-500 h-1 rounded-full" 
                    style={{ width: `${category.utilization}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Top Customers */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Meilleurs Clients</h3>
          <Button variant="ghost" size="sm" icon={Eye} onClick={() => handleViewDetails('customers')}>
            Voir tous
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Locations
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Total Dépensé
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Dernière Location
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {topCustomers.map((customer, index) => (
                <tr key={index} className="hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <Users className="h-4 w-4 text-white" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-slate-900 dark:text-white">{customer.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-slate-900 dark:text-white">{customer.rentals}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">{customer.spent}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-slate-600 dark:text-slate-400">{customer.lastRental}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Analytics;