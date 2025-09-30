import React, { useState, useEffect } from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { useConversions } from '../contexts/ConversionContext';
import { convertTextToBraille, getSupportedLanguages, getLanguageDisplayName } from '../utils/brailleConverter';
import { Download, Copy, RotateCcw, Check } from 'lucide-react';

export default function Converter() {
  const { settings, updateSettings } = useSettings();
  const { addConversion } = useConversions();
  
  const [inputText, setInputText] = useState('');
  const [brailleOutput, setBrailleOutput] = useState('');
  const [stats, setStats] = useState({
    wordCount: 0,
    charCount: 0,
    brailleCells: 0
  });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (settings.realTimePreview && inputText.trim()) {
      const timer = setTimeout(() => {
        convertText();
      }, 500);
      return () => clearTimeout(timer);
    } else if (!inputText.trim()) {
      setBrailleOutput('');
      setStats({ wordCount: 0, charCount: 0, brailleCells: 0 });
    }
  }, [inputText, settings.language, settings.brailleGrade]);

  const convertText = () => {
    if (!inputText.trim()) return;

    try {
      const result = convertTextToBraille(
        inputText,
        settings.language,
        settings.brailleGrade
      );
      
      setBrailleOutput(result.brailleOutput);
      setStats({
        wordCount: result.wordCount,
        charCount: result.charCount,
        brailleCells: result.brailleCells
      });

      // Add to conversion history
      addConversion({
        originalText: inputText,
        brailleOutput: result.brailleOutput,
        language: settings.language,
        grade: settings.brailleGrade,
        wordCount: result.wordCount,
        charCount: result.charCount
      });
    } catch (error) {
      console.error('Conversion error:', error);
    }
  };

  const clearAll = () => {
    setInputText('');
    setBrailleOutput('');
    setStats({ wordCount: 0, charCount: 0, brailleCells: 0 });
  };

  const copyToClipboard = async () => {
    if (brailleOutput) {
      try {
        await navigator.clipboard.writeText(brailleOutput);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.error('Failed to copy:', error);
      }
    }
  };

  const exportFile = (format: 'txt' | 'brf') => {
    if (!brailleOutput) return;

    const filename = `braille-output.${format}`;
    const blob = new Blob([brailleOutput], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Text to Braille Converter
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Convert text to Braille in multiple languages with real-time preview
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 mb-6 shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-48">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Language
            </label>
            <select
              value={settings.language}
              onChange={(e) => updateSettings({ language: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            >
              {getSupportedLanguages().map((lang) => (
                <option key={lang} value={lang}>
                  {getLanguageDisplayName(lang)}
                </option>
              ))}
            </select>
          </div>

          <div className="min-w-32">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Braille Grade
            </label>
            <select
              value={settings.brailleGrade}
              onChange={(e) => updateSettings({ brailleGrade: parseInt(e.target.value) as 1 | 2 })}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            >
              <option value={1}>Grade 1</option>
              <option value={2}>Grade 2</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button
              onClick={convertText}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors"
            >
              Convert
            </button>
            <button
              onClick={clearAll}
              className="px-4 py-2 bg-slate-500 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Clear
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Input Text
            </h2>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter or paste your text here..."
              className="w-full h-80 px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              style={{ fontSize: `${settings.fontSize}px` }}
            />
          </div>
        </div>

        {/* Output Section */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Braille Output
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={copyToClipboard}
                  disabled={!brailleOutput}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:dark:bg-slate-600 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
                <button
                  onClick={() => exportFile('txt')}
                  disabled={!brailleOutput}
                  className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 disabled:dark:bg-slate-600 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  TXT
                </button>
                <button
                  onClick={() => exportFile('brf')}
                  disabled={!brailleOutput}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:dark:bg-slate-600 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  BRF
                </button>
                <button
                  onClick={() => window.print()}
                  disabled={!brailleOutput}
                  className="px-3 py-1.5 bg-green-600 hover:bg-green-700 disabled:bg-slate-300 disabled:dark:bg-slate-600 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  Print
                </button>
              </div>
            </div>
            
            <div className="w-full h-80 px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 overflow-auto">
              <div
                className="font-mono text-slate-900 dark:text-white whitespace-pre-wrap break-all select-all"
                style={{ fontSize: `${Math.round(settings.fontSize * 1.2)}px` }}
              >
                {brailleOutput || (
                  <span className="text-slate-400 dark:text-slate-500 italic">
                    Braille output will appear here...
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="mt-6 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          Conversion Statistics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {stats.wordCount.toLocaleString()}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Words</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {stats.charCount.toLocaleString()}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Characters</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {stats.brailleCells.toLocaleString()}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Braille Cells</div>
          </div>
        </div>
      </div>
    </div>
  );
}