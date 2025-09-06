import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useSettings } from '../../contexts/SettingsContext';
import { 
  Home, 
  FileText, 
  Mic, 
  FolderOpen, 
  BarChart3, 
  Settings as SettingsIcon, 
  HelpCircle,
  LogOut,
  User
} from 'lucide-react';

export default function Sidebar() {
  const { user, logout } = useAuth();
  const { settings } = useSettings();
  const location = useLocation();
  
  // Navigation items with dynamic text based on language
  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Text Converter', href: '/converter', icon: FileText },
    { name: 'Voice Input', href: '/voice', icon: Mic },
    { name: 'File Manager', href: '/files', icon: FolderOpen },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/settings', icon: SettingsIcon },
    { name: 'Help', href: '/help', icon: HelpCircle },
  ];

  return (
    <div className="flex flex-col w-72 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700">
      {/* Logo */}
      <div className="flex items-center justify-center h-20 border-b border-slate-200 dark:border-slate-700">
        <div className="text-center">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">
            ⠃⠗⠁⠊⠇⠇⠑
          </h1>
          <p className="text-sm text-emerald-600 dark:text-emerald-400 font-semibold">
            PRO 3.0
          </p>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-800 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-emerald-600 dark:text-emerald-300" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
              {user?.username}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {user?.authType === 'braille_code' ? 'Braille Access' : 'Account User'}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={`
                group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors
                ${isActive
                  ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                }
              `}
              style={{ fontSize: `${settings.fontSize}px` }}
            >
              <item.icon className={`
                mr-3 flex-shrink-0 h-5 w-5
                ${isActive
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-slate-400 group-hover:text-slate-500 dark:group-hover:text-slate-300'
                }
              `} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      {/* Status Indicators */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-700">
        <div className="space-y-2 text-xs" style={{ fontSize: `${Math.max(settings.fontSize - 2, 10)}px` }}>
          <div className="flex items-center justify-between">
            <span className="text-slate-500 dark:text-slate-400">Voice:</span>
            <span className={`font-medium ${
              settings.voiceEnabled 
                ? 'text-emerald-600 dark:text-emerald-400' 
                : 'text-slate-400'
            }`}>
              {settings.voiceEnabled ? 'Ready' : 'Disabled'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500 dark:text-slate-400">Auto-save:</span>
            <span className={`font-medium ${
              settings.autoSave 
                ? 'text-emerald-600 dark:text-emerald-400' 
                : 'text-slate-400'
            }`}>
              {settings.autoSave ? 'On' : 'Off'}
            </span>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-700">
        <button
          onClick={logout}
          className="w-full flex items-center px-3 py-2.5 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          style={{ fontSize: `${settings.fontSize}px` }}
        >
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  );
}