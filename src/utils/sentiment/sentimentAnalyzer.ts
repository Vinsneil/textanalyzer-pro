import { SENTIMENT_WEIGHTS } from './weights';
import { positiveWordsIT, negativeWordsIT } from '../italianDictionaries/sentimentWords';
import { cleanWord } from '../textCleaner';

export const getAdjectiveSentiment = (adjective: string): number => {
  // Clean the adjective before checking sentiment
  const cleanedAdj = cleanWord(adjective);
  
  if (positiveWordsIT.has(cleanedAdj)) {
    return SENTIMENT_WEIGHTS.POSITIVE_ADJECTIVE;
  }
  if (negativeWordsIT.has(cleanedAdj)) {
    return SENTIMENT_WEIGHTS.NEGATIVE_ADJECTIVE;
  }
  
  return 0;
};

export const analyzeSentence = (sentence: string) => {
  const words = sentence.toLowerCase().split(/\s+/);
  let score = 0;
  let totalWords = 0;
  
  words.forEach(word => {
    // Clean each word before sentiment analysis
    const cleanedWord = cleanWord(word);
    
    if (positiveWordsIT.has(cleanedWord)) {
      score += SENTIMENT_WEIGHTS.POSITIVE_WORD;
      totalWords += 1;
    }
    if (negativeWordsIT.has(cleanedWord)) {
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