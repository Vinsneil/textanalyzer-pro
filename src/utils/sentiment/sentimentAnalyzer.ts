import { SENTIMENT_WEIGHTS } from './weights';
import { positiveWords, negativeWords } from '../italianDictionaries/sentiment';
import { negativeContextWords } from '../italianDictionaries/sentiment/negativeContextWords';
import { cleanWord } from '../textCleaner';

const analyzeContextualSentiment = (words: string[]) => {
  let contextScore = 0;
  let contextWords = 0;

  words.forEach((word, index) => {
    const cleanedWord = cleanWord(word);
    
    if (negativeContextWords.has(cleanedWord)) {
      contextScore -= SENTIMENT_WEIGHTS.NEGATIVE_CONTEXT;
      contextWords++;
      
      // Influenza le parole vicine
      if (index > 0) {
        const prevWord = cleanWord(words[index - 1]);
        if (positiveWords.has(prevWord)) {
          contextScore -= SENTIMENT_WEIGHTS.POSITIVE_WORD;
        }
      }
    }
  });

  return contextWords > 0 ? contextScore / contextWords : 0;
};

export const analyzeSentence = (sentence: string) => {
  const words = sentence.toLowerCase().split(/\s+/);
  let score = 0;
  let totalWords = 0;
  
  // Analisi contestuale
  const contextScore = analyzeContextualSentiment(words);
  
  // Analisi delle singole parole
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
  
  // Combiniamo i punteggi
  const finalScore = totalWords > 0 
    ? (score / totalWords) + contextScore
    : contextScore;
  
  // Determiniamo il sentiment finale
  return {
    score: finalScore,
    sentiment: finalScore > SENTIMENT_WEIGHTS.SENTIMENT_THRESHOLD.POSITIVE 
      ? "positive" 
      : finalScore < SENTIMENT_WEIGHTS.SENTIMENT_THRESHOLD.NEGATIVE 
        ? "negative" 
        : "neutral"
  };
};