import React from 'react';
import { useConversions } from '../contexts/ConversionContext';
import { BarChart3, TrendingUp, FileText, Languages, Calendar, Trash2 } from 'lucide-react';

export default function Analytics() {
  const { conversions, getStats, clearHistory } = useConversions();
  const stats = getStats();

  // Get language breakdown
  const languageStats = conversions.reduce((acc, conversion) => {
    acc[conversion.language] = (acc[conversion.language] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Get recent activity (last 7 days)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
  const recentConversions = conversions.filter(
    conversion => new Date(conversion.timestamp) > sevenDaysAgo
  );

  // Get daily activity for the past week
  const dailyActivity = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toDateString();
    
    const dayConversions = conversions.filter(
      conversion => new Date(conversion.timestamp).toDateString() === dateStr
    );
    
    return {
      date: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      count: dayConversions.length,
      words: dayConversions.reduce((sum, conv) => sum + conv.wordCount, 0)
    };
  }).reverse();

  const maxDailyCount = Math.max(...dailyActivity.map(day => day.count), 1);

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all conversion history? This action cannot be undone.')) {
      clearHistory();
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Analytics Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Track your Braille conversion usage and patterns
          </p>
        </div>
        
        {conversions.length > 0 && (
          <button
            onClick={handleClearHistory}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Clear History
          </button>
        )}
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Total Conversions
              </p>
              <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                {stats.totalConversions}
              </p>
            </div>
            <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
              <BarChart3 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Words Converted
              </p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {stats.totalWords.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Characters Processed
              </p>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                {stats.totalChars.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Average Words
              </p>
              <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                {stats.averageWordsPerConversion}
              </p>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <TrendingUp className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Daily Activity Chart */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Daily Activity (Last 7 Days)
            </h3>
          </div>
          
          <div className="space-y-3">
            {dailyActivity.map((day, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-16 text-sm text-slate-600 dark:text-slate-400">
                  {day.date}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(day.count / maxDailyCount) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-slate-900 dark:text-white w-8">
                      {day.count}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Language Breakdown */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <Languages className="w-5 h-5" />
              Language Usage
            </h3>
          </div>
          
          <div className="space-y-4">
            {Object.entries(languageStats)
              .sort(([,a], [,b]) => b - a)
              .map(([language, count]) => {
                const percentage = (count / stats.totalConversions) * 100;
                return (
                  <div key={language} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full" />
                      <span className="text-sm font-medium text-slate-900 dark:text-white">
                        {language}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-32 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-slate-600 dark:text-slate-400 w-8">
                        {count}
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* Recent Conversions */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Recent Conversions
          </h3>
        </div>
        
        <div className="divide-y divide-slate-200 dark:divide-slate-700">
          {conversions.length === 0 ? (
            <div className="p-8 text-center">
              <BarChart3 className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-500 dark:text-slate-400">
                No conversions yet. Start converting text to see your analytics!
              </p>
            </div>
          ) : (
            conversions.slice(0, 10).map((conversion) => (
              <div key={conversion.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-900 dark:text-white font-medium truncate">
                      {conversion.originalText.substring(0, 100)}
                      {conversion.originalText.length > 100 && '...'}
                    </p>
                    <div className="mt-1 flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                      <span>{conversion.language}</span>
                      <span>Grade {conversion.grade}</span>
                      <span>{conversion.wordCount} words</span>
                      <span>{conversion.charCount} chars</span>
                      <span>{new Date(conversion.timestamp).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}