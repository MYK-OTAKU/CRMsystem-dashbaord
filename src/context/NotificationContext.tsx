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
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationSettings>({
    email: true,
    push: true,
    sms: false
  });

  const [activeNotifications, setActiveNotifications] = useState<Array<{
    id: string;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    timestamp: number;
  }>>([]);

  const toggleNotifications = (type: keyof NotificationSettings) => {
    setNotifications(prev => ({
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