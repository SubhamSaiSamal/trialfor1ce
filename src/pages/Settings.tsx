import React, { useState } from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { getSupportedLanguages, getLanguageDisplayName } from '../utils/brailleConverter';
import { Monitor, Sun, Moon, Volume2, Save, RotateCcw } from 'lucide-react';

export default function Settings() {
  const { settings, updateSettings, resetSettings } = useSettings();
  const [saved, setSaved] = useState(false);
  const [tempSettings, setTempSettings] = useState(settings);

  // Update temp settings when main settings change
  React.useEffect(() => {
    setTempSettings(settings);
  }, [settings]);

  const handleSave = () => {
    updateSettings(tempSettings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all settings to defaults?')) {
      resetSettings();
      setTempSettings({
        theme: 'dark',
        language: 'English',
        brailleGrade: 2,
        fontSize: 16,
        voiceEnabled: true,
        autoSave: true,
        realTimePreview: true
      });
    }
  };

  const updateTempSettings = (newSettings: Partial<typeof settings>) => {
    setTempSettings(prev => ({ ...prev, ...newSettings }));
  };

  const themeOptions = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Settings
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Customize your Braille converter experience
          </p>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 bg-slate-500 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors"
            style={{ fontSize: `${settings.fontSize}px` }}
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
          <button
            onClick={handleSave}
            disabled={saved}
            className={`flex items-center gap-2 px-4 py-2 font-medium rounded-lg transition-colors ${
              saved
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
            style={{ fontSize: `${settings.fontSize}px` }}
          >
            <Save className="w-4 h-4" />
            {saved ? 'Saved!' : 'Save Settings'}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Appearance */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <Monitor className="w-5 h-5" />
            Appearance
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Theme */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                Theme
              </label>
              <div className="grid grid-cols-2 gap-2">
                {themeOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => updateTempSettings({ theme: option.value as 'light' | 'dark' })}
                    className={`flex items-center justify-center gap-2 p-3 rounded-lg border transition-all ${
                      tempSettings.theme === option.value
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
                        : 'border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500'
                    }`}
                    style={{ fontSize: `${settings.fontSize}px` }}
                  >
                    <option.icon className="w-4 h-4" />
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Font Size */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                Font Size: {tempSettings.fontSize}px
              </label>
              <input
                type="range"
                min="12"
                max="24"
                step="1"
                value={tempSettings.fontSize}
                onChange={(e) => updateTempSettings({ fontSize: parseInt(e.target.value) })}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
                <span>12px</span>
                <span>18px</span>
                <span>24px</span>
              </div>
            </div>
          </div>
        </div>

        {/* Language & Conversion */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
            Language & Conversion
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Default Language */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Default Language
              </label>
              <select
                value={tempSettings.language}
                onChange={(e) => updateTempSettings({ language: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                style={{ fontSize: `${settings.fontSize}px` }}
              >
                {getSupportedLanguages().map((lang) => (
                  <option key={lang} value={lang}>
                    {getLanguageDisplayName(lang)}
                  </option>
                ))}
              </select>
            </div>

            {/* Braille Grade */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Default Braille Grade
              </label>
              <select
                value={tempSettings.brailleGrade}
                onChange={(e) => updateTempSettings({ brailleGrade: parseInt(e.target.value) as 1 | 2 })}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                style={{ fontSize: `${settings.fontSize}px` }}
              >
                <option value={1}>Grade 1 (Letter by letter)</option>
                <option value={2}>Grade 2 (Contractions)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Voice & Audio */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <Volume2 className="w-5 h-5" />
            Voice & Audio
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-slate-900 dark:text-white">
                  Enable Voice Recognition
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Allow speech-to-text conversion for hands-free input
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={tempSettings.voiceEnabled}
                  onChange={(e) => updateTempSettings({ voiceEnabled: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-emerald-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Behavior */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
            Behavior
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-slate-900 dark:text-white">
                  Real-time Preview
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Convert text to Braille as you type
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={tempSettings.realTimePreview}
                  onChange={(e) => updateTempSettings({ realTimePreview: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-emerald-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-slate-900 dark:text-white">
                  Auto-save Conversions
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Automatically save your conversion history
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={tempSettings.autoSave}
                  onChange={(e) => updateTempSettings({ autoSave: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-emerald-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}