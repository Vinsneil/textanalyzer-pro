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

  // Check for exact matches in main keywords (highest weight)
  mainKeywords.forEach(keyword => {
    const cleanedKeyword = cleanText(keyword);
    if (cleanedSentence.includes(cleanedKeyword)) {
      score += 3;
      matchedTerms.push(keyword);
    }
  });

  // Check for related terms (medium weight)
  relatedTerms.forEach(term => {
    const cleanedTerm = cleanText(term);
    if (cleanedSentence.includes(cleanedTerm)) {
      score += 2;
      matchedTerms.push(term);
    }
  });

  // Check for context indicators (lowest weight but important for theme confirmation)
  contextIndicators.forEach(indicator => {
    const cleanedIndicator = cleanText(indicator);
    if (cleanedSentence.includes(cleanedIndicator)) {
      score += 1;
      matchedTerms.push(indicator);
    }
  });

  // Check for word variations (stem matching)
  const checkStemMatch = (word: string, reference: string): boolean => {
    if (word.length < 4 || reference.length < 4) return false;
    const stem = reference.slice(0, -2).toLowerCase();
    return word.toLowerCase().startsWith(stem);
  };

  words.forEach(word => {
    [...mainKeywords, ...relatedTerms].forEach(reference => {
      if (checkStemMatch(word, reference) && !matchedTerms.includes(reference)) {
        score += 1;
        matchedTerms.push(reference);
      }
    });
  });

  // Normalize confidence score to be between 0 and 1
  const maxPossibleScore = (mainKeywords.length * 3) + (relatedTerms.length * 2) + contextIndicators.length;
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
    if (sentence.trim().length < 10) return; // Skip very short sentences

    const sentenceThemes: ThemeMatch[] = [];

    // Analyze sentence for each theme
    Object.entries(themeKeywords).forEach(([theme, { mainKeywords, relatedTerms, contextIndicators }]) => {
      const { confidence, matchedTerms } = calculateThemeConfidence(
        sentence,
        mainKeywords,
        relatedTerms,
        contextIndicators
      );

      if (confidence > 0.15 && matchedTerms.length > 0) {
        sentenceThemes.push({ theme, confidence, matchedTerms });
      }
    });

    // Sort themes by confidence and assign sentence to top matching themes
    sentenceThemes
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 2) // Limit to top 2 themes per sentence to avoid over-categorization
      .forEach(({ theme }) => {
        if (!themeMatches.has(theme)) {
          themeMatches.set(theme, new Set());
        }
        themeMatches.get(theme)!.add(sentence);
      });
  });

  // Convert results to the expected format and filter out themes with no matches
  return Array.from(themeMatches.entries())
    .map(([theme, sentences]) => ({
      theme,
      count: sentences.size,
      sentences: Array.from(sentences)
    }))
    .filter(theme => theme.count > 0)
    .sort((a, b) => b.count - a.count);
};