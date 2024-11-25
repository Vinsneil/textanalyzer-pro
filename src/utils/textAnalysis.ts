import { italianAdjectives } from './italianDictionaries/adjectives';
import { positiveWordsIT, negativeWordsIT } from './italianDictionaries/sentimentWords';
import { cleanWord, removeStopwords } from './textCleaner';
import { getAdjectiveSentiment, analyzeSentence } from './sentiment/sentimentAnalyzer';
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
    .slice(0, 40);
};

const findProperNouns = (text: string): Array<[string, number]> => {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim());
  const properNouns: { [key: string]: number } = {};
  
  sentences.forEach(sentence => {
    const words = sentence.trim().split(/\s+/);
    words.forEach((word, index) => {
      if (index === 0 || words[index - 1].endsWith('.')) return;
      
      if (/^[A-Z][a-zàèéìòù]*$/.test(word)) {
        properNouns[word] = (properNouns[word] || 0) + 1;
      }
    });
  });

  return Object.entries(properNouns)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 40);
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

export const analyzeText = (text: string) => {
  const lang = detectLanguage(text);
  const doc = nlp(text);
  const words = text.split(/\s+/);
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  const cleanWords = removeStopwords(words, lang);
  
  const adjectivesPositive: { [key: string]: number } = {};
  const adjectivesNegative: { [key: string]: number } = {};
  const adjectivesNeutral: { [key: string]: number } = {};
  
  words.forEach(word => {
    const cleanedWord = cleanWord(word);
    if (adjectiveFormsSet.has(cleanedWord)) {
      const baseForm = Array.from(italianAdjectives).find(adj => 
        getAdjectiveForms(adj).has(cleanedWord)
      ) || cleanedWord;
      
      const sentiment = getAdjectiveSentiment(cleanedWord);
      if (sentiment > 0) {
        adjectivesPositive[baseForm] = (adjectivesPositive[baseForm] || 0) + 1;
      } else if (sentiment < 0) {
        adjectivesNegative[baseForm] = (adjectivesNegative[baseForm] || 0) + 1;
      } else {
        adjectivesNeutral[baseForm] = (adjectivesNeutral[baseForm] || 0) + 1;
      }
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
      adjectives: Object.values(adjectivesPositive).reduce((a, b) => a + b, 0) +
                 Object.values(adjectivesNegative).reduce((a, b) => a + b, 0) +
                 Object.values(adjectivesNeutral).reduce((a, b) => a + b, 0),
    },
    keywords: getNGrams(cleanWords, 1),
    bigrams: getNGrams(cleanWords, 2),
    trigrams: getNGrams(cleanWords, 3),
    adjectives: {
      positive: Object.entries(adjectivesPositive)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 40),
      negative: Object.entries(adjectivesNegative)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 40),
      neutral: Object.entries(adjectivesNeutral)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 40),
    },
    properNouns: findProperNouns(text),
    sentiment: {
      overall: overallSentiment,
      sentences: sentimentResults,
    },
  };
};