import { Card } from "@/components/ui/card";

interface SummaryProps {
  text: string;
  sentiment: {
    positive: number;
    negative: number;
    neutral: number;
  };
}

const Summary = ({ text }: SummaryProps) => {
  const generateSummary = () => {
    const words = text.split(/\s+/);
    const stopWords = new Set(['il', 'lo', 'la', 'i', 'gli', 'le', 'un', 'uno', 'una',
      'e', 'ed', 'o', 'ma', 'se', 'perché', 'che', 'chi', 'cui', 'non', 'né',
      'per', 'tra', 'fra', 'con', 'su', 'da', 'dal', 'dello', 'della', 'dei', 'degli',
      'delle', 'nel', 'nella', 'nei', 'negli', 'nelle', 'sul', 'sulla', 'sui', 'sugli',
      'sulle', 'questo', 'questa', 'questi', 'queste', 'quello', 'quella', 'quelli',
      'quelle', 'come', 'dove', 'quando', 'quanto', 'quale', 'quali']);

    const significantWords = words
      .map(word => word.toLowerCase().replace(/[.,!?;:'"]/g, ''))
      .filter(word => word.length > 3 && !stopWords.has(word))
      .slice(0, 20);

    const summary = significantWords.join(' ');
    return summary.length > 300 ? summary.substring(0, 297) + '...' : summary;
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