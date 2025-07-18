import React from 'react';
import { Calendar, User, Car, Clock, Eye, Edit, Trash2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const Reservations: React.FC = () => {
  const { t } = useLanguage();

  const reservations = [
    {
      id: 'RES-001',
      customer: 'Marie Dubois',
      vehicle: 'Peugeot 208',
      startDate: '2025-01-15',
      endDate: '2025-01-20',
      status: 'active',
      totalAmount: '175€',
      pickupTime: '09:00'
    },
    {
      id: 'RES-002',
      customer: 'Jean Martin',
      vehicle: 'Renault Clio',
      startDate: '2025-01-16',
      endDate: '2025-01-18',
      status: 'pending',
      totalAmount: '96€',
      pickupTime: '14:00'
    },
    {
      id: 'RES-003',
      customer: 'Sophie Laurent',
      vehicle: 'BMW X3',
      startDate: '2025-01-10',
      endDate: '2025-01-14',
      status: 'completed',
      totalAmount: '340€',
      pickupTime: '10:30'
    },
    {
      id: 'RES-004',
      customer: 'Pierre Moreau',
      vehicle: 'Mercedes A-Class',
      startDate: '2025-01-18',
      endDate: '2025-01-22',
      status: 'confirmed',
      totalAmount: '260€',
      pickupTime: '11:00'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'completed':
        return 'bg-blue-500';
      case 'confirmed':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return t('active');
      case 'pending':
        return t('pending');
      case 'completed':
        return t('completed');
      case 'confirmed':
        return t('confirmed');
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{t('reservations')}</h1>
        <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white transition-colors">
          <Calendar className="h-5 w-5" />
          <span>{t('newReservation')}</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
        <select className="bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-slate-900 dark:text-white">
          <option>{t('allStatuses')}</option>
          <option>{t('active')}</option>
          <option>{t('pending')}</option>
          <option>{t('completed')}</option>
          <option>{t('confirmed')}</option>
        </select>
        <input 
          type="date" 
          className="bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-slate-900 dark:text-white"
        />
        <input 
          type="text" 
          placeholder={t('searchCustomer')}
          className="bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400"
        />
      </div>

      {/* Reservations Table */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  {t('reservation')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  {t('customer')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  {t('vehicle')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  {t('period')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  {t('status')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  {t('amount')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  {t('actions')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {reservations.map((reservation) => (
                <tr key={reservation.id} className="hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-white" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-slate-900 dark:text-white">{reservation.id}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{reservation.pickupTime}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 bg-slate-300 dark:bg-slate-600 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-slate-900 dark:text-white">{reservation.customer}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Car className="h-4 w-4 text-slate-600 dark:text-slate-400 mr-2" />
                      <span className="text-sm text-slate-900 dark:text-white">{reservation.vehicle}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-900 dark:text-white">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-slate-600 dark:text-slate-400 mr-1" />
                        <span>{reservation.startDate}</span>
                      </div>
                      <div className="text-slate-600 dark:text-slate-400 text-xs">
                        au {reservation.endDate}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs text-white ${getStatusColor(reservation.status)}`}>
                      {getStatusText(reservation.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-slate-900 dark:text-white">{reservation.totalAmount}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 bg-slate-600 hover:bg-slate-500 rounded-lg text-white transition-colors">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reservations;