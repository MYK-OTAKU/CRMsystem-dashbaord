import React, { createContext, useContext, useState, ReactNode } from 'react';

interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
}

interface NotificationContextType {
  notifications: NotificationSettings;
  toggleNotifications: (type: keyof NotificationSettings) => void;
  showNotification: (message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
  activeNotifications: Array<{
    id: string;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    timestamp: number;
  }>;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
  getNotificationHistory: () => Array<{
    id: string;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    timestamp: number;
  }>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Clés pour localStorage
const NOTIFICATION_SETTINGS_KEY = 'autorent_notification_settings';
const NOTIFICATION_HISTORY_KEY = 'autorent_notification_history';

// Charger les paramètres depuis localStorage
const loadNotificationSettings = (): NotificationSettings => {
  try {
    const saved = localStorage.getItem(NOTIFICATION_SETTINGS_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Erreur lors du chargement des paramètres de notification:', error);
  }
  return {
    email: true,
    push: true,
    sms: false
  };
};

// Sauvegarder les paramètres dans localStorage
const saveNotificationSettings = (settings: NotificationSettings) => {
  try {
    localStorage.setItem(NOTIFICATION_SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des paramètres de notification:', error);
  }
};

// Charger l'historique depuis localStorage
const loadNotificationHistory = () => {
  try {
    const saved = localStorage.getItem(NOTIFICATION_HISTORY_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Erreur lors du chargement de l\'historique des notifications:', error);
  }
  return [];
};

// Sauvegarder l'historique dans localStorage
const saveNotificationHistory = (history: any[]) => {
  try {
    // Garder seulement les 100 dernières notifications
    const limitedHistory = history.slice(-100);
    localStorage.setItem(NOTIFICATION_HISTORY_KEY, JSON.stringify(limitedHistory));
  } catch (error) {
    console.error('Erreur lors de la sauvegarde de l\'historique des notifications:', error);
  }
};
export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationSettings>(loadNotificationSettings);

  const [activeNotifications, setActiveNotifications] = useState<Array<{
    id: string;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    timestamp: number;
  }>>([]);

  const [notificationHistory, setNotificationHistory] = useState<Array<{
    id: string;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    timestamp: number;
  }>>(loadNotificationHistory);
  const toggleNotifications = (type: keyof NotificationSettings) => {
    const newSettings = {
      ...notifications,
      [type]: !notifications[type]
    };
    setNotifications(newSettings);
    saveNotificationSettings(newSettings);
  };

  const addToHistory = (notification: {
    id: string;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    timestamp: number;
  }) => {
    const newHistory = [...notificationHistory, notification];
    setNotificationHistory(newHistory);
    saveNotificationHistory(newHistory);
  };

  const showNotification = (message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') => {
    const id = Math.random().toString(36).substr(2, 9);
    const newNotification = {
      id,
      message,
      type,
      timestamp: Date.now()
    };

    // Ajouter à l'historique
    addToHistory(newNotification);

    // Vérifier si ce type de notification est activé
    const shouldShow = notifications.email || notifications.push; // Simplification pour la démo
    
    if (shouldShow) {
      setActiveNotifications(prev => [...prev, newNotification]);

      // Auto-remove after 5 seconds
      setTimeout(() => {
        removeNotification(id);
      }, 5000);
    }
  };

  const removeNotification = (id: string) => {
    setActiveNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const clearAllNotifications = () => {
    setActiveNotifications([]);
  };

  const getNotificationHistory = () => {
    return notificationHistory.sort((a, b) => b.timestamp - a.timestamp);
  };

  return (
    <NotificationContext.Provider value={{
      notifications,
      toggleNotifications,
      showNotification,
      activeNotifications,
      removeNotification,
      clearAllNotifications,
      getNotificationHistory
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
      ...prev,
      [type]: !prev[type]
    }));
  };

  const showNotification = (message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') => {
    const id = Math.random().toString(36).substr(2, 9);
    const newNotification = {
      id,
      message,
      type,
      timestamp: Date.now()
    };

    setActiveNotifications(prev => [...prev, newNotification]);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      removeNotification(id);
    }, 5000);
  };

  const removeNotification = (id: string) => {
    setActiveNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  return (
    <NotificationContext.Provider value={{
      notifications,
      toggleNotifications,
      showNotification,
      activeNotifications,
      removeNotification
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};