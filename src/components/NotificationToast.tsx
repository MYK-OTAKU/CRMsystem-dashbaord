import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';

const NotificationToast: React.FC = () => {
  const { activeNotifications, removeNotification } = useNotification();

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5" />;
      case 'error':
        return <AlertCircle className="h-5 w-5" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5" />;
      default:
        return <Info className="h-5 w-5" />;
    }
  };

  const getColors = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-600 border-green-500 text-green-100';
      case 'error':
        return 'bg-red-600 border-red-500 text-red-100';
      case 'warning':
        return 'bg-yellow-600 border-yellow-500 text-yellow-100';
      default:
        return 'bg-blue-600 border-blue-500 text-blue-100';
    }
  };

  // Animation d'entrée pour les nouvelles notifications
  useEffect(() => {
    activeNotifications.forEach((notification) => {
      const element = document.getElementById(`notification-${notification.id}`);
      if (element) {
        element.style.transform = 'translateX(100%)';
        element.style.opacity = '0';
        
        setTimeout(() => {
          element.style.transform = 'translateX(0)';
          element.style.opacity = '1';
        }, 50);
      }
    });
  }, [activeNotifications]);
  return (
    <div className="fixed top-20 right-4 z-50 space-y-2">
      {activeNotifications.map((notification) => (
        <div
          id={`notification-${notification.id}`}
          key={notification.id}
          className={`flex items-center p-4 rounded-lg border shadow-lg min-w-80 max-w-md transition-all duration-300 transform ${getColors(notification.type)}`}
          style={{ 
            animation: 'slideInFromRight 0.3s ease-out',
          }}
        >
          <div className="flex-shrink-0 mr-3">
            {getIcon(notification.type)}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">{notification.message}</p>
            <p className="text-xs opacity-75 mt-1">
              {new Date(notification.timestamp).toLocaleTimeString()}
            </p>
          </div>
          <button
            onClick={() => removeNotification(notification.id)}
            className="flex-shrink-0 ml-3 hover:opacity-70 transition-opacity p-1 rounded-full hover:bg-black hover:bg-opacity-20"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
      
      <style jsx>{`
        @keyframes slideInFromRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default NotificationToast;