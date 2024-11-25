import nlp from 'compromise';

const removeStopwords = (words: string[], lang: string) => {
  const stopwords = lang === "it" 
    ? ["il", "lo", "la", "i", "gli", "le", "un", "uno", "una", "di", "a", "da", "in", "con", "su", "per", "tra", "fra"]
    : ["the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for", "with", "by"];
  return words.filter(word => !stopwords.includes(word.toLowerCase()));
};

const getNGrams = (words: string[], n: number): Array<[string, number]> => {
  const ngrams: { [key: string]: number } = {};
  
  for (let i = 0; i <= words.length - n; i++) {
    const ngram = words.slice(i, i + n).join(" ");
    ngrams[ngram] = (ngrams[ngram] || 0) + 1;
  }
  
  return Object.entries(ngrams)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 40);
};

const detectLanguage = (text: string): "it" | "en" => {
  const italianWords = ["il", "lo", "la", "i", "gli", "le", "di", "da", "in", "con"];
  const words = text.toLowerCase().split(" ");
  const italianCount = words.filter(word => italianWords.includes(word)).length;
  return italianCount > words.length * 0.1 ? "it" : "en";
};

export const analyzeText = (text: string) => {
  const lang = detectLanguage(text);
  const doc = nlp(text);
  const words = text.split(/\s+/);
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  const cleanWords = removeStopwords(words, lang);
  
  // Analyze sentiment using compromise's basic sentiment analysis
  const sentimentResults = sentences.map(sentence => {
    const sentenceDoc = nlp(sentence);
    const terms = sentenceDoc.terms().json();
    let score = 0;
    
    terms.forEach((term: any) => {
      if (term.tags.includes('Positive')) score += 1;
      if (term.tags.includes('Negative')) score -= 1;
    });
    
    return {
      text: sentence,
      sentiment: score > 0 ? "positive" : score < 0 ? "negative" : "neutral"
    };
  });
  
  const totalSentences = sentimentResults.length;
  const overallSentiment = {
    positive: sentimentResults.filter(s => s.sentiment === "positive").length / totalSentences,
    negative: sentimentResults.filter(s => s.sentiment === "negative").length / totalSentences,
    neutral: sentimentResults.filter(s => s.sentiment === "neutral").length / totalSentences,
  };

  // Get adjectives using compromise
  const adjectives = doc.adjectives().out('array')
    .reduce((acc: { [key: string]: number }, adj: string) => {
      acc[adj] = (acc[adj] || 0) + 1;
      return acc;
    }, {});

  return {
    basicStats: {
      characters: text.length,
      sentences: sentences.length,
    },
    keywords: getNGrams(cleanWords, 1),
    bigrams: getNGrams(cleanWords, 2),
    trigrams: getNGrams(cleanWords, 3),
    adjectives: Object.entries(adjectives)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 40),
    sentiment: {
      overall: overallSentiment,
      sentences: sentimentResults,
    },
  };
};