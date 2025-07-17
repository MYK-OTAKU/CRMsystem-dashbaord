import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: Date;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
}

interface NotificationContextType {
  activeNotifications: Notification[];
  notificationSettings: NotificationSettings;
  showNotification: (type: Notification['type'], title: string, message: string) => void;
  removeNotification: (id: string) => void;
  toggleNotifications: (type: keyof NotificationSettings) => void;
  getNotificationHistory: () => Notification[];
  clearAllNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [activeNotifications, setActiveNotifications] = useState<Notification[]>([]);
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    email: true,
    push: true,
    sms: false,
  });

  // Charger les paramètres depuis localStorage au démarrage
  useEffect(() => {
    const savedSettings = localStorage.getItem('autorent_notification_settings');
    if (savedSettings) {
      setNotificationSettings(JSON.parse(savedSettings));
    }
  }, []);

  // Sauvegarder les paramètres dans localStorage
  useEffect(() => {
    localStorage.setItem('autorent_notification_settings', JSON.stringify(notificationSettings));
  }, [notificationSettings]);

  const showNotification = (type: Notification['type'], title: string, message: string) => {
    const notification: Notification = {
      id: Date.now().toString(),
      type,
      title,
      message,
      timestamp: new Date(),
    };

    setActiveNotifications(prev => [...prev, notification]);

    // Sauvegarder dans l'historique
    const history = getNotificationHistory();
    const updatedHistory = [notification, ...history].slice(0, 100); // Garder seulement les 100 dernières
    localStorage.setItem('autorent_notification_history', JSON.stringify(updatedHistory));

    // Auto-suppression après 5 secondes
    setTimeout(() => {
      removeNotification(notification.id);
    }, 5000);
  };

  const removeNotification = (id: string) => {
    setActiveNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const toggleNotifications = (type: keyof NotificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const getNotificationHistory = (): Notification[] => {
    const history = localStorage.getItem('autorent_notification_history');
    return history ? JSON.parse(history) : [];
  };

  const clearAllNotifications = () => {
    setActiveNotifications([]);
  };

  const value: NotificationContextType = {
    activeNotifications,
    notificationSettings,
    showNotification,
    removeNotification,
    toggleNotifications,
    getNotificationHistory,
    clearAllNotifications,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};