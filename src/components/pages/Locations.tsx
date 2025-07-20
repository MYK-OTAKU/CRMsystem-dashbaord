import React, { useState } from 'react';
import { MapPin, Plus, Edit, Trash2, Phone, Mail, Users, Car } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useNotification } from '../../context/NotificationContext';
import Card from '../ui/Card';
import Button from '../ui/Button';

const Locations: React.FC = () => {
  const { t } = useLanguage();
  const { showNotification } = useNotification();

  const locations = [
    {
      id: 'LOC-001',
      name: 'Agence Paris Centre',
      address: '123 Rue de Rivoli, 75001 Paris',
      phone: '01 42 60 30 30',
      email: 'paris.centre@autorent.com',
      manager: 'Marie Dubois',
      vehicles: 15,
      activeRentals: 8,
      status: 'active',
      openingHours: '8h00 - 20h00',
      coordinates: { lat: 48.8566, lng: 2.3522 }
    },
    {
      id: 'LOC-002',
      name: 'Agence Lyon Part-Dieu',
      address: '456 Rue de la République, 69003 Lyon',
      phone: '04 78 95 20 20',
      email: 'lyon.partdieu@autorent.com',
      manager: 'Jean Martin',
      vehicles: 12,
      activeRentals: 5,
      status: 'active',
      openingHours: '8h30 - 19h30',
      coordinates: { lat: 45.7640, lng: 4.8357 }
    },
    {
      id: 'LOC-003',
      name: 'Agence Marseille Vieux-Port',
      address: '789 Quai du Port, 13002 Marseille',
      phone: '04 91 54 10 10',
      email: 'marseille.vieuxport@autorent.com',
      manager: 'Sophie Laurent',
      vehicles: 18,
      activeRentals: 12,
      status: 'active',
      openingHours: '8h00 - 19h00',
      coordinates: { lat: 43.2965, lng: 5.3698 }
    },
    {
      id: 'LOC-004',
      name: 'Agence Toulouse Capitole',
      address: '321 Place du Capitole, 31000 Toulouse',
      phone: '05 61 23 45 45',
      email: 'toulouse.capitole@autorent.com',
      manager: 'Pierre Moreau',
      vehicles: 10,
      activeRentals: 3,
      status: 'maintenance',
      openingHours: '9h00 - 18h00',
      coordinates: { lat: 43.6047, lng: 1.4442 }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'maintenance':
        return 'bg-yellow-500';
      case 'closed':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Ouverte';
      case 'maintenance':
        return 'Maintenance';
      case 'closed':
        return 'Fermée';
      default:
        return status;
    }
  };

  const handleEdit = (id: string) => {
    showNotification(`Modification de l'agence ${id}`, 'info');
  };

  const handleDelete = (id: string) => {
    showNotification(`Agence ${id} supprimée`, 'warning');
  };

  const handleViewMap = (location: any) => {
    showNotification(`Ouverture de la carte pour ${location.name}`, 'info');
  };

  const totalVehicles = locations.reduce((sum, loc) => sum + loc.vehicles, 0);
  const totalActiveRentals = locations.reduce((sum, loc) => sum + loc.activeRentals, 0);
  const activeLocations = locations.filter(loc => loc.status === 'active').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{t('locations')}</h1>
        <Button 
          variant="primary" 
          icon={Plus} 
          onClick={() => showNotification('Création d\'une nouvelle agence', 'success')}
        >
          Nouvelle Agence
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Agences Actives</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{activeLocations}</p>
            </div>
            <div className="p-3 bg-green-500 rounded-lg">
              <MapPin className="h-6 w-6 text-white" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Total Agences</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{locations.length}</p>
            </div>
            <div className="p-3 bg-blue-500 rounded-lg">
              <MapPin className="h-6 w-6 text-white" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Véhicules Total</p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{totalVehicles}</p>
            </div>
            <div className="p-3 bg-purple-500 rounded-lg">
              <Car className="h-6 w-6 text-white" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Locations Actives</p>
              <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{totalActiveRentals}</p>
            </div>
            <div className="p-3 bg-yellow-500 rounded-lg">
              <Users className="h-6 w-6 text-white" />
            </div>
          </div>
        </Card>
      </div>

      {/* Locations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {locations.map((location) => (
          <Card key={location.id} hover>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{location.name}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{location.id}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs text-white ${getStatusColor(location.status)}`}>
                {getStatusText(location.status)}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-start space-x-2 text-slate-700 dark:text-slate-300">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{location.address}</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-700 dark:text-slate-300">
                <Phone className="h-4 w-4" />
                <span className="text-sm">{location.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-700 dark:text-slate-300">
                <Mail className="h-4 w-4" />
                <span className="text-sm">{location.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-700 dark:text-slate-300">
                <Users className="h-4 w-4" />
                <span className="text-sm">Responsable: {location.manager}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg mb-4">
              <div className="text-center">
                <p className="text-sm text-slate-600 dark:text-slate-400">Véhicules</p>
                <p className="text-lg font-semibold text-slate-900 dark:text-white">{location.vehicles}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-slate-600 dark:text-slate-400">En Location</p>
                <p className="text-lg font-semibold text-green-600 dark:text-green-400">{location.activeRentals}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-slate-600 dark:text-slate-400">Disponibles</p>
                <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">{location.vehicles - location.activeRentals}</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-slate-600 dark:text-slate-400">Horaires d'ouverture</p>
              <p className="text-sm font-medium text-slate-900 dark:text-white">{location.openingHours}</p>
            </div>

            <div className="flex space-x-2">
              <Button 
                variant="primary" 
                size="sm" 
                onClick={() => handleViewMap(location)}
              >
                Voir sur la carte
              </Button>
              <Button 
                variant="secondary" 
                size="sm" 
                icon={Edit} 
                onClick={() => handleEdit(location.id)}
              >
                Modifier
              </Button>
              <Button 
                variant="danger" 
                size="sm" 
                icon={Trash2} 
                onClick={() => handleDelete(location.id)}
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Locations;