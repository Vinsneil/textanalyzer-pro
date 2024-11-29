import { themeKeywords } from './themeKeywords';
import { cleanText } from '../textCleaner';

interface ThemeMatch {
  theme: string;
  confidence: number;
  matchedTerms: string[];
}

const calculateThemeConfidence = (
  sentence: string,
  mainKeywords: string[],
  relatedTerms: string[],
  contextIndicators: string[]
): { confidence: number; matchedTerms: string[] } => {
  const cleanedSentence = cleanText(sentence).toLowerCase();
  const words = cleanedSentence.split(/\s+/);
  const matchedTerms: string[] = [];
  let score = 0;

  // Funzione helper per controllare la presenza di parole simili
  const checkSimilarity = (word: string, reference: string): boolean => {
    const cleanWord = word.toLowerCase();
    const cleanRef = reference.toLowerCase();
    
    // Controllo esatto
    if (cleanWord === cleanRef) return true;
    
    // Controllo radice della parola (stemming semplificato)
    if (cleanWord.length > 4 && cleanRef.length > 4) {
      const wordRoot = cleanWord.slice(0, Math.floor(cleanWord.length * 0.7));
      const refRoot = cleanRef.slice(0, Math.floor(cleanRef.length * 0.7));
      if (wordRoot === refRoot) return true;
    }
    
    // Controllo contenimento
    if (cleanWord.includes(cleanRef) || cleanRef.includes(cleanWord)) return true;
    
    return false;
  };

  // Check for exact matches and partial matches in main keywords (highest weight)
  mainKeywords.forEach(keyword => {
    const cleanedKeyword = cleanText(keyword).toLowerCase();
    
    // Controllo frase completa
    if (cleanedSentence.includes(cleanedKeyword)) {
      score += 5;
      matchedTerms.push(keyword);
      return;
    }
    
    // Controllo parole singole
    const keywordParts = cleanedKeyword.split(/\s+/);
    const matchedParts = keywordParts.filter(part => 
      words.some(word => checkSimilarity(word, part))
    );
    
    if (matchedParts.length > 0) {
      score += (matchedParts.length / keywordParts.length) * 4;
      matchedTerms.push(keyword);
    }
  });

  // Check for related terms (medium weight)
  relatedTerms.forEach(term => {
    const cleanedTerm = cleanText(term).toLowerCase();
    
    if (cleanedSentence.includes(cleanedTerm)) {
      score += 3;
      matchedTerms.push(term);
      return;
    }
    
    const termParts = cleanedTerm.split(/\s+/);
    const matchedParts = termParts.filter(part => 
      words.some(word => checkSimilarity(word, part))
    );
    
    if (matchedParts.length > 0) {
      score += (matchedParts.length / termParts.length) * 2;
      matchedTerms.push(term);
    }
  });

  // Check for context indicators (lower weight but important for theme confirmation)
  contextIndicators.forEach(indicator => {
    const cleanedIndicator = cleanText(indicator).toLowerCase();
    
    if (cleanedSentence.includes(cleanedIndicator)) {
      score += 2;
      matchedTerms.push(indicator);
      return;
    }
    
    const indicatorParts = cleanedIndicator.split(/\s+/);
    const matchedParts = indicatorParts.filter(part => 
      words.some(word => checkSimilarity(word, part))
    );
    
    if (matchedParts.length > 0) {
      score += (matchedParts.length / indicatorParts.length) * 1.5;
      matchedTerms.push(indicator);
    }
  });

  // Bonus per frasi che contengono multiple corrispondenze
  if (matchedTerms.length > 2) {
    score *= 1.3;
  }

  // Normalizza il punteggio di confidenza tra 0 e 1
  const maxPossibleScore = (mainKeywords.length * 5) + (relatedTerms.length * 3) + (contextIndicators.length * 2);
  const confidence = Math.min(score / (maxPossibleScore * 0.3), 1); // Ridotto il divisore per aumentare la sensibilità

  return { confidence, matchedTerms };
};

export const analyzeThemes = (sentences: string[]): Array<{
  theme: string;
  count: number;
  sentences: string[];
}> => {
  const themeMatches = new Map<string, Set<string>>();

  sentences.forEach(sentence => {
    if (sentence.trim().length < 5) return;

    const sentenceThemes: ThemeMatch[] = [];

    Object.entries(themeKeywords).forEach(([theme, { mainKeywords, relatedTerms, contextIndicators }]) => {
      const { confidence, matchedTerms } = calculateThemeConfidence(
        sentence,
        mainKeywords,
        relatedTerms,
        contextIndicators
      );

      // Ridotta la soglia di confidenza per aumentare la sensibilità
      if (confidence > 0.08 && matchedTerms.length > 0) {
        sentenceThemes.push({ theme, confidence, matchedTerms });
      }
    });

    // Assegna la frase ai temi più rilevanti
    sentenceThemes
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 4) // Aumentato il numero massimo di temi per frase
      .forEach(({ theme }) => {
        if (!themeMatches.has(theme)) {
          themeMatches.set(theme, new Set());
        }
        themeMatches.get(theme)!.add(sentence);
      });
  });

  return Array.from(themeMatches.entries())
    .map(([theme, sentences]) => ({
      theme,
      count: sentences.size,
      sentences: Array.from(sentences)
    }))
    .filter(theme => theme.count > 0)
    .sort((a, b) => b.count - a.count);
};