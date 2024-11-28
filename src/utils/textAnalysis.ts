import { italianAdjectives } from './italianDictionaries/adjectives';
import { cleanWord, removeStopwords } from './textCleaner';
import { analyzeSentence } from './sentiment/sentimentAnalyzer';
import nlp from 'compromise';

const detectLanguage = (text: string): "it" | "en" => {
  const italianWords = ["il", "lo", "la", "i", "gli", "le", "di", "da", "in", "con"];
  const words = text.toLowerCase().split(" ");
  const italianCount = words.filter(word => italianWords.includes(word)).length;
  return italianCount > words.length * 0.1 ? "it" : "en";
};

const getNGrams = (words: string[], n: number): Array<[string, number]> => {
  const ngrams: { [key: string]: number } = {};
  
  for (let i = 0; i <= words.length - n; i++) {
    const ngram = words.slice(i, i + n).join(" ");
    ngrams[ngram] = (ngrams[ngram] || 0) + 1;
  }
  
  return Object.entries(ngrams)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 60);
};

const EXCLUDED_PROPER_NOUNS = new Set([
  'Di', 'E', 'Il', 'Da', 'Dopo', 'Prima', 'Quando', 'Ma', 'Poichè'
]);

const findProperNouns = (text: string): Array<[string, number]> => {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim());
  const properNouns: { [key: string]: number } = {};
  
  sentences.forEach(sentence => {
    const words = sentence.trim().split(/\s+/);
    words.forEach((word, index) => {
      if (index === 0 || words[index - 1].endsWith('.')) return;
      
      if (/^[A-Z][a-zàèéìòù]*$/.test(word) && !EXCLUDED_PROPER_NOUNS.has(word)) {
        properNouns[word] = (properNouns[word] || 0) + 1;
      }
    });
  });

  return Object.entries(properNouns)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 60);
};

const getAdjectiveForms = (adjective: string): Set<string> => {
  const forms = new Set<string>();
  forms.add(adjective);

  if (adjective.endsWith('o')) {
    forms.add(adjective.slice(0, -1) + 'i');
    forms.add(adjective.slice(0, -1) + 'a');
    forms.add(adjective.slice(0, -1) + 'e');
  } else if (adjective.endsWith('e')) {
    forms.add(adjective);
    forms.add(adjective.slice(0, -1) + 'i');
  } else if (adjective.endsWith('to')) {
    forms.add(adjective.slice(0, -1) + 'ta');
    forms.add(adjective.slice(0, -2) + 'ti');
    forms.add(adjective.slice(0, -2) + 'te');
  }

  return forms;
};

const getAllAdjectiveForms = (): Set<string> => {
  const allForms = new Set<string>();
  italianAdjectives.forEach(adj => {
    const forms = getAdjectiveForms(adj);
    forms.forEach(form => allForms.add(form));
  });
  return allForms;
};

const adjectiveFormsSet = getAllAdjectiveForms();

const findThemes = (text: string): Array<{ theme: string; count: number; sentences: Array<string> }> => {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim());
  const themes = new Map<string, { count: number; sentences: Set<string> }>();
  
  const themeKeywords = {
    'Economia': ['economia', 'finanza', 'mercato', 'denaro', 'business', 'commercio', 'prezzo'],
    'Politica': ['politica', 'governo', 'stato', 'legge', 'parlamento', 'ministro'],
    'Tecnologia': ['tecnologia', 'digitale', 'internet', 'software', 'computer', 'innovazione'],
    'Ambiente': ['ambiente', 'clima', 'natura', 'sostenibilità', 'ecologia', 'inquinamento'],
    'Società': ['società', 'cultura', 'comunità', 'sociale', 'popolazione', 'cittadini'],
    'Salute': ['salute', 'medicina', 'benessere', 'malattia', 'cura', 'prevenzione'],
    'Istruzione': ['istruzione', 'scuola', 'università', 'formazione', 'studenti', 'educazione'],
    'Sport': ['sport', 'atleta', 'competizione', 'gara', 'campionato', 'gioco'],
    'Arte': ['arte', 'cultura', 'musica', 'teatro', 'cinema', 'letteratura'],
    'Scienza': ['scienza', 'ricerca', 'studio', 'scoperta', 'laboratorio', 'esperimento']
  };

  sentences.forEach(sentence => {
    const lowercaseSentence = sentence.toLowerCase();
    
    Object.entries(themeKeywords).forEach(([theme, keywords]) => {
      if (keywords.some(keyword => lowercaseSentence.includes(keyword))) {
        if (!themes.has(theme)) {
          themes.set(theme, { count: 0, sentences: new Set() });
        }
        const themeData = themes.get(theme)!;
        themeData.count++;
        themeData.sentences.add(sentence.trim());
      }
    });
  });

  return Array.from(themes.entries())
    .map(([theme, data]) => ({
      theme,
      count: data.count,
      sentences: Array.from(data.sentences)
    }))
    .sort((a, b) => b.count - a.count);
};

export const analyzeText = (text: string) => {
  const lang = detectLanguage(text);
  const doc = nlp(text);
  const words = text.split(/\s+/);
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  const cleanWords = removeStopwords(words, lang);
  
  const adjectives: { [key: string]: number } = {};
  
  words.forEach(word => {
    const cleanedWord = cleanWord(word);
    if (adjectiveFormsSet.has(cleanedWord)) {
      const baseForm = Array.from(italianAdjectives).find(adj => 
        getAdjectiveForms(adj).has(cleanedWord)
      ) || cleanedWord;
      
      adjectives[baseForm] = (adjectives[baseForm] || 0) + 1;
    }
  });

  const sentimentResults = sentences.map(sentence => ({
    text: sentence,
    ...analyzeSentence(sentence)
  }));
  
  const totalSentences = sentimentResults.length || 1;
  const overallSentiment = {
    positive: sentimentResults.filter(s => s.sentiment === "positive").length / totalSentences,
    negative: sentimentResults.filter(s => s.sentiment === "negative").length / totalSentences,
    neutral: sentimentResults.filter(s => s.sentiment === "neutral").length / totalSentences,
  };

  return {
    basicStats: {
      characters: text.length,
      sentences: sentences.length,
      words: words.length,
      adjectives: Object.values(adjectives).reduce((a, b) => a + b, 0),
    },
    keywords: getNGrams(cleanWords, 1).slice(0, 60),
    bigrams: getNGrams(cleanWords, 2).slice(0, 60),
    trigrams: getNGrams(cleanWords, 3).slice(0, 60),
    adjectives: Object.entries(adjectives)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 60),
    properNouns: findProperNouns(text).slice(0, 60),
    sentiment: {
      overall: overallSentiment,
      sentences: sentimentResults,
    },
    themes: findThemes(text),
  };
};
