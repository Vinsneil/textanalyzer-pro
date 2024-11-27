export const italianAdjectives = new Set([
  "alto", "basso", "magro", "grasso", "robusto", "snello", "atletico", "muscoloso",
  "longilineo", "corpulento", "minuto", "massiccio", "slanciato", "tarchiato", "gracile", "possente",
  "aggraziato", "sgraziato", "proporzionato", "sproporzionato", "simmetrico", "asimmetrico",
  
  // Caratteristiche del viso
  "bello", "brutto", "attraente", "affascinante", "grazioso", "avvenente", "seducente",
  "armonioso", "regolare", "irregolare", "espressivo", "inespressivo", "marcato", "delicato",
  
  // Capelli
  "biondo", "bruno", "castano", "rosso", "nero", "grigio", "canuto", "calvo",
  "riccio", "liscio", "ondulato", "crespo", "folto", "rado", "setoso", "ispido",
  
  // Età
  "giovane", "vecchio", "maturo", "anziano", "adolescente", "adulto", "senile", "giovanile",
  "precoce", "tardivo", "acerbo", "stagionato", "fresco", "invecchiato", "vissuto",
  
  // Personalità
  "simpatico", "antipatico", "cordiale", "scortese", "amichevole", "ostile", "socievole", "scontroso",
  "estroverso", "introverso", "timido", "sfacciato", "riservato", "espansivo", "discreto", "invadente",
  
  // Intelligenza e capacità
  "intelligente", "stupido", "brillante", "ottuso", "acuto", "perspicace", "geniale", "mediocre",
  "sveglio", "tardo", "intuitivo", "razionale", "logico", "illogico", "analitico", "confuso",
  
  // Stati d'animo
  "felice", "triste", "allegro", "malinconico", "sereno", "ansioso", "tranquillo", "agitato",
  "euforico", "depresso", "entusiasta", "apatico", "ottimista", "pessimista", "fiducioso", "sfiduciato",
  
  // Moralità
  "onesto", "disonesto", "sincero", "bugiardo", "leale", "sleale", "fedele", "infedele",
  "giusto", "ingiusto", "corretto", "scorretto", "integro", "corrotto", "virtuoso", "vizioso",
  
  // Comportamento
  "educato", "maleducato", "gentile", "sgarbato", "cortese", "scortese", "rispettoso", "irrispettoso",
  "paziente", "impaziente", "calmo", "irrequieto", "moderato", "eccessivo", "misurato", "smisurato",
  
  // Abilità e competenze
  "abile", "inabile", "capace", "incapace", "competente", "incompetente", "esperto", "inesperto",
  "preparato", "impreparato", "qualificato", "squalificato", "dotato", "negato", "portato", "inadatto",
  
  // Caratteristiche fisiche oggettive
  "grande", "piccolo", "lungo", "corto", "largo", "stretto", "spesso", "sottile",
  "pesante", "leggero", "denso", "rado", "pieno", "vuoto", "solido", "fragile",
  
  // Temperatura
  "caldo", "freddo", "tiepido", "gelato", "bollente", "fresco", "temperato", "glaciale",
  "torrido", "mite", "rovente", "ghiacciato", "ardente", "algido", "caloroso", "frigido",
  
  // Consistenza
  "duro", "morbido", "rigido", "flessibile", "elastico", "plastico", "compatto", "poroso",
  "liscio", "ruvido", "viscoso", "fluido", "denso", "liquido", "gassoso", "solido",
  
  // Gusto
  "dolce", "amaro", "salato", "aspro", "piccante", "insipido", "saporito", "scipito",
  "gustoso", "disgustoso", "delizioso", "nauseante", "appetitoso", "repellente", "prelibato", "immangiabile",
  
  // Odore
  "profumato", "puzzolente", "fragrante", "fetido", "aromatico", "maleodorante", "inodore", "odoroso",
  "soave", "acre", "delicato", "pungente", "gradevole", "sgradevole", "intenso", "tenue",
  
  // Suono
  "rumoroso", "silenzioso", "sonoro", "muto", "melodioso", "stonato", "armonioso", "disarmonico",
  "acuto", "grave", "forte", "debole", "chiaro", "confuso", "distinto", "indistinto",
  
  // Colore
  "chiaro", "scuro", "brillante", "opaco", "vivace", "spento", "luminoso", "cupo",
  "acceso", "sbiadito", "intenso", "tenue", "saturo", "desaturato", "puro", "mischiato",
  
  // Forma
  "rotondo", "quadrato", "rettangolare", "triangolare", "ovale", "circolare", "sferico", "cubico",
  "cilindrico", "conico", "piramidale", "irregolare", "simmetrico", "asimmetrico", "proporzionato", "sproporzionato",
  
  // Dimensione
  "enorme", "minuscolo", "gigantesco", "microscopico", "colossale", "infinitesimale", "immenso", "minimo",
  "massimo", "medio", "normale", "abnorme", "standard", "fuori misura", "regolare", "irregolare",
  
  // Quantità
  "abbondante", "scarso", "copioso", "insufficiente", "eccessivo", "adeguato", "sovrabbondante", "carente",
  "numeroso", "esiguo", "molto", "poco", "tanto", "quanto", "troppo", "abbastanza",
  
  // Tempo
  "veloce", "lento", "rapido", "graduale", "istantaneo", "progressivo", "improvviso", "pianificato",
  "tempestivo", "tardivo", "puntuale", "ritardato", "anticipato", "posticipato", "simultaneo", "consecutivo",
  
  // Spazio
  "vicino", "lontano", "adiacente", "distante", "prossimo", "remoto", "contiguo", "separato",
  "interno", "esterno", "centrale", "periferico", "anteriore", "posteriore", "laterale", "mediano",
  
  // Stato
  "nuovo", "vecchio", "moderno", "antico", "contemporaneo", "obsoleto", "attuale", "superato",
  "recente", "datato", "fresco", "stantio", "originale", "derivato", "autentico", "falso",
  
  // Qualità
  "buono", "cattivo", "eccellente", "pessimo", "ottimo", "scadente", "superiore", "inferiore",
  "pregiato", "scadente", "raffinato", "grossolano", "fine", "grezzo", "elaborato", "semplice",
  
  // Complessità
  "semplice", "complesso", "facile", "difficile", "elementare", "complicato", "basilare", "articolato",
  "lineare", "intricato", "chiaro", "oscuro", "comprensibile", "incomprensibile", "accessibile", "inaccessibile",
  
  // Utilità
  "utile", "inutile", "pratico", "impraticabile", "funzionale", "disfunzionale", "efficace", "inefficace",
  "vantaggioso", "svantaggioso", "proficuo", "improduttivo", "redditizio", "antieconomico", "conveniente", "sconveniente",
  
  // Importanza
  "importante", "insignificante", "essenziale", "superfluo", "fondamentale", "marginale", "centrale", "periferico",
  "primario", "secondario", "principale", "accessorio", "cruciale", "trascurabile", "vitale", "irrilevante",
  
  // Certezza
  "certo", "incerto", "sicuro", "insicuro", "definito", "indefinito", "determinato", "indeterminato",
  "preciso", "impreciso", "esatto", "inesatto", "accurato", "approssimativo", "puntuale", "vago",
  
  // Stabilità
  "stabile", "instabile", "fermo", "mobile", "fisso", "variabile", "costante", "incostante",
  "permanente", "temporaneo", "duraturo", "effimero", "eterno", "momentaneo", "perpetuo", "transitorio",
  
  // Autenticità
  "vero", "falso", "autentico", "contraffatto", "genuino", "artificiale", "naturale", "sintetico",
  "reale", "fittizio", "originale", "imitato", "legittimo", "illegittimo", "sincero", "insincero",
  
  // Legalità
  "legale", "illegale", "lecito", "illecito", "regolare", "irregolare", "conforme", "difforme",
  "autorizzato", "non autorizzato", "permesso", "vietato", "consentito", "proibito", "ammesso", "escluso",
  
  // Economicità
  "costoso", "economico", "caro", "a buon mercato", "dispendioso", "conveniente", "oneroso", "accessibile",
  "lussuoso", "modesto", "prezioso", "economico", "valido", "invalido", "efficiente", "inefficiente",
  
  // Difficoltà
  "arduo", "agevole", "impegnativo", "semplice", "ostico", "accessibile", "problematico", "scorrevole",
  "faticoso", "riposante", "gravoso", "leggero", "pesante", "lieve", "oneroso", "semplice",
  
  // Piacevolezza
  "piacevole", "spiacevole", "gradevole", "sgradevole", "dilettevole", "tedioso", "divertente", "noioso",
  "interessante", "disinteressante", "attraente", "repellente", "accattivante", "respingente", "invitante", "respingente",
  
  // Sicurezza
  "sicuro", "pericoloso", "affidabile", "inaffidabile", "fidato", "infido", "protetto", "esposto",
  "garantito", "rischioso", "tutelato", "minacciato", "difeso", "indifeso", "salvaguardato", "vulnerabile",
  
  // Nuovi aggettivi
  "indigesto", "sciagurato", "limitato"

  // Adding superlatives
  "bellissimo", "bruttissimo", "altissimo", "bassissimo", "grandissimo",
  "piccolissimo", "lunghissimo", "cortissimo", "larghissimo", "strettissimo",
  "velocissimo", "lentissimo", "fortissimo", "debolissimo", "durissimo",
  "morbidissimo", "caldissimo", "freddissimo", "dolcissimo", "amarissimo",
  "chiarissimo", "scurissimo", "facilissimo", "difficilissimo", "ottimo",
  "pessimo", "massimo", "minimo", "supremo", "infimo", "eccellentissimo",
  "importantissimo", "utilissimo", "inutilissimo", "comodissimo", "scomodissimo",
  "intelligentissimo", "stupidissimo", "simpaticissimo", "antipaticissimo",
  "felicissimo", "tristissimo", "ricchissimo", "poverissimo", "elegantissimo",
  "modernissimo", "antichissimo", "giovinissimo", "vecchissimo", "purissimo",
  "rarissimo", "comunissimo", "specialissimo", "generalissimo", "precisissimo",
  "gravissimo", "leggerissimo", "pesantissimo", "finissimo", "grossissimo",
  "sottilissimo", "spessissimo", "carissimo", "economicissimo", "costosissimo",
  "preziosissimo", "validissimo", "invalidissimo", "efficientissimo", "inefficientissimo",
  "piacevolissimo", "spiacevolissimo", "gustosissimo", "disgustosissimo",
  "profumatissimo", "puzzolentissimo", "rumorosissimo", "silenziosissimo",
  "luminosissimo", "oscurissimo", "coloratissimo", "sbiaditissimo", "vivacissimo",
  "spentissimo", "attivissimo", "passivissimo", "produttivissimo", "improduttivissimo"
]);
