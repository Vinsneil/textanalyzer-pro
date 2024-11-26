// Pesi per il calcolo del sentiment
export const SENTIMENT_WEIGHTS = {
  POSITIVE_WORD: 1,
  NEGATIVE_WORD: -1.5,
  POSITIVE_ADJECTIVE: 1.2,
  NEGATIVE_ADJECTIVE: -2.5, // Increased weight for negative adjectives
  SENTIMENT_THRESHOLD: {
    POSITIVE: 0.15,
    NEGATIVE: -0.05 // Adjusted threshold to better catch negative sentiment
  }
};