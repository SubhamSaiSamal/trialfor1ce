import React, { createContext, useContext, useState } from 'react';

interface Conversion {
  id: string;
  originalText: string;
  brailleOutput: string;
  language: string;
  grade: number;
  wordCount: number;
  charCount: number;
  timestamp: string;
}

interface ConversionContextType {
  conversions: Conversion[];
  addConversion: (conversion: Omit<Conversion, 'id' | 'timestamp'>) => void;
  clearHistory: () => void;
  getStats: () => {
    totalConversions: number;
    totalWords: number;
    totalChars: number;
    averageWordsPerConversion: number;
  };
}

const ConversionContext = createContext<ConversionContextType | undefined>(undefined);

export function ConversionProvider({ children }: { children: React.ReactNode }) {
  const [conversions, setConversions] = useState<Conversion[]>([]);

  const addConversion = (conversion: Omit<Conversion, 'id' | 'timestamp'>) => {
    const newConversion: Conversion = {
      ...conversion,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    };
    
    setConversions(prev => [newConversion, ...prev.slice(0, 99)]); // Keep only last 100
  };

  const clearHistory = () => {
    setConversions([]);
  };

  const getStats = () => {
    const totalConversions = conversions.length;
    const totalWords = conversions.reduce((sum, conv) => sum + conv.wordCount, 0);
    const totalChars = conversions.reduce((sum, conv) => sum + conv.charCount, 0);
    const averageWordsPerConversion = totalConversions > 0 ? totalWords / totalConversions : 0;

    return {
      totalConversions,
      totalWords,
      totalChars,
      averageWordsPerConversion: Math.round(averageWordsPerConversion)
    };
  };

  return (
    <ConversionContext.Provider value={{
      conversions,
      addConversion,
      clearHistory,
      getStats
    }}>
      {children}
    </ConversionContext.Provider>
  );
}

export function useConversions() {
  const context = useContext(ConversionContext);
  if (context === undefined) {
    throw new Error('useConversions must be used within a ConversionProvider');
  }
  return context;
}