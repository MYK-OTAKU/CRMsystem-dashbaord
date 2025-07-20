import React, { useState } from 'react';
import { FileText, Plus, Eye, Edit, Trash2, Download, Calendar, User, Car } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useNotification } from '../../context/NotificationContext';
import Card from '../ui/Card';
import Button from '../ui/Button';

const Contracts: React.FC = () => {
  const { t } = useLanguage();
  const { showNotification } = useNotification();
  const [selectedStatus, setSelectedStatus] = useState('all');

  const contracts = [
    {
      id: 'CTR-001',
      customer: 'Marie Dubois',
      vehicle: 'Peugeot 208',
      startDate: '2025-01-15',
      endDate: '2025-01-20',
      status: 'active',
      totalAmount: '175€',
      signedDate: '2025-01-14',
      type: 'location'
    },
    {
      id: 'CTR-002',
      customer: 'Jean Martin',
      vehicle: 'Renault Clio',
      startDate: '2025-01-16',
      endDate: '2025-01-18',
      status: 'signed',
      totalAmount: '96€',
      signedDate: '2025-01-15',
      type: 'location'
    },
    {
      id: 'CTR-003',
      customer: 'Sophie Laurent',
      vehicle: 'BMW X3',
      startDate: '2025-01-10',
      endDate: '2025-01-14',
      status: 'completed',
      totalAmount: '340€',
      signedDate: '2025-01-09',
      type: 'location'
    },
    {
      id: 'CTR-004',
      customer: 'Pierre Moreau',
      vehicle: 'Mercedes A-Class',
      startDate: '2025-01-18',
      endDate: '2025-01-22',
      status: 'draft',
      totalAmount: '260€',
      signedDate: null,
      type: 'location'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'signed':
        return 'bg-blue-500';
      case 'completed':
        return 'bg-purple-500';
      case 'draft':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Actif';
      case 'signed':
        return 'Signé';
      case 'completed':
        return 'Terminé';
      case 'draft':
        return 'Brouillon';
      default:
        return status;
    }
  };

  const handleView = (id: string) => {
    showNotification(`Affichage du contrat ${id}`, 'info');
  };

  const handleEdit = (id: string) => {
    showNotification(`Modification du contrat ${id}`, 'info');
  };

  const handleDelete = (id: string) => {
    showNotification(`Contrat ${id} supprimé`, 'warning');
  };

  const handleDownload = (id: string) => {
    showNotification(`Téléchargement du contrat ${id}`, 'success');
  };

  const filteredContracts = selectedStatus === 'all' 
    ? contracts 
    : contracts.filter(contract => contract.status === selectedStatus);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{t('contracts')}</h1>
        <Button 
          variant="primary" 
          icon={Plus} 
          onClick={() => showNotification('Création d\'un nouveau contrat', 'success')}
        >
          Nouveau Contrat
        </Button>
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
            <option value="draft">Brouillon</option>
            <option value="signed">Signé</option>
            <option value="active">Actif</option>
            <option value="completed">Terminé</option>
          </select>
          <input 
            type="date" 
            className="bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-slate-900 dark:text-white"
          />
          <input 
            type="text" 
            placeholder="Rechercher un contrat..."
            className="bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400"
          />
        </div>
      </Card>

      {/* Contracts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredContracts.map((contract) => (
          <Card key={contract.id} hover>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{contract.id}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {contract.signedDate ? `Signé le ${contract.signedDate}` : 'Non signé'}
                  </p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs text-white ${getStatusColor(contract.status)}`}>
                {getStatusText(contract.status)}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center space-x-2 text-slate-700 dark:text-slate-300">
                <User className="h-4 w-4" />
                <span className="text-sm">{contract.customer}</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-700 dark:text-slate-300">
                <Car className="h-4 w-4" />
                <span className="text-sm">{contract.vehicle}</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-700 dark:text-slate-300">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">{contract.startDate} - {contract.endDate}</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-4 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
              <div className="text-center">
                <p className="text-sm text-slate-600 dark:text-slate-400">Montant Total</p>
                <p className="text-lg font-semibold text-green-600 dark:text-green-400">{contract.totalAmount}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-slate-600 dark:text-slate-400">Type</p>
                <p className="text-sm font-medium text-slate-900 dark:text-white">Location</p>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button variant="primary" size="sm" icon={Eye} onClick={() => handleView(contract.id)}>
                Voir
              </Button>
              <Button variant="secondary" size="sm" icon={Edit} onClick={() => handleEdit(contract.id)}>
                Modifier
              </Button>
              <Button variant="success" size="sm" icon={Download} onClick={() => handleDownload(contract.id)}>
                PDF
              </Button>
              <Button variant="danger" size="sm" icon={Trash2} onClick={() => handleDelete(contract.id)} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Contracts;