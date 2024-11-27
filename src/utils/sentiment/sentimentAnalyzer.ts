import { SENTIMENT_WEIGHTS } from './weights';
import { positiveWords, negativeWords } from '../italianDictionaries/sentiment';
import { negativeContextWords } from '../italianDictionaries/sentiment/negativeContextWords';
import { cleanWord } from '../textCleaner';

export const getAdjectiveSentiment = (adjective: string): number => {
  const cleanedAdj = cleanWord(adjective);
  
  if (positiveWords.has(cleanedAdj)) {
    return SENTIMENT_WEIGHTS.POSITIVE_ADJECTIVE;
  }
  if (negativeWords.has(cleanedAdj)) {
    return SENTIMENT_WEIGHTS.NEGATIVE_ADJECTIVE;
  }
  
  return 0;
};

export const analyzeSentence = (sentence: string) => {
  const words = sentence.toLowerCase().split(/\s+/);
  let score = 0;
  let totalWords = 0;
  let hasNegativeContext = false;
  
  // Check for negative context words first
  words.forEach(word => {
    const cleanedWord = cleanWord(word);
    if (negativeContextWords.has(cleanedWord)) {
      hasNegativeContext = true;
    }
  });
  
  // If negative context is found, return negative sentiment
  if (hasNegativeContext) {
    return {
      score: SENTIMENT_WEIGHTS.NEGATIVE_WORD,
      sentiment: "negative"
    };
  }
  
  // Otherwise proceed with regular sentiment analysis
  words.forEach(word => {
    const cleanedWord = cleanWord(word);
    
    if (positiveWords.has(cleanedWord)) {
      score += SENTIMENT_WEIGHTS.POSITIVE_WORD;
      totalWords += 1;
    }
    if (negativeWords.has(cleanedWord)) {
      score += SENTIMENT_WEIGHTS.NEGATIVE_WORD;
      totalWords += 1;
    }
  });
  
  const normalizedScore = totalWords > 0 ? score / totalWords : 0;
  
  return {
    score: normalizedScore,
    sentiment: normalizedScore > SENTIMENT_WEIGHTS.SENTIMENT_THRESHOLD.POSITIVE 
      ? "positive" 
      : normalizedScore < SENTIMENT_WEIGHTS.SENTIMENT_THRESHOLD.NEGATIVE 
        ? "negative" 
        : "neutral"
  };
};
