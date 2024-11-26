export const negativeWords = new Set([
  // Base forms
  "abominevole", "abrasivo", "acido", "affannato", "afflitto", "aggressivo", "ambiguo", "angosciante",
  "annoiato", "antipatico", "apatico", "appiccicoso", "approssimativo", "arrabbiato", "arrogante",
  "aspro", "atroce", "attorcigliato", "autoritario", "avvilente", "barbaro", "beffardo", "bizzarro",
  "bleffante", "bramoso", "brusco", "burbero", "calunnioso", "capriccioso", "carnale", "caotico",
  "cattivo", "cinico", "compiaciuto", "confuso", "contraddittorio", "corrotto", "crudele", "cupo",
  "decadente", "deleterio", "demente", "denso", "depresso", "derisorio", "derogatorio", "detestabile",
  "disastroso", "disonesto", "disordinato", "disperato", "disprezzabile", "disubbidiente", "distratto",
  "dubbioso", "duro", "eccentrico", "eccessivo", "effimero", "egocentrico", "egoista", "elegiaco",
  "emetico", "enfatico", "enorme", "entropico", "ermetico", "esagerato", "esclusivo", "esitante",
  "esorbitante", "estenuante", "estraneo", "eversivo", "fastidioso", "fatuo", "feroce", "fiacco",
  "fittizio", "fragile", "frustrante", "fuggente", "furioso", "geloso", "grezzo", "grottesco",
  "grossolano", "grugnente", "guasto", "impaziente", "impietoso", "imprudente", "improvvido",
  "impulsivo", "impuro", "inadeguato", "inaffidabile", "inappropriato", "incompetente", "inconcludente",
  "inconfessabile", "inconsapevole", "incredulo", "incurante", "indecente", "indifferente",
  "indisciplinato", "inefficace", "inefficiente", "inelegante", "inevitabile", "ingiusto", "ingrato",
  "inopportuno", "insolente", "insopportabile", "instabile", "insulso", "insuperabile", "intimidatorio",
  "inutile", "irrispettoso", "irresponsabile", "irritabile", "irritante", "istintivo", "lacrimevole",
  "lasciato", "letale", "licenzioso", "limitato", "lontano", "macabro", "malandato", "maleducato",
  "maledetto", "maligno", "malinconico", "malizioso", "maltrattato", "maniacale", "marginale",
  "marziale", "meccanico", "melenso", "mentale", "misero", "modesto", "mortale", "mortificante",
  "mutevole", "negativo", "nervoso", "noioso", "nostalgico", "obbrobrioso", "obliquo", "obnubilato",
  "odioso", "offensivo", "oneroso", "oppressivo", "ostile", "ovvio", "pessimo", "pesante", "pigro",
  "polemico", "pretenzioso", "prevaricatore", "provvisorio", "pungente", "rabbioso", "rancoroso",
  "ribelle", "ridicolo", "rissoso", "ristretto", "ruvido", "salato", "sciocco", "scomodo", "scorretto",
  "scostante", "scuro", "seccante", "sedizioso", "severo", "sinistro", "soffocante", "solitario",
  "sprezzante", "squallido", "stanco", "superbo", "tetro", "torto",

  // Feminine forms
  "abrasiva", "acida", "affannata", "afflitta", "aggressiva", "ambigua", "annoiata", "antipatica",
  "apatica", "appiccicosa", "approssimativa", "arrabbiata", "aspra", "attorcigliata", "autoritaria",
  "barbara", "beffarda", "bizzarra", "bramosa", "brusca", "burbera", "calunniosa", "capricciosa",
  "caotica", "cattiva", "cinica", "compiaciuta", "confusa", "contraddittoria", "corrotta", "cupa",
  "deleteria", "densa", "depressa", "derisoria", "derogatoria", "disastrosa", "disonesta",
  "disordinata", "disperata", "distratta", "dubbiosa", "dura", "eccentrica", "eccessiva", "effimera",
  "egocentrica", "elegiaca", "emetica", "enfatica", "entropica", "ermetica", "esagerata", "esclusiva",
  "eversiva", "fastidiosa", "fatua", "fiacca", "fittizia", "furiosa", "gelosa", "grezza", "grottesca",
  "grossolana", "guasta", "impietosa", "improvvida", "impulsiva", "impura", "inadeguata",
  "inappropriata", "incredula", "indisciplinata", "ingiusta", "ingrata", "inopportuna", "insulsa",
  "intimidatoria", "istintiva", "lasciata", "licenziosa", "limitata", "lontana", "macabra",
  "malandata", "maleducata", "maledetta", "maligna", "malinconica", "maliziosa", "maltrattata",
  "meccanica", "melensa", "misera", "modesta", "negativa", "nervosa", "noiosa", "nostalgica",
  "obbrobriosa", "obliqua", "obnubilata", "odiosa", "offensiva", "onerosa", "oppressiva", "ovvia",
  "pessima", "pigra", "polemica", "pretenziosa", "prevaricatrice", "provvisoria", "rabbiosa",
  "rancorosa", "ridicola", "rissosa", "ristretta", "ruvida", "salata", "sciocca", "scomoda",
  "scorretta", "scura", "sediziosa", "severa", "sinistra", "solitaria", "squallida", "stanca",
  "superba", "tetra", "torta",

  // Plural forms
  "abominevoli", "abrasivi", "abrasive", "acidi", "acide", "affannati", "affannate", "afflitti",
  "afflitte", "aggressivi", "aggressive", "ambigui", "ambigue", "angoscianti", "annoiati", "annoiate",
  "antipatici", "antipatiche", "apatici", "apatiche", "appiccicosi", "appiccicose", "approssimativi",
  "approssimative", "arrabbiati", "arrabbiate", "arroganti", "aspri", "aspre", "atroci",
  "attorcigliati", "attorcigliate", "autoritari", "autoritarie", "avvilenti", "barbari", "barbare",
  "beffardi", "beffarde", "bizzarri", "bizzarre", "bleffanti", "bramosi", "bramose", "bruschi",
  "brusche", "burberi", "burbere", "calunniosi", "calunniose", "capricciosi", "capricciose",
  "carnali", "caotici", "caotiche", "cattivi", "cattive", "cinici", "ciniche", "compiaciuti",
  "compiaciute", "confusi", "confuse", "contraddittori", "contraddittorie", "corrotti", "corrotte",
  "crudeli", "cupi", "cupe", "decadenti", "deleteri", "deleterie", "dementi", "densi", "dense",
  "depressi", "depresse", "derisori", "derisorie", "derogatori", "derogatorie", "detestabili",
  "disastrosi", "disastrose", "disonesti", "disoneste", "disordinati", "disordinate", "disperati",
  "disperate", "disprezzabili", "disubbidienti", "distratti", "distratte", "dubbiosi", "dubbiose",
  "duri", "dure", "eccentrici", "eccentriche", "eccessivi", "eccessive", "effimeri", "effimere",
  "egocentrici", "egocentriche", "egoisti", "elegiaci", "elegiache", "emetici", "emetiche",
  "enfatici", "enfatiche", "enormi", "entropici", "entropiche", "ermetici", "ermetiche", "esagerati",
  "esagerate", "esclusivi", "esclusive", "esitanti", "esorbitanti", "estenuanti", "estranei",
  "estranee", "eversivi", "eversive", "fastidiosi", "fastidiose", "fatui", "fatue", "feroci",
  "fiacchi", "fiacche", "fittizi", "fittizie", "fragili", "frustranti", "fuggenti", "furiosi",
  "furiose", "gelosi", "gelose", "grezzi", "grezze", "grotteschi", "grottesche", "grossolani",
  "grossolane", "grugnenti", "guasti", "guaste", "impazienti", "impietosi", "impietose", "imprudenti",
  "improvvidi", "improvvide", "impulsivi", "impulsive", "impuri", "impure", "inadeguati", "inadeguate",
  "inaffidabili", "inappropriati", "inappropriate", "incompetenti", "inconcludenti", "inconfessabili",
  "inconsapevoli", "increduli", "incredule", "incuranti", "indecenti", "indifferenti",
  "indisciplinati", "indisciplinate", "inefficaci", "inefficienti", "ineleganti", "inevitabili",
  "ingiusti", "ingiuste", "ingrati", "ingrate", "inopportuni", "inopportune", "insolenti",
  "insopportabili", "instabili", "insulsi", "insulse", "insuperabili", "intimidatori",
  "intimidatorie", "inutili", "irrispettosi", "irrispettose", "irresponsabili", "irritabili",
  "irritanti", "istintivi", "istintive", "lacrimevoli", "lasciati", "lasciate", "letali",
  "licenziosi", "licenziose", "limitati", "limitate", "lontani", "lontane", "macabri", "macabre",
  "malandati", "malandate", "maleducati", "maleducate", "maledetti", "maledette", "maligni",
  "maligne", "malinconici", "malinconiche", "maliziosi", "maliziose", "maltrattati", "maltrattate",
  "maniacali", "marginali", "marziali", "meccanici", "meccaniche", "melensi", "melense", "mentali",
  "miseri", "misere", "modesti", "modeste", "mortali", "mortificanti", "mutevoli", "negativi",
  "negative", "nervosi", "nervose", "noiosi", "noiose", "nostalgici", "nostalgiche", "obbrobriosi",
  "obbrobriose", "obliqui", "oblique", "obnubilati", "obnubilate", "odiosi", "odiose", "offensivi",
  "offensive", "onerosi", "onerose", "oppressivi", "oppressive", "ostili", "ovvi", "ovvie", "pessimi",
  "pessime", "pesanti", "pigri", "pigre", "polemici", "polemiche", "pretenziosi", "pretenziose",
  "prevaricatori", "prevaricatrici", "provvisori", "provvisorie", "pungenti", "rabbiosi", "rabbiose",
  "rancorosi", "rancorose", "ribelli", "ridicoli", "ridicole", "rissosi", "rissose", "ristretti",
  "ristrette", "ruvidi", "ruvide", "salati", "salate", "sciocchi", "sciocche", "scomodi", "scomode",
  "scorretti", "scorrette", "scostanti", "scuri", "scure", "seccanti", "sediziosi", "sediziose",
  "severi", "severe", "sinistri", "sinistre", "soffocanti", "solitari", "solitarie", "sprezzanti",
  "squallidi", "squallide", "stanchi", "stanche", "superbi", "superbe", "tetri", "tetre", "torti",
  "torte"
]);