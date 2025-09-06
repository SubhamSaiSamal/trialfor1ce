import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Layout/Sidebar';
import AuthModal from './components/Auth/AuthModal';
import Home from './pages/Home';
import Converter from './pages/Converter';
import Voice from './pages/Voice';
import Files from './pages/Files';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Help from './pages/Help';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { ConversionProvider } from './contexts/ConversionContext';

function AppContent() {
  const { isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(!isAuthenticated);

  useEffect(() => {
    setShowAuthModal(!isAuthenticated);
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />;
  }

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0">
        <div className="flex-1 p-6 overflow-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/converter" element={<Converter />} />
            <Route path="/voice" element={<Voice />} />
            <Route path="/files" element={<Files />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/help" element={<Help />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <SettingsProvider>
        <ConversionProvider>
          <Router>
            <AppContent />
          </Router>
        </ConversionProvider>
      </SettingsProvider>
    </AuthProvider>
  );
}

export default App;