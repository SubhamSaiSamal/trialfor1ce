import React, { createContext, useContext, useState, useEffect } from 'react';

interface Settings {
  theme: 'light' | 'dark';
  language: string;
  brailleGrade: 1 | 2;
  fontSize: number;
  voiceEnabled: boolean;
  autoSave: boolean;
  realTimePreview: boolean;
}

interface SettingsContextType {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
  resetSettings: () => void;
}

const defaultSettings: Settings = {
  theme: 'dark',
  language: 'English',
  brailleGrade: 2,
  fontSize: 16,
  voiceEnabled: true,
  autoSave: true,
  realTimePreview: true
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  useEffect(() => {
    const savedSettings = localStorage.getItem('braille_settings');
    if (savedSettings) {
      try {
        setSettings({ ...defaultSettings, ...JSON.parse(savedSettings) });
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    }
  }, []);

  useEffect(() => {
    // Apply theme to document
    document.documentElement.classList.toggle('dark', settings.theme === 'dark');
    
    // Apply theme to html element for proper CSS variable switching
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [settings.theme]);

  const updateSettings = (newSettings: Partial<Settings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    localStorage.setItem('braille_settings', JSON.stringify(updatedSettings));
    
    // Force re-render by triggering a state change
    window.dispatchEvent(new CustomEvent('settingsChanged', { detail: updatedSettings }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.removeItem('braille_settings');
    window.dispatchEvent(new CustomEvent('settingsChanged', { detail: defaultSettings }));
  };

  return (
    <SettingsContext.Provider value={{
      settings,
      updateSettings,
      resetSettings
    }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}