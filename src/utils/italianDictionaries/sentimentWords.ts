export const positiveWordsIT = new Set([
  // Emozioni positive
  "felice", "gioioso", "contento", "allegro", "sereno", "entusiasta", "euforico", "beato",
  "soddisfatto", "appagato", "realizzato", "gratificato", "ottimista", "fiducioso", "speranzoso",
  "tranquillo", "rilassato", "pacato", "calmo", "placido", "quieto", "disteso", "riposato",
  
  // Successo e risultati
  "vincente", "trionfante", "vittorioso", "riuscito", "efficace", "produttivo", "fruttuoso",
  "proficuo", "redditizio", "vantaggioso", "benefico", "utile", "prezioso", "valido",
  "eccellente", "ottimo", "perfetto", "impeccabile", "esemplare", "magistrale", "superbo",
  
  // Relazioni positive
  "amato", "adorato", "apprezzato", "stimato", "rispettato", "ammirato", "benvoluto",
  "gradito", "accettato", "accolto", "integrato", "incluso", "supportato", "sostenuto",
  "aiutato", "protetto", "difeso", "tutelato", "assistito", "favorito", "privilegiato",
  
  // Qualità positive
  "buono", "bravo", "capace", "competente", "abile", "esperto", "qualificato", "preparato",
  "intelligente", "brillante", "geniale", "perspicace", "acuto", "sveglio", "intuitivo",
  "creativo", "innovativo", "originale", "inventivo", "ingegnoso", "fantasioso", "immaginativo",
  
  // Caratteristiche morali positive
  "onesto", "sincero", "leale", "fedele", "affidabile", "integro", "retto", "giusto",
  "equo", "corretto", "virtuoso", "nobile", "onorevole", "dignitoso", "rispettabile",
  "generoso", "altruista", "caritatevole", "magnanimo", "benevolo", "compassionevole",
  
  // Crescita e sviluppo
  "crescente", "fiorente", "prosperoso", "rigoglioso", "fertile", "produttivo", "promettente",
  "emergente", "ascendente", "progressivo", "evolutivo", "innovativo", "pionieristico",
  "all'avanguardia", "rivoluzionario", "trasformativo", "migliorativo", "costruttivo",
  
  // Bellezza e armonia
  "bello", "bellissimo", "stupendo", "meraviglioso", "magnifico", "splendido", "radioso",
  "luminoso", "brillante", "scintillante", "raggiante", "affascinante", "attraente",
  "elegante", "raffinato", "grazioso", "delicato", "armonioso", "proporzionato",
  
  // Forza e resilienza
  "forte", "potente", "robusto", "resistente", "tenace", "persistente", "determinato",
  "risoluto", "deciso", "fermo", "saldo", "stabile", "sicuro", "affidabile", "solido",
  
  // Pace e serenità
  "pacifico", "sereno", "tranquillo", "quieto", "placido", "calmo", "rilassato", "disteso",
  "riposato", "equilibrato", "armonioso", "bilanciato", "moderato", "misurato",
  
  // Salute e vitalità
  "sano", "vitale", "energico", "vigoroso", "vivace", "dinamico", "attivo", "reattivo",
  "scattante", "agile", "atletico", "robusto", "resistente", "forte", "vigoroso",
  
  // Successo professionale
  "professionale", "competente", "qualificato", "esperto", "specializzato", "preparato",
  "formato", "addestrato", "istruito", "educato", "colto", "erudito", "sapiente",
  
  // Prosperità economica
  "ricco", "benestante", "prospero", "abbiente", "facoltoso", "agiato", "opulento",
  "florido", "redditizio", "remunerativo", "lucrativo", "profittevole", "vantaggioso",
  
  // Qualità sociali
  "socievole", "amichevole", "cordiale", "affabile", "gioviale", "estroverso", "comunicativo",
  "aperto", "disponibile", "accogliente", "ospitale", "inclusivo", "integrativo"
]);

export const negativeWordsIT = new Set([
  // Emozioni negative
  "triste", "infelice", "depresso", "angosciato", "disperato", "afflitto", "addolorato",
  "sconsolato", "abbattuto", "demoralizzato", "sconfortato", "melanconico", "cupo",
  "tetro", "lugubre", "funesto", "desolato", "sconvolto", "turbato", "agitato",
  
  // Rabbia e ostilità
  "arrabbiato", "furioso", "irato", "adirato", "indignato", "irritato", "esasperato",
  "infuriato", "rabbioso", "collerico", "aggressivo", "violento", "ostile", "bellicoso",
  "minaccioso", "intimidatorio", "provocatorio", "antagonista", "conflittuale",
  
  // Paura e ansia
  "spaventato", "terrorizzato", "impaurito", "intimorito", "ansioso", "preoccupato",
  "angosciato", "allarmato", "inquieto", "agitato", "nervoso", "teso", "stressato",
  "turbato", "scosso", "traumatizzato", "paralizzato", "pietrificato",
  
  // Disgusto e repulsione
  "disgustato", "nauseato", "ripugnante", "rivoltante", "repellente", "ributtante",
  "stomachevole", "raccapricciante", "ripugnante", "schifoso", "fetido", "putrido",
  "marcio", "deteriorato", "guasto", "avariato", "corrotto", "contaminato",
  
  // Debolezza e vulnerabilità
  "debole", "fragile", "vulnerabile", "indifeso", "inerme", "impotente", "incapace",
  "inadeguato", "insufficiente", "incompetente", "inetto", "maldestro", "goffo",
  "impacciato", "insicuro", "esitante", "titubante", "incerto",
  
  // Fallimento e sconfitta
  "fallito", "sconfitto", "perdente", "battuto", "vinto", "superato", "surclassato",
  "umiliato", "mortificato", "degradato", "declassato", "retrocesso", "declino",
  "decaduto", "rovinato", "distrutto", "annientato", "devastato",
  
  // Malattia e sofferenza
  "malato", "sofferente", "dolorante", "agonizzante", "morente", "moribondo", "infermo",
  "invalido", "disabile", "menomato", "handicappato", "deforme", "storpio", "mutilato",
  "ferito", "lesionato", "traumatizzato", "contuso",
  
  // Povertà e privazione
  "povero", "indigente", "misero", "bisognoso", "nullatenente", "squattrinato",
  "indebitato", "rovinato", "fallito", "dissestato", "impoverito", "deprivato",
  "privato", "spogliato", "derubato", "defraudato", "truffato", "imbrogliato",
  
  // Isolamento sociale
  "solo", "solitario", "isolato", "abbandonato", "reietto", "emarginato", "escluso",
  "alienato", "estraniato", "respinto", "rifiutato", "ignorato", "trascurato",
  "dimenticato", "negletto", "evitato", "schivato", "ostracizzato",
  
  // Comportamenti negativi
  "cattivo", "malvagio", "crudele", "spietato", "sadico", "perfido", "maligno",
  "malizioso", "subdolo", "infido", "sleale", "traditore", "ingannatore", "bugiardo",
  "mentitore", "imbroglione", "truffatore", "manipolatore",
  
  // Caratteristiche morali negative
  "disonesto", "corrotto", "immorale", "amorale", "depravato", "perverso", "vizioso",
  "dissoluto", "libertino", "licenzioso", "indecente", "osceno", "volgare", "triviale",
  "grossolano", "rozzo", "vile", "ignobile",
  
  // Inefficienza e incompetenza
  "inefficiente", "incompetente", "incapace", "inabile", "inadatto", "inadeguato",
  "impreparato", "inesperto", "principiante", "dilettante", "approssimativo",
  "superficiale", "negligente", "trascurato", "disattento", "sbadato", "distratto",
  
  // Conflitto e violenza
  "violento", "aggressivo", "brutale", "selvaggio", "feroce", "bestiale", "barbaro",
  "sanguinario", "sanguinolento", "cruento", "bellicoso", "guerrafondaio",
  "combattivo", "litigioso", "rissoso", "provocatorio", "minaccioso",
  
  // Instabilità e caos
  "instabile", "precario", "volatile", "mutevole", "incostante", "variabile",
  "fluttuante", "oscillante", "altalenante", "irregolare", "disordinato", "caotico",
  "confuso", "disorganizzato", "dispersivo", "frammentario", "discontinuo"
]);