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
    if (max === sentiment.positive) return "prevalentemente positivo";
    if (max === sentiment.negative) return "prevalentemente negativo";
    return "prevalentemente neutro";
  };

  const words = text.split(/\s+/);
  const mainTopics = words
    .filter(word => word.length > 4)
    .reduce((acc: { [key: string]: number }, word) => {
      acc[word.toLowerCase()] = (acc[word.toLowerCase()] || 0) + 1;
      return acc;
    }, {});

  const topTopics = Object.entries(mainTopics)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([word]) => word)
    .join(", ");

  return (
    <Card className="p-6 mb-8">
      <h2 className="text-xl font-heading font-semibold mb-4">
        In breve
      </h2>
      <p className="text-sm text-gray-600">
        Il testo tratta principalmente di {topTopics} con un tono {getSentimentDescription()}.
      </p>
    </Card>
  );
};

export default Summary;