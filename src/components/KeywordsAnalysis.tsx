import { Card } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

interface KeywordsAnalysisProps {
  keywords: Array<[string, number]>;
  bigrams: Array<[string, number]>;
  trigrams: Array<[string, number]>;
  adjectives: Array<[string, number]>;
  properNouns: Array<[string, number]>;
}

const KeywordsAnalysis = ({
  keywords = [],
  bigrams = [],
  trigrams = [],
  adjectives = [],
  properNouns = [],
}: KeywordsAnalysisProps) => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-heading font-semibold mb-4">
        Analisi delle Parole
      </h2>
      <Tabs defaultValue="keywords">
        <TabsList className="w-full">
          <TabsTrigger value="keywords">Keywords</TabsTrigger>
          <TabsTrigger value="bigrams">Bigrammi</TabsTrigger>
          <TabsTrigger value="trigrams">Trigrammi</TabsTrigger>
          <TabsTrigger value="adjectives">Aggettivi</TabsTrigger>
          <TabsTrigger value="properNouns">Nomi propri</TabsTrigger>
        </TabsList>
        <TabsContent value="keywords">
          <WordList items={keywords} />
        </TabsContent>
        <TabsContent value="bigrams">
          <WordList items={bigrams} />
        </TabsContent>
        <TabsContent value="trigrams">
          <WordList items={trigrams} />
        </TabsContent>
        <TabsContent value="adjectives">
          <WordList items={adjectives} />
        </TabsContent>
        <TabsContent value="properNouns">
          <WordList items={properNouns} />
        </TabsContent>
      </Tabs>
    </Card>
  );
};

const WordList = ({ items = [] }: { items: Array<[string, number]> }) => {
  if (!Array.isArray(items)) {
    return <div className="mt-4">Nessun elemento da visualizzare</div>;
  }

  return (
    <div className="mt-4 max-h-[300px] overflow-y-auto">
      {items.map(([word, count], index) => (
        <div
          key={word}
          className="flex justify-between items-center py-2 border-b last:border-0"
        >
          <span className="text-sm">
            {index + 1}. {word}
          </span>
          <span className="text-sm text-gray-600">{count}</span>
        </div>
      ))}
    </div>
  );
};

export default KeywordsAnalysis;