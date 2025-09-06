import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useConversions } from '../contexts/ConversionContext';
import { FileText, Mic, FolderOpen, BarChart3, ArrowRight } from 'lucide-react';

export default function Home() {
  const { user } = useAuth();
  const { getStats } = useConversions();
  
  const stats = getStats();

  const quickActions = [
    {
      title: 'Convert Text',
      description: 'Transform text into Braille instantly',
      icon: FileText,
      href: '/converter',
      color: 'bg-emerald-500 hover:bg-emerald-600'
    },
    {
      title: 'Voice Input',
      description: 'Use speech recognition for hands-free conversion',
      icon: Mic,
      href: '/voice',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'File Manager',
      description: 'Import and manage your text files',
      icon: FolderOpen,
      href: '/files',
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      title: 'Analytics',
      description: 'View your usage statistics and history',
      icon: BarChart3,
      href: '/analytics',
      color: 'bg-orange-500 hover:bg-orange-600'
    }
  ];

  const statItems = [
    { label: 'Total Conversions', value: stats.totalConversions, color: 'text-emerald-600 dark:text-emerald-400' },
    { label: 'Words Converted', value: stats.totalWords, color: 'text-blue-600 dark:text-blue-400' },
    { label: 'Characters Processed', value: stats.totalChars, color: 'text-purple-600 dark:text-purple-400' },
    { label: 'Average Per Conversion', value: stats.averageWordsPerConversion, color: 'text-orange-600 dark:text-orange-400' }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
          Welcome to Braille Converter Pro
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-300">
          Hello, {user?.username}! Ready to convert text to Braille?
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statItems.map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  {stat.label}
                </p>
                <p className={`text-3xl font-bold ${stat.color}`}>
                  {stat.value.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action) => (
            <Link
              key={action.title}
              to={action.href}
              className="group bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${action.color} text-white`}>
                  <action.icon className="w-6 h-6" />
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                {action.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {action.description}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Getting Started */}
      <div className="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-8">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Getting Started
          </h2>
          <p className="text-slate-700 dark:text-slate-300 mb-6">
            New to Braille Converter Pro? Here's how to get the most out of our powerful features:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-6 h-6 bg-emerald-500 text-white text-sm font-bold rounded-full flex items-center justify-center">
                  1
                </span>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">Choose Your Language</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Select from English, Spanish, French, Tamil, Hindi, or Malayalam
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-6 h-6 bg-emerald-500 text-white text-sm font-bold rounded-full flex items-center justify-center">
                  2
                </span>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">Input Your Text</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Type, paste, or use voice input to enter text for conversion
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-6 h-6 bg-emerald-500 text-white text-sm font-bold rounded-full flex items-center justify-center">
                  3
                </span>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">Convert & Export</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Get instant Braille conversion and export as TXT or BRF files
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-6 h-6 bg-emerald-500 text-white text-sm font-bold rounded-full flex items-center justify-center">
                  4
                </span>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">Track Progress</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Monitor your usage with detailed analytics and conversion history
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}