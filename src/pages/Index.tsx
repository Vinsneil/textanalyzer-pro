import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import TextStats from "@/components/TextStats";
import KeywordsAnalysis from "@/components/KeywordsAnalysis";
import SentimentAnalysis from "@/components/SentimentAnalysis";
import { analyzeText } from "@/utils/textAnalysis";
import { toast } from "sonner";

const Index = () => {
  const [text, setText] = useState("");
  const [analysis, setAnalysis] = useState<any>(null);

  const handleAnalyze = () => {
    if (text.trim().length < 10) {
      toast.error("Inserisci almeno 10 caratteri di testo");
      return;
    }
    
    const results = analyzeText(text);
    setAnalysis(results);
    toast.success("Analisi completata!");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-heading font-bold text-secondary mb-8">
          Analisi del Testo
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6">
            <h2 className="text-xl font-heading font-semibold mb-4">
              Inserisci il testo da analizzare
            </h2>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Incolla qui il tuo testo..."
              className="min-h-[300px] mb-4"
            />
            <Button onClick={handleAnalyze} className="w-full">
              Analizza
            </Button>
          </Card>

          {analysis && (
            <div className="space-y-8">
              <TextStats stats={analysis.basicStats} />
              <KeywordsAnalysis
                keywords={analysis.keywords}
                bigrams={analysis.bigrams}
                trigrams={analysis.trigrams}
                adjectives={analysis.adjectives}
              />
              <SentimentAnalysis
                overall={analysis.sentiment.overall}
                sentences={analysis.sentiment.sentences}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;