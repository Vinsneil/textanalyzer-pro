import { SENTIMENT_WEIGHTS } from './weights';
import { positiveWords, negativeWords } from '../italianDictionaries/sentiment';
import { negativeContextWords } from '../italianDictionaries/sentiment/negativeContextWords';
import { idioms } from '../italianDictionaries/sentiment/idioms';
import { emojis } from '../italianDictionaries/sentiment/emojis';
import { cleanWord } from '../textCleaner';

const findIdioms = (text: string) => {
  let score = 0;
  
  // Convert text to lowercase for matching
  const lowerText = text.toLowerCase();
  
  // Check for positive idioms
  idioms.positive.forEach(idiom => {
    if (lowerText.includes(idiom)) {
      score += SENTIMENT_WEIGHTS.IDIOM_POSITIVE;
    }
  });
  
  // Check for negative idioms
  idioms.negative.forEach(idiom => {
    if (lowerText.includes(idiom)) {
      score += SENTIMENT_WEIGHTS.IDIOM_NEGATIVE;
    }
  });
  
  return score;
};

const analyzeEmojis = (text: string) => {
  let score = 0;
  let count = 0;
  
  // Analyze each character
  for (const char of text) {
    if (emojis.positive.has(char)) {
      score += SENTIMENT_WEIGHTS.EMOJI_POSITIVE;
      count++;
    } else if (emojis.negative.has(char)) {
      score += SENTIMENT_WEIGHTS.EMOJI_NEGATIVE;
      count++;
    }
  }
  
  return count > 0 ? score / count : 0;
};

const analyzeContextualSentiment = (words: string[], originalText: string) => {
  let contextScore = 0;
  let contextWords = 0;

  // Analyze word context
  words.forEach((word, index) => {
    const cleanedWord = cleanWord(word);
    
    if (negativeContextWords.has(cleanedWord)) {
      contextScore -= SENTIMENT_WEIGHTS.NEGATIVE_CONTEXT;
      contextWords++;
      
      // Check surrounding words (improved context analysis)
      const surroundingWords = [
        index > 1 ? words[index - 2] : null,
        index > 0 ? words[index - 1] : null,
        index < words.length - 1 ? words[index + 1] : null,
        index < words.length - 2 ? words[index + 2] : null
      ].filter(Boolean).map(w => cleanWord(w));
      
      surroundingWords.forEach(nearbyWord => {
        if (positiveWords.has(nearbyWord)) {
          contextScore -= SENTIMENT_WEIGHTS.POSITIVE_WORD * 0.5; // Reduced impact due to negative context
        }
        if (negativeWords.has(nearbyWord)) {
          contextScore -= SENTIMENT_WEIGHTS.NEGATIVE_WORD * 1.2; // Amplified impact due to negative context
        }
      });
    }
  });

  // Add idiom analysis
  const idiomScore = findIdioms(originalText);
  
  // Add emoji analysis
  const emojiScore = analyzeEmojis(originalText);
  
  const totalScore = contextWords > 0 
    ? (contextScore / contextWords) + idiomScore + emojiScore
    : idiomScore + emojiScore;

  return totalScore;
};

export const analyzeSentence = (sentence: string) => {
  const words = sentence.toLowerCase().split(/\s+/);
  let score = 0;
  let totalWords = 0;
  
  // Context analysis with original text
  const contextScore = analyzeContextualSentiment(words, sentence);
  
  // Word-by-word analysis
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
  
  // Combine all scores
  const finalScore = totalWords > 0 
    ? (score / totalWords) + contextScore
    : contextScore;
  
  // Determine final sentiment with adjusted thresholds
  return {
    score: finalScore,
    sentiment: finalScore > SENTIMENT_WEIGHTS.SENTIMENT_THRESHOLD.POSITIVE 
      ? "positive" 
      : finalScore < SENTIMENT_WEIGHTS.SENTIMENT_THRESHOLD.NEGATIVE 
        ? "negative" 
        : "neutral"
  };
};