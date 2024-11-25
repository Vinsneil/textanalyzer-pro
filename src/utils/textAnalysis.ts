import { italianAdjectives } from './italianDictionaries/adjectives';
import { positiveWordsIT, negativeWordsIT } from './italianDictionaries/sentimentWords';
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

// Nuova funzione per ottenere tutte le forme di un aggettivo
const getAdjectiveForms = (adjective: string): Set<string> => {
  const forms = new Set<string>();
  forms.add(adjective); // forma base

  // Regole per il plurale maschile
  if (adjective.endsWith('o')) {
    forms.add(adjective.slice(0, -1) + 'i'); // es: bello -> belli
  } else if (adjective.endsWith('e')) {
    forms.add(adjective.slice(0, -1) + 'i'); // es: grande -> grandi
  }

  // Regole per il femminile e plurale femminile
  if (adjective.endsWith('o')) {
    forms.add(adjective.slice(0, -1) + 'a'); // singolare femminile
    forms.add(adjective.slice(0, -1) + 'e'); // plurale femminile
  }

  return forms;
};

// Creiamo un set con tutte le forme possibili degli aggettivi
const getAllAdjectiveForms = (): Set<string> => {
  const allForms = new Set<string>();
  italianAdjectives.forEach(adj => {
    const forms = getAdjectiveForms(adj);
    forms.forEach(form => allForms.add(form));
  });
  return allForms;
};

const adjectiveFormsSet = getAllAdjectiveForms();

export const analyzeText = (text: string) => {
  const lang = detectLanguage(text);
  const doc = nlp(text);
  const words = text.split(/\s+/);
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  const cleanWords = removeStopwords(words, lang);
  
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

  const wordList = text.toLowerCase().split(/\s+/);
  const adjectivesCount: { [key: string]: number } = {};
  
  wordList.forEach(word => {
    if (adjectiveFormsSet.has(word)) {
      // Troviamo la forma base dell'aggettivo per il conteggio
      const baseForm = Array.from(italianAdjectives).find(adj => 
        getAdjectiveForms(adj).has(word)
      ) || word;
      
      adjectivesCount[baseForm] = (adjectivesCount[baseForm] || 0) + 1;
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
