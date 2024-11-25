import { Card } from "@/components/ui/card";

interface TextStatsProps {
  stats: {
    characters: number;
    sentences: number;
  };
}

const TextStats = ({ stats }: TextStatsProps) => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-heading font-semibold mb-4">
        Statistiche di Base
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <p className="text-3xl font-bold text-primary">{stats.characters}</p>
          <p className="text-sm text-gray-600">Battute</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-primary">{stats.sentences}</p>
          <p className="text-sm text-gray-600">Frasi</p>
        </div>
      </div>
    </Card>
  );
};

export default TextStats;