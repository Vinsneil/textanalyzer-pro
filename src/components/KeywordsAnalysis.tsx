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
  adjectives: {
    positive: Array<[string, number]>;
    negative: Array<[string, number]>;
    neutral: Array<[string, number]>;
  };
  properNouns: Array<[string, number]>;
}

const KeywordsAnalysis = ({
  keywords,
  bigrams,
  trigrams,
  adjectives,
  properNouns,
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
          <WordList items={keywords || []} />
        </TabsContent>
        <TabsContent value="bigrams">
          <WordList items={bigrams || []} />
        </TabsContent>
        <TabsContent value="trigrams">
          <WordList items={trigrams || []} />
        </TabsContent>
        <TabsContent value="adjectives">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-green-600 mb-2">Positivi</h3>
              <WordList items={adjectives?.positive || []} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-red-600 mb-2">Negativi</h3>
              <WordList items={adjectives?.negative || []} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Neutri</h3>
              <WordList items={adjectives?.neutral || []} />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="properNouns">
          <WordList items={properNouns || []} />
        </TabsContent>
      </Tabs>
    </Card>
  );
};

const WordList = ({ items }: { items: Array<[string, number]> }) => (
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

export default KeywordsAnalysis;