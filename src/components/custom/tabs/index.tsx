import { ReactNode } from "react";
import {
  Tabs as ShadTabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// Define tab item shape
export interface TabItem {
  value: string;
  label: string;
  content: ReactNode;
}

// Define component props
interface Props {
  defaultValue: string;
  items: TabItem[];
}

export default function Tabs({ defaultValue, items }: Props) {
  return (
    <div className="w-full flex-col gap-6">
      <ShadTabs defaultValue={defaultValue} className="w-full">
        {/* Tab Headers */}
        <TabsList className="w-full">
          {items.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="flex-1">
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Tab Content */}
        {items.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            {tab.content}
          </TabsContent>
        ))}
      </ShadTabs>
    </div>
  );
}
