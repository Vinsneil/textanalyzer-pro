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
  // Aggettivi di base
  "bello", "brutto", "grande", "piccolo", "buono", "cattivo", "alto", "basso",
  "nuovo", "vecchio", "giovane", "anziano", "felice", "triste", "ricco", "povero",
  
  // Caratteristiche fisiche
  "magro", "grasso", "robusto", "snello", "atletico", "muscoloso", "debole", "forte",
  "sano", "malato", "pallido", "roseo", "biondo", "bruno", "calvo", "riccio",
  
  // Dimensioni e forme
  "lungo", "corto", "largo", "stretto", "spesso", "sottile", "profondo", "superficiale",
  "rotondo", "quadrato", "ovale", "rettangolare", "triangolare", "circolare", "piatto", "curvo",
  
  // Colori
  "rosso", "blu", "verde", "giallo", "nero", "bianco", "grigio", "marrone",
  "viola", "arancione", "rosa", "azzurro", "dorato", "argenteo", "bronzeo", "multicolore",
  
  // Temperatura e clima
  "caldo", "freddo", "tiepido", "gelato", "bollente", "fresco", "umido", "secco",
  "soleggiato", "nuvoloso", "piovoso", "ventoso", "afoso", "mite", "torrido", "glaciale",
  
  // Personalità e carattere
  "gentile", "scortese", "educato", "maleducato", "onesto", "disonesto", "sincero", "bugiardo",
  "coraggioso", "codardo", "timido", "estroverso", "introverso", "socievole", "solitario", "amichevole",
  
  // Stati d'animo
  "allegro", "malinconico", "euforico", "depresso", "ansioso", "tranquillo", "agitato", "calmo",
  "nervoso", "rilassato", "preoccupato", "sereno", "arrabbiato", "pacifico", "stressato", "contento",
  
  // Intelletto e capacità
  "intelligente", "stupido", "saggio", "ingenuo", "creativo", "banale", "brillante", "mediocre",
  "geniale", "ottuso", "perspicace", "distratto", "attento", "sbadato", "preciso", "approssimativo",
  
  // Qualità morali
  "buono", "malvagio", "giusto", "ingiusto", "leale", "sleale", "fedele", "infedele",
  "generoso", "avaro", "altruista", "egoista", "modesto", "presuntuoso", "umile", "arrogante",
  
  // Tempo e età
  "antico", "moderno", "contemporaneo", "futuristico", "vecchio", "nuovo", "recente", "obsoleto",
  "giovane", "maturo", "precoce", "tardivo", "eterno", "temporaneo", "provvisorio", "definitivo",
  
  // Intensità e grado
  "estremo", "moderato", "intenso", "lieve", "forte", "debole", "potente", "flebile",
  "massimo", "minimo", "eccessivo", "insufficiente", "abbondante", "scarso", "completo", "parziale",
  
  // Qualità estetiche
  "elegante", "trasandato", "raffinato", "grossolano", "chic", "dozzinale", "lussuoso", "modesto",
  "attraente", "repellente", "affascinante", "ripugnante", "grazioso", "sgraziato", "armonioso", "stonato",
  
  // Stati e condizioni
  "attivo", "passivo", "dinamico", "statico", "vivo", "morto", "sano", "malato",
  "sveglio", "addormentato", "presente", "assente", "disponibile", "occupato", "libero", "impegnato",
  
  // Qualità sensoriali
  "dolce", "amaro", "salato", "aspro", "profumato", "puzzolente", "fragrante", "fetido",
  "rumoroso", "silenzioso", "melodioso", "stonato", "liscio", "ruvido", "morbido", "duro",
  
  // Complessità
  "semplice", "complesso", "facile", "difficile", "elementare", "complicato", "chiaro", "oscuro",
  "comprensibile", "incomprensibile", "esplicito", "implicito", "diretto", "indiretto", "ovvio", "sottile"
]);

// Liste estese per l'analisi del sentiment in italiano
const positiveWordsIT = new Set([
  // Emozioni positive
  "felice", "gioioso", "contento", "allegro", "sereno", "entusiasta", "euforico", "beato",
  "soddisfatto", "appagato", "realizzato", "gratificato", "ottimista", "fiducioso", "speranzoso",
  
  // Qualità positive
  "eccellente", "ottimo", "perfetto", "magnifico", "splendido", "meraviglioso", "fantastico",
  "straordinario", "incredibile", "spettacolare", "fenomenale", "eccezionale", "sublime",
  
  // Relazioni positive
  "amato", "adorato", "apprezzato", "stimato", "rispettato", "ammirato", "benvoluto",
  "gradito", "accettato", "accolto", "integrato", "incluso", "supportato",
  
  // Successo e risultati
  "vincente", "trionfante", "vittorioso", "riuscito", "efficace", "produttivo", "fruttuoso",
  "proficuo", "redditizio", "vantaggioso", "benefico", "utile", "prezioso",
  
  // Crescita e sviluppo
  "crescente", "fiorente", "prosperoso", "rigoglioso", "fertile", "produttivo", "promettente",
  "emergente", "ascendente", "progressivo", "evolutivo", "innovativo",
  
  // Qualità estetiche positive
  "bello", "bellissimo", "attraente", "affascinante", "elegante", "raffinato", "grazioso",
  "armonioso", "delizioso", "incantevole", "seducente", "ammaliante",
  
  // Attributi morali positivi
  "onesto", "sincero", "leale", "fedele", "affidabile", "integro", "retto", "giusto",
  "equo", "corretto", "virtuoso", "nobile", "onorevole"
]);

const negativeWordsIT = new Set([
  // Emozioni negative
  "triste", "infelice", "depresso", "angosciato", "disperato", "afflitto", "addolorato",
  "sconsolato", "abbattuto", "demoralizzato", "sconfortato", "melanconico", "cupo",
  
  // Stati d'animo negativi
  "arrabbiato", "furioso", "irritato", "infuriato", "adirato", "indignato", "esasperato",
  "frustrato", "contrariato", "risentito", "offeso", "amareggiato",
  
  // Qualità negative
  "pessimo", "terribile", "orribile", "tremendo", "disastroso", "catastrofico", "tragico",
  "infausto", "nefasto", "funesto", "rovinoso", "devastante",
  
  // Relazioni negative
  "odiato", "detestato", "disprezzato", "disdegnato", "rifiutato", "emarginato", "escluso",
  "isolato", "abbandonato", "tradito", "ingannato", "deluso",
  
  // Insuccesso e fallimento
  "fallito", "sconfitto", "perdente", "inefficace", "improduttivo", "infruttuoso",
  "inutile", "vano", "sterile", "inconcludente", "fallimentare",
  
  // Degrado e deterioramento
  "deteriorato", "degradato", "rovinato", "danneggiato", "guasto", "corrotto", "marcio",
  "putrefatto", "decadente", "fatiscente", "logoro", "consunto",
  
  // Qualità estetiche negative
  "brutto", "orrendo", "ripugnante", "disgustoso", "sgradevole", "repellente", "ributtante",
  "raccapricciante", "orripilante", "sgraziato", "deforme",
  
  // Attributi morali negativi
  "disonesto", "bugiardo", "sleale", "infedele", "inaffidabile", "corrotto", "scorretto",
  "ingiusto", "iniquo", "malvagio", "perfido", "subdolo"
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