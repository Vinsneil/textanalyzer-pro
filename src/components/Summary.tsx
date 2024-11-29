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
    // Dividiamo il testo in frasi
    const sentences = text.split(/[.!?]+/).filter(s => s.trim());
    
    // Rimuoviamo le stopwords e le parole corte
    const stopWords = new Set(['il', 'lo', 'la', 'i', 'gli', 'le', 'un', 'uno', 'una',
      'e', 'ed', 'o', 'ma', 'se', 'perché', 'che', 'chi', 'cui', 'non', 'né',
      'per', 'tra', 'fra', 'con', 'su', 'da', 'dal', 'dello', 'della', 'dei', 'degli',
      'delle', 'nel', 'nella', 'nei', 'negli', 'nelle', 'sul', 'sulla', 'sui', 'sugli',
      'sulle', 'questo', 'questa', 'questi', 'queste', 'quello', 'quella', 'quelli',
      'quelle', 'come', 'dove', 'quando', 'quanto', 'quale', 'quali']);

    // Prendiamo la prima frase come base del riassunto
    let summary = sentences[0]?.trim() || '';

    // Se ci sono altre frasi, aggiungiamo informazioni rilevanti
    if (sentences.length > 1) {
      const significantWords = sentences
        .slice(1)
        .join(' ')
        .split(/\s+/)
        .map(word => word.toLowerCase().replace(/[.,!?;:'"]/g, ''))
        .filter(word => word.length > 3 && !stopWords.has(word))
        .slice(0, 10)
        .join(' ');

      if (significantWords) {
        summary += ` ${significantWords}`;
      }
    }

    // Assicuriamoci che il riassunto non superi i 300 caratteri
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