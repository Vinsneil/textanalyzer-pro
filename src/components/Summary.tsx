import { Card } from "@/components/ui/card";

interface SummaryProps {
  text: string;
  sentiment: {
    positive: number;
    negative: number;
    neutral: number;
  };
}

const Summary = ({ text, sentiment }: SummaryProps) => {
  const getSentimentDescription = () => {
    const max = Math.max(sentiment.positive, sentiment.negative, sentiment.neutral);
    if (max === sentiment.positive) {
      if (sentiment.positive > 0.7) return "decisamente positivo";
      return "tendenzialmente positivo";
    }
    if (max === sentiment.negative) {
      if (sentiment.negative > 0.7) return "decisamente negativo";
      return "tendenzialmente negativo";
    }
    return "prevalentemente neutro";
  };

  const getMainTopics = () => {
    const words = text.split(/\s+/);
    const stopWords = new Set(['il', 'lo', 'la', 'i', 'gli', 'le', 'un', 'uno', 'una',
      'e', 'ed', 'o', 'ma', 'se', 'perché', 'che', 'chi', 'cui', 'non', 'né',
      'per', 'tra', 'fra', 'con', 'su', 'da', 'dal', 'dello', 'della', 'dei', 'degli',
      'delle', 'nel', 'nella', 'nei', 'negli', 'nelle', 'sul', 'sulla', 'sui', 'sugli',
      'sulle', 'questo', 'questa', 'questi', 'queste', 'quello', 'quella', 'quelli',
      'quelle', 'come', 'dove', 'quando', 'quanto', 'quale', 'quali', 'essere', 'avere',
      'fare', 'dire', 'del', 'al', 'dal', 'in', 'con', 'su', 'per', 'tra', 'fra']);

    const mainTopics = words
      .filter(word => {
        const cleanWord = word.toLowerCase().replace(/[.,!?;:'"]/g, '');
        return cleanWord.length > 4 && !stopWords.has(cleanWord);
      })
      .reduce((acc: { [key: string]: number }, word) => {
        const cleanWord = word.toLowerCase().replace(/[.,!?;:'"]/g, '');
        if (cleanWord.length > 4) {
          acc[cleanWord] = (acc[cleanWord] || 0) + 1;
        }
        return acc;
      }, {});

    return Object.entries(mainTopics)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([word]) => word);
  };

  const generateSummary = () => {
    const topics = getMainTopics();
    const sentiment = getSentimentDescription();
    const sentences = text.split(/[.!?]+/).filter(s => s.trim());
    const averageLength = sentences.reduce((acc, s) => acc + s.trim().length, 0) / sentences.length;
    
    let complexity = "semplice e diretto";
    if (averageLength > 100) complexity = "molto articolato e complesso";
    else if (averageLength > 50) complexity = "moderatamente articolato";
    
    const topicsDescription = topics.length > 0
      ? `Il testo tratta principalmente di ${topics.slice(0, -1).join(", ")}${
          topics.length > 1 ? ` e ${topics[topics.length - 1]}` : ""
        }`
      : "Il testo non presenta argomenti chiaramente identificabili";

    const structureDescription = sentences.length > 1
      ? `Si sviluppa attraverso ${sentences.length} frasi`
      : "È composto da una singola frase";

    return `${topicsDescription}. ${structureDescription} con uno stile ${complexity} e un tono ${sentiment}. ${
      averageLength > 80
        ? "La struttura del testo è elaborata e richiede un'attenta lettura."
        : "La struttura del testo risulta facilmente comprensibile."
    }`.trim();
  };

  return (
    <Card className="p-6 mb-8">
      <h2 className="text-xl font-heading font-semibold mb-4">
        In breve
      </h2>
      <p className="text-sm text-gray-600 leading-relaxed">
        {generateSummary()}
      </p>
    </Card>
  );
};

export default Summary;