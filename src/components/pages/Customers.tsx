import React from 'react';
import { User, Mail, Phone, MapPin, Plus, Edit, Trash2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const Customers: React.FC = () => {
  const { t } = useLanguage();

  const customers = [
    {
      id: 1,
      name: 'Marie Dubois',
      email: 'marie.dubois@email.com',
      phone: '06 12 34 56 78',
      address: '123 Rue de la Paix, Paris',
      totalReservations: 8,
      totalSpent: '1,250€',
      status: 'active',
      joinDate: '2024-03-15'
    },
    {
      id: 2,
      name: 'Jean Martin',
      email: 'jean.martin@email.com',
      phone: '06 98 76 54 32',
      address: '456 Avenue des Champs, Lyon',
      totalReservations: 3,
      totalSpent: '480€',
      status: 'active',
      joinDate: '2024-06-20'
    },
    {
      id: 3,
      name: 'Sophie Laurent',
      email: 'sophie.laurent@email.com',
      phone: '06 55 44 33 22',
      address: '789 Boulevard Saint-Germain, Marseille',
      totalReservations: 12,
      totalSpent: '2,340€',
      status: 'vip',
      joinDate: '2024-01-10'
    },
    {
      id: 4,
      name: 'Pierre Moreau',
      email: 'pierre.moreau@email.com',
      phone: '06 11 22 33 44',
      address: '321 Rue de Rivoli, Toulouse',
      totalReservations: 1,
      totalSpent: '85€',
      status: 'new',
      joinDate: '2024-12-01'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'vip':
        return 'bg-purple-500';
      case 'new':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return t('active');
      case 'vip':
        return 'VIP';
      case 'new':
        return t('new');
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">{t('customers')}</h1>
        <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white transition-colors">
          <Plus className="h-5 w-5" />
          <span>{t('addCustomer')}</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 p-4 bg-slate-800 rounded-lg border border-slate-700">
        <select className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white">
          <option>{t('allStatuses')}</option>
          <option>{t('active')}</option>
          <option>VIP</option>
          <option>{t('new')}</option>
        </select>
        <input 
          type="text" 
          placeholder={t('searchCustomer')}
          className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400"
        />
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {customers.map((customer) => (
          <div key={customer.id} className="bg-slate-800 rounded-xl border border-slate-700 p-6 hover:border-slate-600 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{customer.name}</h3>
                  <p className="text-sm text-slate-400">{t('memberSince')} {customer.joinDate}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs text-white ${getStatusColor(customer.status)}`}>
                {getStatusText(customer.status)}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center space-x-2 text-slate-300">
                <Mail className="h-4 w-4" />
                <span className="text-sm">{customer.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-300">
                <Phone className="h-4 w-4" />
                <span className="text-sm">{customer.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-300">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{customer.address}</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-4 p-3 bg-slate-700 rounded-lg">
              <div className="text-center">
                <p className="text-sm text-slate-400">{t('reservations')}</p>
                <p className="text-lg font-semibold text-white">{customer.totalReservations}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-slate-400">{t('totalSpent')}</p>
                <p className="text-lg font-semibold text-green-400">{customer.totalSpent}</p>
              </div>
            </div>

            <div className="flex space-x-2">
              <button className="flex-1 flex items-center justify-center space-x-1 bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg text-white text-sm transition-colors">
                <Edit className="h-4 w-4" />
                <span>{t('edit')}</span>
              </button>
              <button className="p-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Customers;