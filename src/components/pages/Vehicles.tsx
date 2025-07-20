import React from 'react';
import { Plus } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useNotification } from '../../context/NotificationContext';
import Button from '../ui/Button';
import VehicleCard from '../ui/VehicleCard';

const Vehicles: React.FC = () => {
  const { t } = useLanguage();
  const { showNotification } = useNotification();

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

  const handleEdit = (id: number) => {
    showNotification(`Modification du véhicule #${id}`, 'info');
  };

  const handleDelete = (id: number) => {
    showNotification(`Véhicule #${id} supprimé`, 'warning');
  };

  const handleSettings = (id: number) => {
    showNotification(`Paramètres du véhicule #${id}`, 'info');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{t('vehicles')}</h1>
        <Button 
          variant="primary" 
          icon={Plus} 
          onClick={() => showNotification('Ajout d\'un nouveau véhicule', 'success')}
        >
          {t('addVehicle')}
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
        <select className="bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-slate-900 dark:text-white">
          <option>{t('allCategories')}</option>
          <option>Citadine</option>
          <option>Berline</option>
          <option>SUV</option>
        </select>
        <select className="bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-slate-900 dark:text-white">
          <option>{t('allStatuses')}</option>
          <option>{t('available')}</option>
          <option>{t('rented')}</option>
          <option>{t('maintenanceStatus')}</option>
        </select>
      </div>

      {/* Vehicles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {vehicles.map((vehicle) => (
          <VehicleCard
            key={vehicle.id}
            vehicle={vehicle}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onSettings={handleSettings}
          />
        ))}
      </div>
    </div>
  );
};

export default Vehicles;