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

const AppContent: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authPage, setAuthPage] = useState<'login' | 'forgot-password'>('login');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const { showNotification } = useNotification();

  const handleLogin = () => {
    setIsAuthenticated(true);
    showNotification('Connexion réussie ! Bienvenue dans AutoRent Pro.', 'success');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAuthPage('login');
    showNotification('Vous avez été déconnecté avec succès.', 'info');
  };

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

  if (!isAuthenticated) {
    return (
      <>
        {authPage === 'login' ? (
          <Login onLogin={handleLogin} />
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
        onLogout={handleLogout}
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
        <NotificationProvider>
          <AppContent />
        </NotificationProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;