import React, { useState, useRef } from 'react';
import { useConversions } from '../contexts/ConversionContext';
import { Upload, FileText, Download, Search, Filter, Calendar, Trash2 } from 'lucide-react';

export default function Files() {
  const { conversions } = useConversions();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLanguage, setFilterLanguage] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      // You could navigate to converter with this text
      console.log('Uploaded text:', text);
      // For now, we'll just log it
    } catch (error) {
      console.error('Error reading file:', error);
    }

    // Reset the input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const exportConversion = (conversion: any, format: 'txt' | 'brf') => {
    const content = format === 'txt' ? conversion.originalText : conversion.brailleOutput;
    const filename = `conversion-${conversion.id}.${format}`;
    
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Filter and sort conversions
  const filteredConversions = conversions
    .filter(conv => {
      const matchesSearch = conv.originalText.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLanguage = filterLanguage === 'all' || conv.language === filterLanguage;
      return matchesSearch && matchesLanguage;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        case 'language':
          return a.language.localeCompare(b.language);
        case 'length':
          return b.charCount - a.charCount;
        default:
          return 0;
      }
    });

  // Get unique languages for filter
  const languages = Array.from(new Set(conversions.map(conv => conv.language)));

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            File Manager
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Manage your text files and conversion history
          </p>
        </div>
        
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors"
        >
          <Upload className="w-4 h-4" />
          Import File
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".txt,.md"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Upload Area */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-8 mb-8 text-center hover:border-emerald-400 dark:hover:border-emerald-500 transition-colors cursor-pointer"
      >
        <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
          Import Text Files
        </h3>
        <p className="text-slate-600 dark:text-slate-400">
          Click here or drag and drop your .txt or .md files to import them for conversion
        </p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 mb-6 shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="flex flex-wrap items-center gap-4">
          {/* Search */}
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search conversions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Language Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-500" />
            <select
              value={filterLanguage}
              onChange={(e) => setFilterLanguage(e.target.value)}
              className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            >
              <option value="all">All Languages</option>
              {languages.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            >
              <option value="date">Sort by Date</option>
              <option value="language">Sort by Language</option>
              <option value="length">Sort by Length</option>
            </select>
          </div>
        </div>
      </div>

      {/* Files List */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Conversion History ({filteredConversions.length})
          </h3>
        </div>
        
        <div className="divide-y divide-slate-200 dark:divide-slate-700 max-h-96 overflow-y-auto">
          {filteredConversions.length === 0 ? (
            <div className="p-8 text-center">
              <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-500 dark:text-slate-400">
                {conversions.length === 0 
                  ? "No conversions yet. Import a file or start converting text!"
                  : "No conversions match your search criteria."
                }
              </p>
            </div>
          ) : (
            filteredConversions.map((conversion) => (
              <div key={conversion.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <FileText className="w-4 h-4 text-slate-400" />
                      <h4 className="text-sm font-medium text-slate-900 dark:text-white">
                        Conversion #{conversion.id}
                      </h4>
                      <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs font-medium rounded">
                        {conversion.language}
                      </span>
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded">
                        Grade {conversion.grade}
                      </span>
                    </div>
                    
                    <p className="text-sm text-slate-600 dark:text-slate-300 mb-2 truncate">
                      {conversion.originalText.substring(0, 150)}
                      {conversion.originalText.length > 150 && '...'}
                    </p>
                    
                    <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                      <span>{conversion.wordCount} words</span>
                      <span>{conversion.charCount} characters</span>
                      <span>{new Date(conversion.timestamp).toLocaleDateString()}</span>
                      <span>{new Date(conversion.timestamp).toLocaleTimeString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => exportConversion(conversion, 'txt')}
                      className="px-2 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white font-medium rounded transition-colors flex items-center gap-1"
                      title="Export original text"
                    >
                      <Download className="w-3 h-3" />
                      TXT
                    </button>
                    <button
                      onClick={() => exportConversion(conversion, 'brf')}
                      className="px-2 py-1 text-xs bg-purple-600 hover:bg-purple-700 text-white font-medium rounded transition-colors flex items-center gap-1"
                      title="Export Braille output"
                    >
                      <Download className="w-3 h-3" />
                      BRF
                    </button>
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