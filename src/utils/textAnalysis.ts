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

// Lista estesa di aggettivi italiani comuni
const italianAdjectives = new Set([
  "bello", "brutto", "grande", "piccolo", "buono", "cattivo", "alto", "basso",
  "nuovo", "vecchio", "giovane", "anziano", "felice", "triste", "ricco", "povero",
  "forte", "debole", "caldo", "freddo", "veloce", "lento", "facile", "difficile",
  "chiaro", "scuro", "dolce", "amaro", "lungo", "corto", "largo", "stretto",
  "pesante", "leggero", "pieno", "vuoto", "pulito", "sporco", "semplice", "complesso",
  "importante", "interessante", "bellissimo", "ottimo", "pessimo", "fantastico",
  "meraviglioso", "terribile", "stupendo", "eccellente", "mediocre", "scarso",
  "positivo", "negativo", "normale", "strano", "diverso", "simile", "vero", "falso"
]);

// Liste estese per l'analisi del sentiment in italiano
const positiveWordsIT = new Set([
  "bello", "bellissimo", "buono", "ottimo", "eccellente", "fantastico", "meraviglioso",
  "stupendo", "magnifico", "splendido", "perfetto", "felice", "contento", "gioioso",
  "positivo", "piacevole", "soddisfatto", "entusiasta", "brillante", "straordinario",
  "incredibile", "affascinante", "delizioso", "sublime", "eccezionale", "grandioso",
  "spettacolare", "favoloso", "adorabile", "amabile", "gradevole", "superbo",
  "efficace", "efficiente", "utile", "vantaggioso", "prezioso", "valido"
]);

const negativeWordsIT = new Set([
  "brutto", "cattivo", "pessimo", "terribile", "orribile", "scarso", "negativo",
  "mediocre", "inadeguato", "insufficiente", "deludente", "spiacevole", "triste",
  "infelice", "scontento", "arrabbiato", "frustrato", "irritato", "preoccupato",
  "ansioso", "stressato", "depresso", "angosciato", "disperato", "spaventato",
  "disgustoso", "orrendo", "tremendo", "scadente", "inutile", "dannoso", "nocivo",
  "fastidioso", "irritante", "insopportabile", "detestabile", "odioso"
]);

export const analyzeText = (text: string) => {
  const lang = detectLanguage(text);
  const doc = nlp(text);
  const words = text.split(/\s+/);
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  const cleanWords = removeStopwords(words, lang);
  
  // Analisi del sentiment migliorata per l'italiano
  const sentimentResults = sentences.map(sentence => {
    const words = sentence.toLowerCase().split(/\s+/);
    let score = 0;
    let totalWords = 0;
    
    words.forEach(word => {
      if (positiveWordsIT.has(word)) {
        score += 1;
        totalWords += 1;
      }
      if (negativeWordsIT.has(word)) {
        score -= 1;
        totalWords += 1;
      }
    });
    
    return {
      text: sentence,
      sentiment: score > 0 ? "positive" : score < 0 ? "negative" : "neutral"
    };
  });
  
  const totalSentences = sentimentResults.length || 1;
  const overallSentiment = {
    positive: sentimentResults.filter(s => s.sentiment === "positive").length / totalSentences,
    negative: sentimentResults.filter(s => s.sentiment === "negative").length / totalSentences,
    neutral: sentimentResults.filter(s => s.sentiment === "neutral").length / totalSentences,
  };

  // Identificazione migliorata degli aggettivi italiani
  const wordList = text.toLowerCase().split(/\s+/);
  const adjectivesCount: { [key: string]: number } = {};
  
  wordList.forEach(word => {
    if (italianAdjectives.has(word)) {
      adjectivesCount[word] = (adjectivesCount[word] || 0) + 1;
    }
  });

  return {
    basicStats: {
      characters: text.length,
      sentences: sentences.length,
    },
    keywords: getNGrams(cleanWords, 1),
    bigrams: getNGrams(cleanWords, 2),
    trigrams: getNGrams(cleanWords, 3),
    adjectives: Object.entries(adjectivesCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 40),
    sentiment: {
      overall: overallSentiment,
      sentences: sentimentResults,
    },
  };
};