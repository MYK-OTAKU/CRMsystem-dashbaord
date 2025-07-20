import React from 'react';
import { Car, Settings, Edit, Trash2 } from 'lucide-react';
import Card from './Card';
import Button from './Button';
import { useLanguage } from '../../context/LanguageContext';

interface Vehicle {
  id: number;
  make: string;
  model: string;
  year: string;
  category: string;
  status: 'available' | 'rented' | 'maintenance';
  mileage: string;
  price: string;
  image: string;
}

interface VehicleCardProps {
  vehicle: Vehicle;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  onSettings?: (id: number) => void;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ 
  vehicle, 
  onEdit, 
  onDelete, 
  onSettings 
}) => {
  const { t } = useLanguage();

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
        return t('maintenanceStatus');
      default:
        return status;
    }
  };

  return (
    <Card hover padding="none" className="overflow-hidden">
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
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
          {vehicle.make} {vehicle.model}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">
          {vehicle.year} • {vehicle.category}
        </p>
        
        <div className="flex justify-between items-center mb-3">
          <span className="text-slate-700 dark:text-slate-300 text-sm">{vehicle.mileage}</span>
          <span className="text-blue-600 dark:text-blue-400 font-semibold">{vehicle.price}</span>
        </div>
        
        <div className="flex space-x-2">
          <Button 
            variant="primary" 
            size="sm" 
            icon={Edit} 
            onClick={() => onEdit?.(vehicle.id)}
            className="flex-1"
          >
            {t('edit')}
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            icon={Settings} 
            onClick={() => onSettings?.(vehicle.id)}
          />
          <Button 
            variant="danger" 
            size="sm" 
            icon={Trash2} 
            onClick={() => onDelete?.(vehicle.id)}
          />
        </div>
      </div>
    </Card>
  );
};

export default VehicleCard;