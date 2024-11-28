import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ThematicAnalysisProps {
  themes: Array<{
    theme: string;
    count: number;
    sentences: Array<string>;
  }>;
}

const ThematicAnalysis = ({ themes }: ThematicAnalysisProps) => {
  const chartData = themes.map(({ theme, count }) => ({
    name: theme,
    value: count,
  }));

  return (
    <Card className="p-6">
      <h2 className="text-xl font-heading font-semibold mb-4">
        Analisi delle tematiche
      </h2>
      
      <div className="h-[300px] mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8B5CF6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <Accordion type="single" collapsible>
        {themes.map((theme, index) => (
          <AccordionItem key={index} value={`theme-${index}`}>
            <AccordionTrigger>
              {theme.theme} ({theme.count} {theme.count === 1 ? "occorrenza" : "occorrenze"})
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {theme.sentences.map((sentence, idx) => (
                  <div key={idx} className="p-3 bg-muted rounded-lg">
                    <p className="text-sm">{sentence}</p>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Card>
  );
};

export default ThematicAnalysis;