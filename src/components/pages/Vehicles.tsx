import React from 'react';
import { Car, Plus, Edit, Trash2, Settings } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const Vehicles: React.FC = () => {
  const { t } = useLanguage();

  const vehicles = [
    {
      id: 1,
      make: 'Peugeot',
      model: '208',
      year: '2023',
      category: 'Citadine',
      status: 'available',
      mileage: '12,450 km',
      price: '35€/jour',
      image: 'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 2,
      make: 'Renault',
      model: 'Clio',
      year: '2023',
      category: 'Citadine',
      status: 'rented',
      mileage: '8,200 km',
      price: '32€/jour',
      image: 'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 3,
      make: 'BMW',
      model: 'X3',
      year: '2022',
      category: 'SUV',
      status: 'maintenance',
      mileage: '25,800 km',
      price: '85€/jour',
      image: 'https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 4,
      make: 'Mercedes',
      model: 'A-Class',
      year: '2023',
      category: 'Berline',
      status: 'available',
      mileage: '15,300 km',
      price: '65€/jour',
      image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=300'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-500';
      case 'rented':
        return 'bg-blue-500';
      case 'maintenance':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return t('available');
      case 'rented':
        return t('rented');
      case 'maintenance':
        return t('maintenance');
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">{t('vehicles')}</h1>
        <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white transition-colors">
          <Plus className="h-5 w-5" />
          <span>{t('addVehicle')}</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 p-4 bg-slate-800 rounded-lg border border-slate-700">
        <select className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white">
          <option>{t('allCategories')}</option>
          <option>Citadine</option>
          <option>Berline</option>
          <option>SUV</option>
        </select>
        <select className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white">
          <option>{t('allStatuses')}</option>
          <option>{t('available')}</option>
          <option>{t('rented')}</option>
          <option>{t('maintenance')}</option>
        </select>
      </div>

      {/* Vehicles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {vehicles.map((vehicle) => (
          <div key={vehicle.id} className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden hover:border-slate-600 transition-colors">
            <div className="relative">
              <img 
                src={vehicle.image} 
                alt={`${vehicle.make} ${vehicle.model}`}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 right-3">
                <span className={`px-3 py-1 rounded-full text-xs text-white ${getStatusColor(vehicle.status)}`}>
                  {getStatusText(vehicle.status)}
                </span>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-semibold text-white mb-1">
                {vehicle.make} {vehicle.model}
              </h3>
              <p className="text-slate-400 text-sm mb-2">{vehicle.year} • {vehicle.category}</p>
              
              <div className="flex justify-between items-center mb-3">
                <span className="text-slate-300 text-sm">{vehicle.mileage}</span>
                <span className="text-blue-400 font-semibold">{vehicle.price}</span>
              </div>
              
              <div className="flex space-x-2">
                <button className="flex-1 flex items-center justify-center space-x-1 bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg text-white text-sm transition-colors">
                  <Edit className="h-4 w-4" />
                  <span>{t('edit')}</span>
                </button>
                <button className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-slate-300 transition-colors">
                  <Settings className="h-4 w-4" />
                </button>
                <button className="p-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vehicles;