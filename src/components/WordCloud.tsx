import React from 'react';
import ReactWordcloud from 'react-wordcloud';
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface WordCloudProps {
  keywords: Array<[string, number]>;
  bigrams: Array<[string, number]>;
  trigrams: Array<[string, number]>;
  adjectives: Array<[string, number]>;
  properNouns: Array<[string, number]>;
}

const WordCloud = ({
  keywords,
  bigrams,
  trigrams,
  adjectives,
  properNouns,
}: WordCloudProps) => {
  const [selectedCategory, setSelectedCategory] = React.useState('keywords');

  const getCategoryData = () => {
    const dataMap = {
      keywords,
      bigrams,
      trigrams,
      adjectives,
      properNouns,
    };

    return dataMap[selectedCategory as keyof typeof dataMap]
      .slice(0, 30)
      .map(([text, value]) => ({
        text,
        value,
      }));
  };

  const options = {
    rotations: 2,
    rotationAngles: [-90, 0] as [number, number],
    fontSizes: [20, 60] as [number, number],
    padding: 5,
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-heading font-semibold">Word Cloud (top 30)</h2>
        <Select
          value={selectedCategory}
          onValueChange={setSelectedCategory}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Seleziona categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="keywords">Keywords</SelectItem>
            <SelectItem value="bigrams">Bigrammi</SelectItem>
            <SelectItem value="trigrams">Trigrammi</SelectItem>
            <SelectItem value="adjectives">Aggettivi</SelectItem>
            <SelectItem value="properNouns">Nomi propri</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div style={{ height: '400px', width: '100%' }}>
        <ReactWordcloud
          words={getCategoryData()}
          options={options}
        />
      </div>
    </Card>
  );
};

export default WordCloud;