"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { LinksList } from "./LinksList";
import { LinkChart } from "./LinkChart";
import { LinkItem } from "@/types/link";
import { ListOrdered, BarChart3 } from "lucide-react";

interface DashboardTabsProps {
  links: LinkItem[];
  username: string;
  isLoading: boolean;
  onEdit: (link: LinkItem) => void;
  onDelete: (id: number) => Promise<void>;
  onReorder: (links: LinkItem[]) => void;
}

export function DashboardTabs({
  links,
  username,
  isLoading,
  onEdit,
  onDelete,
  onReorder,
}: DashboardTabsProps) {
  const totalClicks = links.reduce((sum, link) => sum + (link.clicks || 0), 0);

  return (
    <Card className="overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50 shadow-xl dark:from-gray-800 dark:to-gray-900">
      <Tabs defaultValue="list" className="w-full">
        <div className="px-6 pt-4">
          <TabsList className="h-auto gap-2 bg-gray-100 p-1 dark:bg-gray-700/50">
            <TabsTrigger
              value="list"
              className="gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-600 dark:data-[state=active]:text-indigo-400"
            >
              <ListOrdered className="h-4 w-4" />
              لیست لینک‌ها
            </TabsTrigger>
            <TabsTrigger
              value="chart"
              className="gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-600 dark:data-[state=active]:text-indigo-400"
            >
              <BarChart3 className="h-4 w-4" />
              نمودار بازدید
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="list" className="mt-0 p-0">
          <LinksList
            links={links}
            username={username}
            isLoading={isLoading}
            onEdit={onEdit}
            onDelete={onDelete}
            onReorder={onReorder}
          />
        </TabsContent>

        <TabsContent value="chart" className="mt-0 px-4">
          <LinkChart links={links} />
        </TabsContent>
      </Tabs>
    </Card>
  );
}
