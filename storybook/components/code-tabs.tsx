"use client";

import { CodeBlock } from "@/components/code-block";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export type CodeTab = {
  value: string;
  label: string;
  code: string;
  language?: string;
  filename?: string;
};

export function CodeTabs({ tabs }: { tabs: CodeTab[] }) {
  return (
    <Tabs defaultValue={tabs[0]?.value} className="min-w-0 gap-3">
      <TabsList className="bg-muted/60 h-8">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value} className="text-xs">
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="min-w-0">
          <CodeBlock
            code={tab.code}
            language={tab.language}
            filename={tab.filename}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
}
