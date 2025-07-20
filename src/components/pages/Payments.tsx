import React, { useState } from 'react';
import { CreditCard, Plus, Eye, Download, Calendar, User, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useNotification } from '../../context/NotificationContext';
import Card from '../ui/Card';
import Button from '../ui/Button';

const Payments: React.FC = () => {
  const { t } = useLanguage();
  const { showNotification } = useNotification();
  const [selectedStatus, setSelectedStatus] = useState('all');

  const payments = [
    {
      id: 'PAY-001',
      customer: 'Marie Dubois',
      contract: 'CTR-001',
      amount: '175€',
      method: 'Carte bancaire',
      status: 'completed',
      date: '2025-01-15',
      dueDate: '2025-01-15',
      type: 'payment'
    },
    {
      id: 'PAY-002',
      customer: 'Jean Martin',
      contract: 'CTR-002',
      amount: '96€',
      method: 'Virement',
      status: 'pending',
      date: null,
      dueDate: '2025-01-16',
      type: 'payment'
    },
    {
      id: 'PAY-003',
      customer: 'Sophie Laurent',
      contract: 'CTR-003',
      amount: '340€',
      method: 'Carte bancaire',
      status: 'completed',
      date: '2025-01-10',
      dueDate: '2025-01-10',
      type: 'payment'
    },
    {
      id: 'PAY-004',
      customer: 'Pierre Moreau',
      contract: 'CTR-004',
      amount: '260€',
      method: 'Espèces',
      status: 'failed',
      date: null,
      dueDate: '2025-01-18',
      type: 'payment'
    },
    {
      id: 'REF-001',
      customer: 'Marie Dubois',
      contract: 'CTR-001',
      amount: '50€',
      method: 'Virement',
      status: 'completed',
      date: '2025-01-20',
      dueDate: '2025-01-20',
      type: 'refund'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'failed':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Payé';
      case 'pending':
        return 'En attente';
      case 'failed':
        return 'Échec';
      default:
        return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'failed':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const handleView = (id: string) => {
    showNotification(`Affichage du paiement ${id}`, 'info');
  };

  const handleDownload = (id: string) => {
    showNotification(`Téléchargement du reçu ${id}`, 'success');
  };

  const handleRetry = (id: string) => {
    showNotification(`Nouvelle tentative de paiement ${id}`, 'info');
  };

  const filteredPayments = selectedStatus === 'all' 
    ? payments 
    : payments.filter(payment => payment.status === selectedStatus);

  const totalAmount = payments
    .filter(p => p.status === 'completed' && p.type === 'payment')
    .reduce((sum, p) => sum + parseFloat(p.amount.replace('€', '')), 0);

  const pendingAmount = payments
    .filter(p => p.status === 'pending')
    .reduce((sum, p) => sum + parseFloat(p.amount.replace('€', '')), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{t('payments')}</h1>
        <Button 
          variant="primary" 
          icon={Plus} 
          onClick={() => showNotification('Enregistrement d\'un nouveau paiement', 'success')}
        >
          Nouveau Paiement
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Total Encaissé</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{totalAmount}€</p>
            </div>
            <div className="p-3 bg-green-500 rounded-lg">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">En Attente</p>
              <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{pendingAmount}€</p>
            </div>
            <div className="p-3 bg-yellow-500 rounded-lg">
              <Clock className="h-6 w-6 text-white" />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Transactions</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{payments.length}</p>
            </div>
            <div className="p-3 bg-blue-500 rounded-lg">
              <CreditCard className="h-6 w-6 text-white" />
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
            <option value="completed">Payé</option>
            <option value="pending">En attente</option>
            <option value="failed">Échec</option>
          </select>
          <input 
            type="date" 
            className="bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-slate-900 dark:text-white"
          />
          <input 
            type="text" 
            placeholder="Rechercher un paiement..."
            className="bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400"
          />
        </div>
      </Card>

      {/* Payments Table */}
      <Card padding="none" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Paiement
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Montant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Méthode
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`flex-shrink-0 h-10 w-10 rounded-lg flex items-center justify-center ${
                        payment.type === 'refund' ? 'bg-orange-600' : 'bg-blue-600'
                      }`}>
                        <CreditCard className="h-5 w-5 text-white" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-slate-900 dark:text-white">{payment.id}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{payment.contract}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <User className="h-4 w-4 text-slate-600 dark:text-slate-400 mr-2" />
                      <span className="text-sm text-slate-900 dark:text-white">{payment.customer}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${
                      payment.type === 'refund' 
                        ? 'text-orange-600 dark:text-orange-400' 
                        : 'text-green-600 dark:text-green-400'
                    }`}>
                      {payment.type === 'refund' ? '-' : ''}{payment.amount}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-slate-900 dark:text-white">{payment.method}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-900 dark:text-white">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-slate-600 dark:text-slate-400 mr-1" />
                        <span>{payment.date || payment.dueDate}</span>
                      </div>
                      {!payment.date && (
                        <div className="text-slate-600 dark:text-slate-400 text-xs">
                          Échéance: {payment.dueDate}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs text-white w-fit ${getStatusColor(payment.status)}`}>
                      {getStatusIcon(payment.status)}
                      <span>{getStatusText(payment.status)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Button variant="primary" size="sm" icon={Eye} onClick={() => handleView(payment.id)} />
                      <Button variant="success" size="sm" icon={Download} onClick={() => handleDownload(payment.id)} />
                      {payment.status === 'failed' && (
                        <Button variant="warning" size="sm" onClick={() => handleRetry(payment.id)}>
                          Réessayer
                        </Button>
                      )}
                    </div>
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

export default Payments;