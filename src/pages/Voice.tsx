import React, { useState, useRef, useEffect } from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { useConversions } from '../contexts/ConversionContext';
import { convertTextToBraille } from '../utils/brailleConverter';
import { Mic, MicOff, Play, Pause, Volume2, Copy, Download } from 'lucide-react';

export default function Voice() {
  const { settings } = useSettings();
  const { addConversion } = useConversions();
  
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const [brailleOutput, setBrailleOutput] = useState('');
  const [error, setError] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const [isConverting, setIsConverting] = useState(false);

  const recognitionRef = useRef<any>(null);
  const speechSynthesisRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    // Check for speech recognition support
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    setIsSupported(!!SpeechRecognition && !!window.speechSynthesis);

    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = getRecognitionLanguage(settings.language);

      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          }
        }

        if (finalTranscript) {
          setRecognizedText(prev => prev + finalTranscript);
          // Auto-convert to Braille after getting final transcript
          setTimeout(() => {
            convertToBraille(prev => prev + finalTranscript);
          }, 500);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        setError(`Speech recognition error: ${event.error}`);
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }

    speechSynthesisRef.current = window.speechSynthesis;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (speechSynthesisRef.current) {
        speechSynthesisRef.current.cancel();
      }
    };
  }, [settings.language]);

  const getRecognitionLanguage = (language: string): string => {
    const langMap: Record<string, string> = {
      'English': 'en-US',
      'Spanish': 'es-ES',
      'French': 'fr-FR',
      'Tamil': 'ta-IN',
      'Hindi': 'hi-IN',
      'Malayalam': 'ml-IN'
    };
    return langMap[language] || 'en-US';
  };

  const startRecording = () => {
    if (!isSupported || !settings.voiceEnabled) {
      setError('Voice recognition is not supported or disabled');
      return;
    }

    setError('');
    setIsRecording(true);
    recognitionRef.current?.start();
  };

  const stopRecording = () => {
    setIsRecording(false);
    recognitionRef.current?.stop();
  };

  const convertToBraille = (textToConvert?: string) => {
    const text = textToConvert || recognizedText;
    if (!text.trim()) return;

    setIsConverting(true);
    try {
      const result = convertTextToBraille(
        text,
        settings.language,
        settings.brailleGrade
      );
      
      setBrailleOutput(result.brailleOutput);

      // Add to conversion history
      addConversion({
        originalText: text,
        brailleOutput: result.brailleOutput,
        language: settings.language,
        grade: settings.brailleGrade,
        wordCount: result.wordCount,
        charCount: result.charCount
      });
    } catch (error) {
      setError('Failed to convert to Braille');
    } finally {
      setIsConverting(false);
    }
  };

  const playText = () => {
    if (!recognizedText.trim()) return;

    if (isPlaying) {
      speechSynthesisRef.current?.cancel();
      setIsPlaying(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(recognizedText);
    utterance.lang = getRecognitionLanguage(settings.language);
    utterance.rate = settings.voiceEnabled ? 1 : 0.8;

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => {
      setIsPlaying(false);
      setError('Text-to-speech failed');
    };

    speechSynthesisRef.current?.speak(utterance);
  };

  const clearAll = () => {
    setRecognizedText('');
    setBrailleOutput('');
    setError('');
    speechSynthesisRef.current?.cancel();
    setIsPlaying(false);
  };

  const copyToClipboard = async () => {
    if (brailleOutput) {
      try {
        await navigator.clipboard.writeText(brailleOutput);
      } catch (error) {
        setError('Failed to copy to clipboard');
      }
    }
  };

  const exportFile = () => {
    if (!brailleOutput) return;

    const blob = new Blob([brailleOutput], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'voice-to-braille.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (!isSupported) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-8 text-center">
          <Volume2 className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
            Voice Recognition Not Supported
          </h2>
          <p className="text-yellow-700 dark:text-yellow-300">
            Your browser doesn't support speech recognition. Please try using Chrome, Edge, or Safari.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Voice to Braille Converter
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Use speech recognition to convert spoken words into Braille
        </p>
      </div>

      {/* Voice Controls */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-8 mb-6 shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="text-center">
          <div className="mb-6">
            <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-4 ${
              isRecording 
                ? 'bg-red-500 animate-pulse' 
                : 'bg-emerald-500'
            }`}>
              {isRecording ? (
                <MicOff className="w-12 h-12 text-white" />
              ) : (
                <Mic className="w-12 h-12 text-white" />
              )}
            </div>
            
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              {isRecording ? 'Listening...' : 'Ready to Record'}
            </h2>
            
            <p className="text-slate-600 dark:text-slate-400">
              {isRecording 
                ? 'Speak clearly into your microphone' 
                : 'Click the microphone to start recording'}
            </p>
          </div>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={isRecording ? stopRecording : startRecording}
              disabled={!settings.voiceEnabled}
              className={`px-8 py-3 font-medium rounded-xl transition-all ${
                isRecording
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              } ${!settings.voiceEnabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isRecording ? 'Stop Recording' : 'Start Recording'}
            </button>

            <button
              onClick={playText}
              disabled={!recognizedText.trim()}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:dark:bg-slate-600 text-white font-medium rounded-xl transition-colors flex items-center gap-2"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isPlaying ? 'Stop' : 'Play'}
            </button>

            <button
              onClick={() => convertToBraille()}
              disabled={!recognizedText.trim() || isConverting}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 disabled:dark:bg-slate-600 text-white font-medium rounded-xl transition-colors"
              style={{ fontSize: `${settings.fontSize}px` }}
            >
              {isConverting ? 'Converting...' : 'Convert to Braille'}
            </button>

            <button
              onClick={clearAll}
              className="px-6 py-3 bg-slate-500 hover:bg-slate-600 text-white font-medium rounded-xl transition-colors"
              style={{ fontSize: `${settings.fontSize}px` }}
            >
              Clear All
            </button>
          </div>

          {!settings.voiceEnabled && (
            <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                Voice recognition is disabled. Enable it in Settings to use this feature.
              </p>
            </div>
          )}

          {error && (
            <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recognized Text */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Recognized Text
            </h3>
            <div className="w-full h-80 px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 overflow-auto">
              <div
                className="text-slate-900 dark:text-white whitespace-pre-wrap"
                style={{ fontSize: `${settings.fontSize}px` }}
              >
                {recognizedText || (
                  <span className="text-slate-400 dark:text-slate-500 italic">
                    Recognized speech will appear here...
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Braille Output */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                Braille Output
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={copyToClipboard}
                  disabled={!brailleOutput}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:dark:bg-slate-600 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" />
                  Copy
                </button>
                <button
                  onClick={exportFile}
                  disabled={!brailleOutput}
                  className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 disabled:dark:bg-slate-600 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  Export
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
    </div>
  );
}