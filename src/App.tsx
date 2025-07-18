import React, { useState } from 'react';
import Login from './components/pages/Login';
import ForgotPassword from './components/pages/ForgotPassword';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import NotificationToast from './components/NotificationToast';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { NotificationProvider, useNotification } from './context/NotificationContext';
import { AuthProvider, useAuth } from './context/AuthContext';

const AppContent: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();
  const [authPage, setAuthPage] = useState<'login' | 'forgot-password'>('login');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState('dashboard');

  // Gestion des changements d'URL pour la récupération de mot de passe
  React.useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#forgot-password') {
        setAuthPage('forgot-password');
      } else {
        setAuthPage('login');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Vérifier l'URL initiale

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        {authPage === 'login' ? (
          <Login />
        ) : (
          <ForgotPassword onBack={() => setAuthPage('login')} />
        )}
        <NotificationToast />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 transition-colors">
      <Header 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen}
      />
      
      <div className="flex h-screen pt-16">
        <Sidebar 
          isOpen={sidebarOpen} 
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        
        <MainContent 
          currentPage={currentPage}
          sidebarOpen={sidebarOpen}
        />
      </div>
      
      <NotificationToast />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <NotificationProvider>
            <AppContent />
          </NotificationProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;