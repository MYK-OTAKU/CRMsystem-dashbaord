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

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2">
      {activeNotifications.map((notification) => (
        <div
          key={notification.id}
          className={`flex items-center p-4 rounded-lg border shadow-lg min-w-80 max-w-md animate-in slide-in-from-right duration-300 ${getColors(notification.type)}`}
        >
          <div className="flex-shrink-0 mr-3">
            {getIcon(notification.type)}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">{notification.message}</p>
          </div>
          <button
            onClick={() => removeNotification(notification.id)}
            className="flex-shrink-0 ml-3 hover:opacity-70 transition-opacity"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationToast;