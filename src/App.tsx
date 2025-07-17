import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState('dashboard');

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-slate-900" style={{ backgroundColor: 'rgba(30, 41, 59, 0.9)' }}>
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
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;