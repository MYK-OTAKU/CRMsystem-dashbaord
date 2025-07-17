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
    logout: 'Déconnexion',
    
    // Auth
    loginSubtitle: 'Connectez-vous à votre compte',
    email: 'Email',
    password: 'Mot de passe',
    emailPlaceholder: 'votre@email.com',
    passwordPlaceholder: 'Votre mot de passe',
    rememberMe: 'Se souvenir de moi',
    forgotPassword: 'Mot de passe oublié ?',
    signIn: 'Se connecter',
    loginFooter: '© 2025 AutoRent Pro. Tous droits réservés.',
    forgotPasswordDescription: 'Entrez votre email pour recevoir un lien de réinitialisation',
    sendResetLink: 'Envoyer le lien',
    backToLogin: 'Retour à la connexion',
    emailSent: 'Email envoyé !',
    emailSentDescription: 'Vérifiez votre boîte mail pour le lien de réinitialisation',
    
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
    totalSpent: 'Total Dépensé',
    
    // Settings
    appearance: 'Apparence',
    theme: 'Thème',
    themeDescription: 'Choisissez votre thème préféré',
    darkTheme: 'Sombre',
    lightTheme: 'Clair',
    language: 'Langue',
    languageDescription: 'Sélectionnez votre langue',
    notifications: 'Notifications',
    emailNotifications: 'Notifications Email',
    emailNotificationsDescription: 'Recevoir des notifications par email',
    pushNotifications: 'Notifications Push',
    pushNotificationsDescription: 'Recevoir des notifications push',
    smsNotifications: 'Notifications SMS',
    smsNotificationsDescription: 'Recevoir des notifications par SMS',
    account: 'Compte',
    profileInformation: 'Informations du profil',
    profileInformationDescription: 'Modifier vos informations personnelles',
    changePassword: 'Changer le mot de passe',
    changePasswordDescription: 'Modifier votre mot de passe actuel',
    security: 'Sécurité',
    twoFactorAuth: 'Authentification à deux facteurs',
    twoFactorAuthDescription: 'Ajouter une couche de sécurité supplémentaire',
    loginHistory: 'Historique des connexions',
    loginHistoryDescription: 'Voir vos dernières connexions',
    data: 'Données',
    exportData: 'Exporter les données',
    exportDataDescription: 'Télécharger une copie de vos données',
    deleteAccount: 'Supprimer le compte',
    deleteAccountDescription: 'Supprimer définitivement votre compte',
    enable: 'Activer',
    view: 'Voir',
    export: 'Exporter',
    delete: 'Supprimer',
    change: 'Modifier'
  },
  en: {
    // Header
    carRentalManagement: 'Car Rental Management',
    searchPlaceholder: 'Search...',
    logout: 'Logout',
    
    // Auth
    loginSubtitle: 'Sign in to your account',
    email: 'Email',
    password: 'Password',
    emailPlaceholder: 'your@email.com',
    passwordPlaceholder: 'Your password',
    rememberMe: 'Remember me',
    forgotPassword: 'Forgot password?',
    signIn: 'Sign in',
    loginFooter: '© 2025 AutoRent Pro. All rights reserved.',
    forgotPasswordDescription: 'Enter your email to receive a reset link',
    sendResetLink: 'Send reset link',
    backToLogin: 'Back to login',
    emailSent: 'Email sent!',
    emailSentDescription: 'Check your mailbox for the reset link',
    
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
    totalSpent: 'Total Spent',
    
    // Settings
    appearance: 'Appearance',
    theme: 'Theme',
    themeDescription: 'Choose your preferred theme',
    darkTheme: 'Dark',
    lightTheme: 'Light',
    language: 'Language',
    languageDescription: 'Select your language',
    notifications: 'Notifications',
    emailNotifications: 'Email Notifications',
    emailNotificationsDescription: 'Receive email notifications',
    pushNotifications: 'Push Notifications',
    pushNotificationsDescription: 'Receive push notifications',
    smsNotifications: 'SMS Notifications',
    smsNotificationsDescription: 'Receive SMS notifications',
    account: 'Account',
    profileInformation: 'Profile Information',
    profileInformationDescription: 'Update your personal information',
    changePassword: 'Change Password',
    changePasswordDescription: 'Update your current password',
    security: 'Security',
    twoFactorAuth: 'Two-Factor Authentication',
    twoFactorAuthDescription: 'Add an extra layer of security',
    loginHistory: 'Login History',
    loginHistoryDescription: 'View your recent logins',
    data: 'Data',
    exportData: 'Export Data',
    exportDataDescription: 'Download a copy of your data',
    deleteAccount: 'Delete Account',
    deleteAccountDescription: 'Permanently delete your account',
    enable: 'Enable',
    view: 'View',
    export: 'Export',
    delete: 'Delete',
    change: 'Change'
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