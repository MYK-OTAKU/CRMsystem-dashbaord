import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: 'fr' | 'en';
  setLanguage: (lang: 'fr' | 'en') => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  fr: {
    // Header
    carRentalManagement: 'Gestion de Location de Voiture',
    searchPlaceholder: 'Rechercher...',
    
    // Navigation
    dashboard: 'Tableau de Bord',
    vehicles: 'Véhicules',
    reservations: 'Réservations',
    customers: 'Clients',
    contracts: 'Contrats',
    payments: 'Paiements',
    maintenance: 'Maintenance',
    locations: 'Emplacements',
    analytics: 'Analytiques',
    settings: 'Paramètres',
    version: 'Version',
    
    // Dashboard
    totalVehicles: 'Véhicules Totaux',
    activeReservations: 'Réservations Actives',
    totalCustomers: 'Clients Totaux',
    monthlyRevenue: 'Revenus Mensuels',
    recentReservations: 'Réservations Récentes',
    alerts: 'Alertes',
    maintenanceAlert: 'Alerte Maintenance',
    returnAlert: 'Alerte Retour',
    
    // Vehicles
    addVehicle: 'Ajouter Véhicule',
    allCategories: 'Toutes Catégories',
    allStatuses: 'Tous Statuts',
    available: 'Disponible',
    rented: 'Loué',
    maintenance: 'Maintenance',
    edit: 'Modifier',
    
    // Reservations
    newReservation: 'Nouvelle Réservation',
    active: 'Actif',
    pending: 'En Attente',
    completed: 'Terminé',
    confirmed: 'Confirmé',
    searchCustomer: 'Rechercher Client',
    reservation: 'Réservation',
    customer: 'Client',
    vehicle: 'Véhicule',
    period: 'Période',
    status: 'Statut',
    amount: 'Montant',
    actions: 'Actions',
    
    // Customers
    addCustomer: 'Ajouter Client',
    new: 'Nouveau',
    memberSince: 'Membre depuis',
    totalSpent: 'Total Dépensé'
  },
  en: {
    // Header
    carRentalManagement: 'Car Rental Management',
    searchPlaceholder: 'Search...',
    
    // Navigation
    dashboard: 'Dashboard',
    vehicles: 'Vehicles',
    reservations: 'Reservations',
    customers: 'Customers',
    contracts: 'Contracts',
    payments: 'Payments',
    maintenance: 'Maintenance',
    locations: 'Locations',
    analytics: 'Analytics',
    settings: 'Settings',
    version: 'Version',
    
    // Dashboard
    totalVehicles: 'Total Vehicles',
    activeReservations: 'Active Reservations',
    totalCustomers: 'Total Customers',
    monthlyRevenue: 'Monthly Revenue',
    recentReservations: 'Recent Reservations',
    alerts: 'Alerts',
    maintenanceAlert: 'Maintenance Alert',
    returnAlert: 'Return Alert',
    
    // Vehicles
    addVehicle: 'Add Vehicle',
    allCategories: 'All Categories',
    allStatuses: 'All Statuses',
    available: 'Available',
    rented: 'Rented',
    maintenance: 'Maintenance',
    edit: 'Edit',
    
    // Reservations
    newReservation: 'New Reservation',
    active: 'Active',
    pending: 'Pending',
    completed: 'Completed',
    confirmed: 'Confirmed',
    searchCustomer: 'Search Customer',
    reservation: 'Reservation',
    customer: 'Customer',
    vehicle: 'Vehicle',
    period: 'Period',
    status: 'Status',
    amount: 'Amount',
    actions: 'Actions',
    
    // Customers
    addCustomer: 'Add Customer',
    new: 'New',
    memberSince: 'Member since',
    totalSpent: 'Total Spent'
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['fr']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};