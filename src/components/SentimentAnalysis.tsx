import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface SentimentAnalysisProps {
  overall: {
    positive: number;
    negative: number;
    neutral: number;
  };
  sentences: Array<{
    text: string;
    sentiment: "positive" | "negative" | "neutral";
  }>;
}

const SentimentAnalysis = ({ overall, sentences }: SentimentAnalysisProps) => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-heading font-semibold mb-4">
        Analisi del Sentiment
      </h2>
      
      <div className="flex justify-between mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-500">
            {(overall.positive * 100).toFixed(1)}%
          </div>
          <div className="text-sm text-gray-600">Positivo</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-500">
            {(overall.neutral * 100).toFixed(1)}%
          </div>
          <div className="text-sm text-gray-600">Neutro</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-red-500">
            {(overall.negative * 100).toFixed(1)}%
          </div>
          <div className="text-sm text-gray-600">Negativo</div>
        </div>
      </div>

      <Accordion type="single" collapsible>
        <AccordionItem value="sentences">
          <AccordionTrigger>Analisi per frase</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {sentences.map((sentence, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg ${
                    sentence.sentiment === "positive"
                      ? "bg-green-50"
                      : sentence.sentiment === "negative"
                      ? "bg-red-50"
                      : "bg-gray-50"
                  }`}
                >
                  <p className="text-sm">{sentence.text}</p>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export default SentimentAnalysis;