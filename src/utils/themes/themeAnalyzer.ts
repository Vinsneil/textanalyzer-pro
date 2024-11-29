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
  const cleanedSentence = cleanText(sentence);
  const words = cleanedSentence.split(/\s+/);
  const matchedTerms: string[] = [];
  let score = 0;

  // Funzione helper per controllare la presenza di parole simili
  const checkSimilarity = (word: string, reference: string): boolean => {
    const cleanWord = cleanText(word);
    const cleanRef = cleanText(reference);
    return cleanWord.includes(cleanRef) || cleanRef.includes(cleanWord);
  };

  // Check for exact matches and partial matches in main keywords (highest weight)
  mainKeywords.forEach(keyword => {
    const cleanedKeyword = cleanText(keyword);
    if (cleanedSentence.includes(cleanedKeyword)) {
      score += 4;
      matchedTerms.push(keyword);
    } else {
      // Controllo per match parziali
      words.forEach(word => {
        if (checkSimilarity(word, keyword)) {
          score += 2;
          matchedTerms.push(keyword);
        }
      });
    }
  });

  // Check for related terms (medium weight)
  relatedTerms.forEach(term => {
    const cleanedTerm = cleanText(term);
    if (cleanedSentence.includes(cleanedTerm)) {
      score += 3;
      matchedTerms.push(term);
    } else {
      // Controllo per match parziali
      words.forEach(word => {
        if (checkSimilarity(word, term)) {
          score += 1.5;
          matchedTerms.push(term);
        }
      });
    }
  });

  // Check for context indicators
  contextIndicators.forEach(indicator => {
    const cleanedIndicator = cleanText(indicator);
    if (cleanedSentence.includes(cleanedIndicator)) {
      score += 2;
      matchedTerms.push(indicator);
    }
  });

  // Bonus per frasi che contengono multiple corrispondenze
  if (matchedTerms.length > 2) {
    score *= 1.2;
  }

  // Normalizza il punteggio di confidenza tra 0 e 1
  const maxPossibleScore = (mainKeywords.length * 4) + (relatedTerms.length * 3) + (contextIndicators.length * 2);
  const confidence = Math.min(score / maxPossibleScore, 1);

  return { confidence, matchedTerms };
};

export const analyzeThemes = (sentences: string[]): Array<{
  theme: string;
  count: number;
  sentences: string[];
}> => {
  const themeMatches = new Map<string, Set<string>>();

  sentences.forEach(sentence => {
    if (sentence.trim().length < 10) return;

    const sentenceThemes: ThemeMatch[] = [];

    Object.entries(themeKeywords).forEach(([theme, { mainKeywords, relatedTerms, contextIndicators }]) => {
      const { confidence, matchedTerms } = calculateThemeConfidence(
        sentence,
        mainKeywords,
        relatedTerms,
        contextIndicators
      );

      if (confidence > 0.12 && matchedTerms.length > 0) {
        sentenceThemes.push({ theme, confidence, matchedTerms });
      }
    });

    // Assegna la frase ai temi più rilevanti
    sentenceThemes
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 3) // Permette fino a 3 temi per frase
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