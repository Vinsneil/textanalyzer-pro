export const cleanWord = (word: string): string => {
  // Remove punctuation from both start and end of the word
  return word.replace(/^[.,!?;:"']+|[.,!?;:"']+$/g, '').toLowerCase().trim();
};

const italianStopwords = new Set([
  // Articoli determinativi
  "il", "lo", "la", "i", "gli", "le",
  
  // Articoli indeterminativi
  "un", "uno", "una",
  
  // Preposizioni semplici
  "di", "a", "da", "in", "con", "su", "per", "tra", "fra",
  
  // Preposizioni articolate
  "del", "dello", "della", "dei", "degli", "delle",
  "al", "allo", "alla", "ai", "agli", "alle",
  "dal", "dallo", "dalla", "dai", "dagli", "dalle",
  "nel", "nello", "nella", "nei", "negli", "nelle",
  "sul", "sullo", "sulla", "sui", "sugli", "sulle",
  
  // Pronomi personali
  "io", "tu", "lui", "lei", "noi", "voi", "loro",
  "me", "te", "se", "ce", "ve",
  "mi", "ti", "si", "ci", "vi",
  
  // Aggettivi possessivi
  "mio", "mia", "miei", "mie",
  "tuo", "tua", "tuoi", "tue",
  "suo", "sua", "suoi", "sue",
  "nostro", "nostra", "nostri", "nostre",
  "vostro", "vostra", "vostri", "vostre",
  "loro",
  
  // Verbo essere
  "sono", "sei", "è", "siamo", "siete",
  "ero", "eri", "era", "eravamo", "eravate", "erano",
  "sarò", "sarai", "sarà", "saremo", "sarete", "saranno",
  "sia", "siate", "siano",
  "fossi", "fosse", "fossero",
  
  // Verbo avere
  "ho", "hai", "ha", "abbiamo", "avete", "hanno",
  "avevo", "avevi", "aveva", "avevamo", "avevate", "avevano",
  "avrò", "avrai", "avrà", "avremo", "avrete", "avranno",
  "abbia", "abbiate", "abbiano",
  "avessi", "avesse", "avessero"
]);

export const removeStopwords = (words: string[], lang: string) => {
  if (lang === "it") {
    return words.filter(word => !italianStopwords.has(word.toLowerCase()));
  }
  
  // English stopwords (keeping existing functionality)
  const englishStopwords = ["the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for", "with", "by"];
  return words.filter(word => !englishStopwords.includes(word.toLowerCase()));
};
