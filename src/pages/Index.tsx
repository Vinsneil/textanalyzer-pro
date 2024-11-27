import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TextStats from "@/components/TextStats";
import KeywordsAnalysis from "@/components/KeywordsAnalysis";
import SentimentAnalysis from "@/components/SentimentAnalysis";
import Summary from "@/components/Summary";
import { analyzeText } from "@/utils/textAnalysis";
import { toast } from "sonner";
import { fetchTextFromUrl } from "@/utils/urlFetcher";

const Index = () => {
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [analysis, setAnalysis] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = () => {
    if (text.trim().length < 10) {
      toast.error("Inserisci almeno 10 caratteri di testo");
      return;
    }
    
    const results = analyzeText(text);
    setAnalysis(results);
    toast.success("Analisi completata!");
  };

  const handleUrlAnalyze = async () => {
    if (!url.trim()) {
      toast.error("Inserisci un URL valido");
      return;
    }

    try {
      setIsLoading(true);
      const fetchedText = await fetchTextFromUrl(url);
      setText(fetchedText);
      const results = analyzeText(fetchedText);
      setAnalysis(results);
      toast.success("Analisi completata!");
    } catch (error) {
      toast.error("Errore durante l'analisi dell'URL. Verifica che l'URL sia corretto e accessibile.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-heading font-bold text-secondary mb-8">
          Analisi del Testo
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <Card className="p-6">
              <h2 className="text-xl font-heading font-semibold mb-4">
                Inserisci il testo da analizzare
              </h2>
              <Tabs defaultValue="text">
                <TabsList className="mb-4">
                  <TabsTrigger value="text">Testo</TabsTrigger>
                  <TabsTrigger value="url">URL</TabsTrigger>
                </TabsList>
                
                <TabsContent value="text">
                  <Textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Incolla qui il tuo testo..."
                    className="min-h-[300px] mb-4"
                  />
                  <Button onClick={handleAnalyze} className="w-full">
                    Analizza
                  </Button>
                </TabsContent>

                <TabsContent value="url">
                  <div className="space-y-4">
                    <Input
                      type="url"
                      placeholder="Inserisci l'URL della pagina web..."
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                    />
                    <Button 
                      onClick={handleUrlAnalyze} 
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? "Caricamento..." : "Analizza URL"}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
            
            {analysis && (
              <SentimentAnalysis
                overall={analysis.sentiment.overall}
                sentences={analysis.sentiment.sentences}
              />
            )}
          </div>

          {analysis && (
            <div className="space-y-8">
              <Summary 
                text={text}
                sentiment={analysis.sentiment.overall}
              />
              <TextStats stats={analysis.basicStats} />
              <KeywordsAnalysis
                keywords={analysis.keywords}
                bigrams={analysis.bigrams}
                trigrams={analysis.trigrams}
                adjectives={analysis.adjectives}
                properNouns={analysis.properNouns}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;