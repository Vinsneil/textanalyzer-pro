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
  if (!themes || themes.length === 0) {
    return (
      <Card>
        <h2 className="text-xl font-heading font-semibold mb-4">
          Analisi delle tematiche
        </h2>
        <p className="text-muted-foreground">Nessuna tematica rilevata nel testo.</p>
      </Card>
    );
  }

  const chartData = themes.map(({ theme, count }) => ({
    name: theme,
    value: count,
  }));

  return (
    <Card>
      <h2 className="text-xl font-heading font-semibold mb-4">
        Analisi delle tematiche
      </h2>
      
      <div className="h-[400px] w-full mb-6 -ml-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 5, right: 20, left: 180, bottom: 5 }}
          >
            <XAxis type="number" />
            <YAxis
              type="category"
              dataKey="name"
              width={160}
              tick={{ fontSize: 12 }}
            />
            <Tooltip />
            <Bar dataKey="value" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {themes.map((theme, index) => (
          <AccordionItem key={`theme-${index}`} value={`theme-${index}`}>
            <AccordionTrigger className="text-left">
              <span className="flex items-center gap-2">
                {theme.theme} 
                <span className="text-sm text-muted-foreground">
                  ({theme.count} {theme.count === 1 ? "occorrenza" : "occorrenze"})
                </span>
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {theme.sentences.map((sentence, idx) => (
                  <div key={`sentence-${idx}`} className="p-3 bg-muted rounded-lg">
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