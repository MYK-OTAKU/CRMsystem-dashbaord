import React, { useState } from 'react';
import Login from './components/pages/Login';
import ForgotPassword from './components/pages/ForgotPassword';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import NotificationToast from './components/NotificationToast';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authPage, setAuthPage] = useState<'login' | 'forgot-password'>('login');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAuthPage('login');
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
      <ThemeProvider>
        <LanguageProvider>
          <NotificationProvider>
            {authPage === 'login' ? (
              <Login onLogin={handleLogin} />
            ) : (
              <ForgotPassword onBack={() => setAuthPage('login')} />
            )}
            <NotificationToast />
          </NotificationProvider>
        </LanguageProvider>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <LanguageProvider>
        <NotificationProvider>
          <div className="min-h-screen bg-slate-900" style={{ backgroundColor: 'rgba(30, 41, 59, 0.9)' }}>
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
        </NotificationProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;