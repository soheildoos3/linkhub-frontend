"use client";

import { LinkItem } from "@/types/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

interface LinkChartProps {
  links: LinkItem[];
}

export function LinkChart({ links }: LinkChartProps) {
  const sortedLinks = [...links].sort((a, b) => (b.clicks || 0) - (a.clicks || 0));
  
  const data = sortedLinks.map((link) => ({
    name: link.title.length > 12 ? link.title.slice(0, 12) + "..." : link.title,
    بازدید: link.clicks || 0,
  }));

  const chartConfig = {
    بازدید: {
      label: "تعداد بازدید",
      color: "#8b5cf6",
    },
  };

  if (links.length === 0) {
    return (
      <Card className="dark:border-gray-700 dark:bg-gray-800">
        <CardContent className="flex h-64 items-center justify-center">
          <p className="text-muted-foreground dark:text-gray-400">
            هیچ لینکی برای نمایش وجود ندارد
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="dark:border-gray-700 dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="text-foreground dark:text-white">
          آمار بازدید لینک‌ها
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="horizontal"
              margin={{ left: 20, right: 20, top: 20, bottom: 50 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                type="category"
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={60}
                interval={0}
                tick={{ fontSize: 12 }}
                className="text-xs"
              />
              <YAxis type="number" className="text-xs" />
              <Tooltip
                content={({ active, payload }) => (
                  <ChartTooltipContent
                    active={active}
                    payload={payload}
                    className="rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
                  />
                )}
              />
              <Bar
                dataKey="بازدید"
                fill="var(--color-بازدید)"
                radius={[4, 4, 0, 0]}
                barSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}