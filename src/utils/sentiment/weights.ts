// Pesi per il calcolo del sentiment
export const SENTIMENT_WEIGHTS = {
  POSITIVE_WORD: 1,
  NEGATIVE_WORD: -1.5, // Aumentato il peso negativo
  POSITIVE_ADJECTIVE: 1.2,
  NEGATIVE_ADJECTIVE: -2, // Aumentato significativamente il peso negativo degli aggettivi
  SENTIMENT_THRESHOLD: {
    POSITIVE: 0.15,
    NEGATIVE: -0.08 // Modificata la soglia per la classificazione negativa
  }
};