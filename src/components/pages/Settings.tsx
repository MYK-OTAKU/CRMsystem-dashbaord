import React from 'react';
import { Globe, Palette, Bell, User, Shield, Database, History, Trash2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { useNotification } from '../../context/NotificationContext';
import Card from '../ui/Card';
import Button from '../ui/Button';

const Settings: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { 
    notifications, 
    toggleNotifications, 
    showNotification, 
    getNotificationHistory, 
    clearAllNotifications 
  } = useNotification();

  const handleThemeChange = (newTheme: 'dark' | 'light') => {
    setTheme(newTheme);
    showNotification(t('settingsSaved'), 'success');
  };

  const handleLanguageChange = (newLanguage: 'fr' | 'en') => {
    setLanguage(newLanguage);
    showNotification(t('settingsSaved'), 'success');
  };

  const handleProfileEdit = () => {
    showNotification(t('profileUpdated'), 'success');
  };

  const handlePasswordChange = () => {
    showNotification(t('passwordChanged'), 'success');
  };

  const handleTwoFactorEnable = () => {
    showNotification(t('twoFactorEnabled'), 'success');
  };

  const handleViewLoginHistory = () => {
    const history = getNotificationHistory();
    showNotification(`${history.length} connexions récentes trouvées`, 'info');
  };

  const handleExportData = () => {
    // Simulation d'export
    setTimeout(() => {
      showNotification(t('dataExported'), 'success');
    }, 1500);
    showNotification('Export en cours...', 'info');
  };

  const handleDeleteAccount = () => {
    if (confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')) {
      showNotification(t('accountDeleted'), 'warning');
    }
  };

  const handleClearNotifications = () => {
    clearAllNotifications();
    showNotification('Notifications effacées', 'info');
  };

  const settingSections = [
    {
      title: t('appearance'),
      icon: Palette,
      items: [
        {
          label: t('theme'),
          description: t('themeDescription'),
          component: (
            <select
              value={theme}
              onChange={(e) => handleThemeChange(e.target.value as 'dark' | 'light')}
              className="bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="dark">{t('darkTheme')}</option>
              <option value="light">{t('lightTheme')}</option>
            </select>
          )
        },
        {
          label: t('language'),
          description: t('languageDescription'),
          component: (
            <select
              value={language}
              onChange={(e) => handleLanguageChange(e.target.value as 'fr' | 'en')}
              className="bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="fr">🇫🇷 Français</option>
              <option value="en">🇬🇧 English</option>
            </select>
          )
        }
      ]
    },
    {
      title: t('notifications'),
      icon: Bell,
      items: [
        {
          label: t('emailNotifications'),
          description: t('emailNotificationsDescription'),
          component: (
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.email}
                onChange={() => { toggleNotifications('email'); showNotification('Préférences de notifications mises à jour', 'info'); }}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          )
        },
        {
          label: t('pushNotifications'),
          description: t('pushNotificationsDescription'),
          component: (
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.push}
                onChange={() => { toggleNotifications('push'); showNotification('Préférences de notifications mises à jour', 'info'); }}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          )
        },
        {
          label: t('smsNotifications'),
          description: t('smsNotificationsDescription'),
          component: (
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.sms}
                onChange={() => { toggleNotifications('sms'); showNotification('Préférences de notifications mises à jour', 'info'); }}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          )
        }
      ]
    },
    {
      title: t('account'),
      icon: User,
      items: [
        {
          label: t('profileInformation'),
          description: t('profileInformationDescription'),
          component: ( // This was the missing 'component' property
            <Button 
              variant="primary" 
              size="sm"
              onClick={handleProfileEdit}
            >
              {t('edit')}
            </Button>
          )
        }, // Added a comma here to separate the objects in the array
        {
          label: t('notificationHistory'),
          description: 'Voir l\'historique des notifications',
          component: (
            <div className="flex space-x-2">
              <Button 
                variant="ghost" 
                size="sm" 
                icon={History}
                onClick={() => {
                  const history = getNotificationHistory();
                  showNotification(`${history.length} notifications dans l'historique`, 'info');
                }}
              >
                {t('view')}
              </Button>
              <Button 
                variant="danger" 
                size="sm" 
                icon={Trash2}
                onClick={handleClearNotifications}
              >
                {t('clearNotifications')}
              </Button>
            </div>
          )
        },
        {
          label: t('changePassword'),
          description: t('changePasswordDescription'),
          component: (
            <Button 
              variant="secondary" 
              size="sm"
              onClick={handlePasswordChange}
            >
              {t('change')}
            </Button>
          )
        }
      ]
    },
    {
      title: t('security'),
      icon: Shield,
      items: [
        {
          label: t('twoFactorAuth'),
          description: t('twoFactorAuthDescription'),
          component: (
            <Button 
              variant="success" 
              size="sm"
              onClick={handleTwoFactorEnable}
            >
              {t('enable')}
            </Button>
          )
        },
        {
          label: t('loginHistory'),
          description: t('loginHistoryDescription'),
          component: (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleViewLoginHistory}
            >
              {t('view')}
            </Button>
          )
        }
      ]
    },
    {
      title: t('data'),
      icon: Database,
      items: [
        {
          label: t('exportData'),
          description: t('exportDataDescription'),
          component: (
            <Button 
              variant="secondary" 
              size="sm"
              onClick={handleExportData}
            >
              {t('export')}
            </Button>
          )
        },
        {
          label: t('deleteAccount'),
          description: t('deleteAccountDescription'),
          component: (
            <Button 
              variant="danger" 
              size="sm"
              onClick={handleDeleteAccount}
            >
              {t('delete')}
            </Button>
          )
        }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{t('settings')}</h1>
      </div>

      <div className="space-y-6">
        {settingSections.map((section, sectionIndex) => {
          const Icon = section.icon;
          return (
            <Card key={sectionIndex} padding="none" className="overflow-hidden">
              <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-600 rounded-lg">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{section.title}</h2>
                </div>
              </div>
              
              <div className="divide-y divide-slate-200 dark:divide-slate-700">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="p-6 flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-1">{item.label}</h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">{item.description}</p>
                    </div>
                    <div className="ml-6">
                      {item.component}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Settings;