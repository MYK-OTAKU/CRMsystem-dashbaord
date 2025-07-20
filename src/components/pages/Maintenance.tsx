import React, { useState } from 'react';
import { Wrench, Plus, Calendar, Car, AlertTriangle, CheckCircle, Clock, User } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useNotification } from '../../context/NotificationContext';
import Card from '../ui/Card';
import Button from '../ui/Button';

const Maintenance: React.FC = () => {
  const { t } = useLanguage();
  const { showNotification } = useNotification();
  const [selectedStatus, setSelectedStatus] = useState('all');

  const maintenances = [
    {
      id: 'MAINT-001',
      vehicle: 'Peugeot 208',
      vehicleId: 'VEH-001',
      type: 'Révision générale',
      description: 'Révision des 20 000 km - Vidange, filtres, freins',
      status: 'scheduled',
      priority: 'medium',
      scheduledDate: '2025-01-20',
      completedDate: null,
      technician: 'Marc Dupont',
      cost: '250€',
      mileage: '20,150 km'
    },
    {
      id: 'MAINT-002',
      vehicle: 'BMW X3',
      vehicleId: 'VEH-003',
      type: 'Réparation',
      description: 'Remplacement des plaquettes de frein avant',
      status: 'in_progress',
      priority: 'high',
      scheduledDate: '2025-01-18',
      completedDate: null,
      technician: 'Sophie Martin',
      cost: '180€',
      mileage: '25,800 km'
    },
    {
      id: 'MAINT-003',
      vehicle: 'Renault Clio',
      vehicleId: 'VEH-002',
      type: 'Entretien',
      description: 'Changement des pneus été/hiver',
      status: 'completed',
      priority: 'low',
      scheduledDate: '2025-01-15',
      completedDate: '2025-01-15',
      technician: 'Pierre Leroy',
      cost: '320€',
      mileage: '8,200 km'
    },
    {
      id: 'MAINT-004',
      vehicle: 'Mercedes A-Class',
      vehicleId: 'VEH-004',
      type: 'Inspection',
      description: 'Contrôle technique obligatoire',
      status: 'overdue',
      priority: 'urgent',
      scheduledDate: '2025-01-10',
      completedDate: null,
      technician: 'Non assigné',
      cost: '85€',
      mileage: '15,300 km'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-500';
      case 'in_progress':
        return 'bg-yellow-500';
      case 'completed':
        return 'bg-green-500';
      case 'overdue':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'Planifié';
      case 'in_progress':
        return 'En cours';
      case 'completed':
        return 'Terminé';
      case 'overdue':
        return 'En retard';
      default:
        return status;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'text-red-600 dark:text-red-400';
      case 'high':
        return 'text-orange-600 dark:text-orange-400';
      case 'medium':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'low':
        return 'text-green-600 dark:text-green-400';
      default:
        return 'text-slate-600 dark:text-slate-400';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'Urgent';
      case 'high':
        return 'Élevée';
      case 'medium':
        return 'Moyenne';
      case 'low':
        return 'Faible';
      default:
        return priority;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Calendar className="h-4 w-4" />;
      case 'in_progress':
        return <Clock className="h-4 w-4" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'overdue':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const handleStart = (id: string) => {
    showNotification(`Maintenance ${id} démarrée`, 'info');
  };

  const handleComplete = (id: string) => {
    showNotification(`Maintenance ${id} terminée`, 'success');
  };

  const handleEdit = (id: string) => {
    showNotification(`Modification de la maintenance ${id}`, 'info');
  };

  const filteredMaintenances = selectedStatus === 'all' 
    ? maintenances 
    : maintenances.filter(maintenance => maintenance.status === selectedStatus);

  const stats = {
    scheduled: maintenances.filter(m => m.status === 'scheduled').length,
    inProgress: maintenances.filter(m => m.status === 'in_progress').length,
    overdue: maintenances.filter(m => m.status === 'overdue').length,
    completed: maintenances.filter(m => m.status === 'completed').length
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{t('maintenance')}</h1>
        <Button 
          variant="primary" 
          icon={Plus} 
          onClick={() => showNotification('Planification d\'une nouvelle maintenance', 'success')}
        >
          Nouvelle Maintenance
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Planifiées</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.scheduled}</p>
            </div>
            <div className="p-3 bg-blue-500 rounded-lg">
              <Calendar className="h-6 w-6 text-white" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">En Cours</p>
              <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.inProgress}</p>
            </div>
            <div className="p-3 bg-yellow-500 rounded-lg">
              <Clock className="h-6 w-6 text-white" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">En Retard</p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.overdue}</p>
            </div>
            <div className="p-3 bg-red-500 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Terminées</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.completed}</p>
            </div>
            <div className="p-3 bg-green-500 rounded-lg">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card padding="sm">
        <div className="flex flex-wrap gap-4">
          <select 
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-slate-900 dark:text-white"
          >
            <option value="all">Tous les statuts</option>
            <option value="scheduled">Planifiées</option>
            <option value="in_progress">En cours</option>
            <option value="completed">Terminées</option>
            <option value="overdue">En retard</option>
          </select>
          <input 
            type="date" 
            className="bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-slate-900 dark:text-white"
          />
          <input 
            type="text" 
            placeholder="Rechercher une maintenance..."
            className="bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400"
          />
        </div>
      </Card>

      {/* Maintenance Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredMaintenances.map((maintenance) => (
          <Card key={maintenance.id} hover>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-600 rounded-lg">
                  <Wrench className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{maintenance.id}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{maintenance.type}</p>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-1">
                <span className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs text-white ${getStatusColor(maintenance.status)}`}>
                  {getStatusIcon(maintenance.status)}
                  <span>{getStatusText(maintenance.status)}</span>
                </span>
                <span className={`text-xs font-medium ${getPriorityColor(maintenance.priority)}`}>
                  {getPriorityText(maintenance.priority)}
                </span>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center space-x-2 text-slate-700 dark:text-slate-300">
                <Car className="h-4 w-4" />
                <span className="text-sm">{maintenance.vehicle} ({maintenance.mileage})</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-700 dark:text-slate-300">
                <User className="h-4 w-4" />
                <span className="text-sm">{maintenance.technician}</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-700 dark:text-slate-300">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">
                  {maintenance.completedDate 
                    ? `Terminé le ${maintenance.completedDate}` 
                    : `Prévu le ${maintenance.scheduledDate}`
                  }
                </span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg mb-4">
              <p className="text-sm text-slate-700 dark:text-slate-300">{maintenance.description}</p>
            </div>

            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-green-600 dark:text-green-400">{maintenance.cost}</span>
            </div>

            <div className="flex space-x-2">
              {maintenance.status === 'scheduled' && (
                <Button variant="primary" size="sm" onClick={() => handleStart(maintenance.id)}>
                  Démarrer
                </Button>
              )}
              {maintenance.status === 'in_progress' && (
                <Button variant="success" size="sm" onClick={() => handleComplete(maintenance.id)}>
                  Terminer
                </Button>
              )}
              <Button variant="secondary" size="sm" onClick={() => handleEdit(maintenance.id)}>
                Modifier
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Maintenance;