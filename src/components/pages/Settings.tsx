import React from 'react';
import { Globe, Palette, Bell, User, Shield, Database } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { useNotification } from '../../context/NotificationContext';

const Settings: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { notifications, toggleNotifications } = useNotification();

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
              onChange={(e) => setTheme(e.target.value as 'dark' | 'light')}
              className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              onChange={(e) => setLanguage(e.target.value as 'fr' | 'en')}
              className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                onChange={() => toggleNotifications('email')}
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
                onChange={() => toggleNotifications('push')}
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
                onChange={() => toggleNotifications('sms')}
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
          component: (
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
              {t('edit')}
            </button>
          )
        },
        {
          label: t('changePassword'),
          description: t('changePasswordDescription'),
          component: (
            <button className="bg-slate-600 hover:bg-slate-500 text-white px-4 py-2 rounded-lg transition-colors">
              {t('change')}
            </button>
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
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
              {t('enable')}
            </button>
          )
        },
        {
          label: t('loginHistory'),
          description: t('loginHistoryDescription'),
          component: (
            <button className="bg-slate-600 hover:bg-slate-500 text-white px-4 py-2 rounded-lg transition-colors">
              {t('view')}
            </button>
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
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
              {t('export')}
            </button>
          )
        },
        {
          label: t('deleteAccount'),
          description: t('deleteAccountDescription'),
          component: (
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors">
              {t('delete')}
            </button>
          )
        }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">{t('settings')}</h1>
      </div>

      <div className="space-y-6">
        {settingSections.map((section, sectionIndex) => {
          const Icon = section.icon;
          return (
            <div key={sectionIndex} className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
              <div className="p-6 border-b border-slate-700">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-600 rounded-lg">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-white">{section.title}</h2>
                </div>
              </div>
              
              <div className="divide-y divide-slate-700">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="p-6 flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-white mb-1">{item.label}</h3>
                      <p className="text-slate-400 text-sm">{item.description}</p>
                    </div>
                    <div className="ml-6">
                      {item.component}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Settings;