// Braille conversion tables for multiple languages
export const BRAILLE_TABLES = {
  English: {
    // Basic letters
    'a': '⠁', 'b': '⠃', 'c': '⠉', 'd': '⠙', 'e': '⠑',
    'f': '⠋', 'g': '⠛', 'h': '⠓', 'i': '⠊', 'j': '⠚',
    'k': '⠅', 'l': '⠇', 'm': '⠍', 'n': '⠝', 'o': '⠕',
    'p': '⠏', 'q': '⠟', 'r': '⠗', 's': '⠎', 't': '⠞',
    'u': '⠥', 'v': '⠧', 'w': '⠺', 'x': '⠭', 'y': '⠽',
    'z': '⠵',
    
    // Numbers (with number prefix)
    '1': '⠼⠁', '2': '⠼⠃', '3': '⠼⠉', '4': '⠼⠙', '5': '⠼⠑',
    '6': '⠼⠋', '7': '⠼⠛', '8': '⠼⠓', '9': '⠼⠊', '0': '⠼⠚',
    
    // Punctuation
    ' ': ' ', '.': '⠲', ',': '⠂', ';': '⠆', ':': '⠒', '?': '⠦',
    '!': '⠖', '(': '⠣', ')': '⠜', '/': '⠌', '#': '⠼', "'": '⠄',
    '"': '⠐⠄', '-': '⠤', '+': '⠬', '=': '⠶', '*': '⠔',
    
    // Common contractions (Grade 2)
    'the': '⠮', 'and': '⠯', 'for': '⠿', 'with': '⠾', 'you': '⠽',
    'people': '⠏', 'knowledge': '⠅', 'question': '⠟'
  },
  
  Spanish: {
    // Spanish letters with accents
    'á': '⠷', 'é': '⠮', 'í': '⠌', 'ó': '⠬', 'ú': '⠾',
    'ñ': '⠫', 'ü': '⠳',
    'a': '⠁', 'b': '⠃', 'c': '⠉', 'd': '⠙', 'e': '⠑',
    'f': '⠋', 'g': '⠛', 'h': '⠓', 'i': '⠊', 'j': '⠚',
    'k': '⠅', 'l': '⠇', 'm': '⠍', 'n': '⠝', 'o': '⠕',
    'p': '⠏', 'q': '⠟', 'r': '⠗', 's': '⠎', 't': '⠞',
    'u': '⠥', 'v': '⠧', 'w': '⠺', 'x': '⠭', 'y': '⠽',
    'z': '⠵',
    
    // Numbers
    '1': '⠼⠁', '2': '⠼⠃', '3': '⠼⠉', '4': '⠼⠙', '5': '⠼⠑',
    '6': '⠼⠋', '7': '⠼⠛', '8': '⠼⠓', '9': '⠼⠊', '0': '⠼⠚',
    
    // Punctuation
    ' ': ' ', '.': '⠲', ',': '⠂', ';': '⠆', ':': '⠒', '?': '⠦',
    '!': '⠖', '(': '⠣', ')': '⠜', '¿': '⠢', '¡': '⠖'
  },
  
  French: {
    // French accented letters
    'à': '⠷', 'â': '⠡', 'ä': '⠜', 'ç': '⠯', 'è': '⠮',
    'é': '⠿', 'ê': '⠣', 'ë': '⠫', 'î': '⠩', 'ï': '⠻',
    'ô': '⠹', 'ö': '⠪', 'ù': '⠾', 'û': '⠱', 'ü': '⠳',
    
    'a': '⠁', 'b': '⠃', 'c': '⠉', 'd': '⠙', 'e': '⠑',
    'f': '⠋', 'g': '⠛', 'h': '⠓', 'i': '⠊', 'j': '⠚',
    'k': '⠅', 'l': '⠇', 'm': '⠍', 'n': '⠝', 'o': '⠕',
    'p': '⠏', 'q': '⠟', 'r': '⠗', 's': '⠎', 't': '⠞',
    'u': '⠥', 'v': '⠧', 'w': '⠺', 'x': '⠭', 'y': '⠽',
    'z': '⠵',
    
    // Numbers
    '1': '⠼⠁', '2': '⠼⠃', '3': '⠼⠉', '4': '⠼⠙', '5': '⠼⠑',
    '6': '⠼⠋', '7': '⠼⠛', '8': '⠼⠓', '9': '⠼⠊', '0': '⠼⠚',
    
    // Punctuation
    ' ': ' ', '.': '⠲', ',': '⠂', ';': '⠆', ':': '⠒', '?': '⠦',
    '!': '⠖', '(': '⠣', ')': '⠜', '«': '⠦⠄', '»': '⠠⠴'
  },
  
  Tamil: {
    // Tamil vowels
    'அ': '⠁', 'ஆ': '⠜', 'இ': '⠊', 'ஈ': '⠔', 'உ': '⠥',
    'ஊ': '⠳', 'எ': '⠑', 'ஏ': '⠢', 'ஐ': '⠌', 'ஒ': '⠕',
    'ஓ': '⠬', 'ஔ': '⠪',
    
    // Tamil consonants
    'க': '⠅', 'ங': '⠒', 'ச': '⠉', 'ஞ': '⠝', 'ட': '⠞',
    'ண': '⠼', 'த': '⠹', 'ந': '⠓', 'ப': '⠏', 'ம': '⠍',
    'ய': '⠽', 'ர': '⠗', 'ல': '⠇', 'வ': '⠧', 'ழ': '⠵',
    'ள': '⠸', 'ற': '⠆', 'ன': '⠫',
    
    // Numbers
    '௧': '⠼⠁', '௨': '⠼⠃', '௩': '⠼⠉', '௪': '⠼⠙', '௫': '⠼⠑',
    '௬': '⠼⠋', '௭': '⠼⠛', '௮': '⠼⠓', '௯': '⠼⠊', '௰': '⠼⠚',
    
    // Basic punctuation
    ' ': ' ', '.': '⠲', ',': '⠂', '?': '⠦', '!': '⠖'
  },
  
  Hindi: {
    // Hindi vowels
    'अ': '⠁', 'आ': '⠜', 'इ': '⠊', 'ई': '⠔', 'उ': '⠥',
    'ऊ': '⠳', 'ऋ': '⠐⠗', 'ए': '⠑', 'ऐ': '⠌', 'ओ': '⠕',
    'औ': '⠪',
    
    // Hindi consonants (simplified)
    'क': '⠅', 'ख': '⠨⠅', 'ग': '⠛', 'घ': '⠨⠛', 'ङ': '⠒',
    'च': '⠉', 'छ': '⠨⠉', 'ज': '⠚', 'झ': '⠨⠚', 'ञ': '⠝',
    'ट': '⠞', 'ठ': '⠨⠞', 'ड': '⠙', 'ढ': '⠨⠙', 'ण': '⠼',
    'त': '⠹', 'थ': '⠨⠹', 'द': '⠘', 'ध': '⠨⠘', 'न': '⠓',
    'प': '⠏', 'फ': '⠨⠏', 'ब': '⠃', 'भ': '⠨⠃', 'म': '⠍',
    'य': '⠽', 'र': '⠗', 'ल': '⠇', 'व': '⠧', 'श': '⠩',
    'ष': '⠯', 'स': '⠎', 'ह': '⠓',
    
    // Numbers
    '०': '⠼⠚', '१': '⠼⠁', '२': '⠼⠃', '३': '⠼⠉', '४': '⠼⠙',
    '५': '⠼⠑', '६': '⠼⠋', '७': '⠼⠛', '८': '⠼⠓', '९': '⠼⠊',
    
    // Punctuation
    ' ': ' ', '।': '⠲', ',': '⠂', '?': '⠦', '!': '⠖'
  },
  
  Malayalam: {
    // Malayalam vowels
    'അ': '⠁', 'ആ': '⠜', 'ഇ': '⠊', 'ഈ': '⠔', 'ഉ': '⠥',
    'ഊ': '⠳', 'ഋ': '⠐⠗', 'എ': '⠑', 'ഏ': '⠢', 'ഐ': '⠌',
    'ഒ': '⠕', 'ഓ': '⠬', 'ഔ': '⠪',
    
    // Malayalam consonants (simplified)
    'ക': '⠅', 'ഖ': '⠨⠅', 'ഗ': '⠛', 'ഘ': '⠨⠛', 'ങ': '⠒',
    'ച': '⠉', 'ഛ': '⠨⠉', 'ജ': '⠚', 'ഝ': '⠨⠚', 'ഞ': '⠝',
    'ട': '⠞', 'ഠ': '⠨⠞', 'ഡ': '⠙', 'ഢ': '⠨⠙', 'ണ': '⠼',
    'ത': '⠹', 'ഥ': '⠨⠹', 'ദ': '⠘', 'ധ': '⠨⠘', 'ന': '⠓',
    'പ': '⠏', 'ഫ': '⠨⠏', 'ബ': '⠃', 'ഭ': '⠨⠃', 'മ': '⠍',
    'യ': '⠽', 'ര': '⠗', 'ല': '⠇', 'വ': '⠧', 'ശ': '⠩',
    'ഷ': '⠯', 'സ': '⠎', 'ഹ': '⠓', 'ള': '⠸', 'ഴ': '⠵',
    'റ': '⠆',
    
    // Numbers
    '൦': '⠼⠚', '൧': '⠼⠁', '൨': '⠼⠃', '൩': '⠼⠉', '൪': '⠼⠙',
    '൫': '⠼⠑', '൬': '⠼⠋', '൭': '⠼⠛', '൮': '⠼⠓', '൯': '⠼⠊',
    
    // Punctuation
    ' ': ' ', '.': '⠲', ',': '⠂', '?': '⠦', '!': '⠖'
  }
};

export interface ConversionResult {
  brailleOutput: string;
  wordCount: number;
  charCount: number;
  brailleCells: number;
}

export function convertTextToBraille(
  text: string, 
  language: string, 
  grade: number = 1
): ConversionResult {
  if (!text.trim()) {
    return {
      brailleOutput: '',
      wordCount: 0,
      charCount: 0,
      brailleCells: 0
    };
  }

  const table = BRAILLE_TABLES[language as keyof typeof BRAILLE_TABLES];
  if (!table) {
    throw new Error(`Language ${language} is not supported`);
  }

  const wordCount = text.trim().split(/\s+/).length;
  const charCount = text.length;
  let result: string[] = [];

  if (language === 'English' && grade === 2) {
    result = convertEnglishGrade2(text.toLowerCase(), table);
  } else if (['Tamil', 'Hindi', 'Malayalam'].includes(language)) {
    result = convertIndicLanguage(text, table);
  } else {
    result = convertBasic(text.toLowerCase(), table);
  }

  const brailleOutput = result.join('');
  const brailleCells = brailleOutput.replace(/\s/g, '').length;

  return {
    brailleOutput,
    wordCount,
    charCount,
    brailleCells
  };
}

function convertBasic(text: string, table: Record<string, string>): string[] {
  const result: string[] = [];
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (table[char]) {
      result.push(table[char]);
    } else if (char === ' ') {
      result.push(' ');
    } else {
      // Unknown character - use placeholder
      result.push('⠿');
    }
  }
  
  return result;
}

function convertEnglishGrade2(text: string, table: Record<string, string>): string[] {
  const result: string[] = [];
  let i = 0;
  
  // Common contractions for Grade 2
  const contractions = ['the', 'and', 'for', 'with', 'you', 'people', 'knowledge', 'question'];
  
  while (i < text.length) {
    let found = false;
    
    // Check for contractions
    for (const contraction of contractions.sort((a, b) => b.length - a.length)) {
      if (text.substr(i, contraction.length) === contraction) {
        // Check word boundaries
        const prevChar = i > 0 ? text[i - 1] : ' ';
        const nextChar = i + contraction.length < text.length ? text[i + contraction.length] : ' ';
        
        if (/\s/.test(prevChar) && /\s/.test(nextChar)) {
          result.push(table[contraction]);
          i += contraction.length;
          found = true;
          break;
        }
      }
    }
    
    if (!found) {
      const char = text[i];
      if (table[char]) {
        result.push(table[char]);
      } else if (char === ' ') {
        result.push(' ');
      } else {
        result.push('⠿');
      }
      i++;
    }
  }
  
  return result;
}

function convertIndicLanguage(text: string, table: Record<string, string>): string[] {
  const result: string[] = [];
  let i = 0;
  
  while (i < text.length) {
    // Check for two-character combinations first
    if (i < text.length - 1) {
      const twoChar = text.substr(i, 2);
      if (table[twoChar]) {
        result.push(table[twoChar]);
        i += 2;
        continue;
      }
    }
    
    // Single character
    const char = text[i];
    if (table[char]) {
      result.push(table[char]);
    } else if (char === ' ') {
      result.push(' ');
    } else if (/[.,!?;:]/.test(char)) {
      // Use English punctuation as fallback
      result.push(BRAILLE_TABLES.English[char] || '⠿');
    } else {
      result.push('⠿');
    }
    i++;
  }
  
  return result;
}

export function getLanguageDisplayName(language: string): string {
  const displayNames: Record<string, string> = {
    'English': 'English',
    'Spanish': 'Español',
    'French': 'Français',
    'Tamil': 'தமிழ்',
    'Hindi': 'हिन्दी',
    'Malayalam': 'മലയാളം'
  };
  
  return displayNames[language] || language;
}

export function getSupportedLanguages(): string[] {
  return Object.keys(BRAILLE_TABLES);
}