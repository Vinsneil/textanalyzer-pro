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
    const mainTopics = words
      .filter(word => word.length > 4)
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
    
    let complexity = "semplice";
    if (averageLength > 100) complexity = "molto articolato";
    else if (averageLength > 50) complexity = "articolato";
    
    return `Il testo analizza principalmente ${topics.slice(0, 3).join(", ")}${
      topics.length > 3 ? ` e ${topics.slice(3).join(", ")}` : ""
    }. L'analisi rivela un tono ${sentiment} e uno stile ${complexity}. ${
      sentences.length > 1 
        ? `Il contenuto è strutturato in ${sentences.length} frasi` 
        : "Il contenuto è espresso in una singola frase"
    }.`.slice(0, 300);
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