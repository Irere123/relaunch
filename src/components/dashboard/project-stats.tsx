"use client";

import useSWR from "swr";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useContext, useEffect } from "react";
import { DashboardContext } from "./dashboard-provider";

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
  },
} satisfies ChartConfig;

export function ProjectStats() {
  const { projects, selectedProjectIndex: idx } = useContext(DashboardContext);

  const { data, isLoading } = useSWR(
    `/api/analytics/visits?projectId=${projects[idx].id}&slug=${projects[idx].slug}`,
    {
      refreshInterval: 0,
    }
  );

  if (isLoading) {
    return null;
  }

  console.log(data);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Page visits</CardTitle>
          <CardDescription>Page visits in the last 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={data.visits}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Line dataKey="total" type="linear" strokeWidth={2} dot={false} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <div className="grid md:grid-cols-2 grid-cols-1 mt-6 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>REVIEWS</CardTitle>
            <CardDescription>Total in the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart
                accessibilityLayer
                data={chartData}
                layout="vertical"
                margin={{
                  right: 16,
                }}
              >
                <CartesianGrid horizontal={false} />
                <YAxis
                  dataKey="month"
                  type="category"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                  hide
                />
                <XAxis dataKey="desktop" type="number" hide />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Bar
                  dataKey="desktop"
                  layout="vertical"
                  fill="var(--color-desktop)"
                  radius={4}
                >
                  <LabelList
                    dataKey="month"
                    position="insideLeft"
                    offset={8}
                    className="fill-[--color-label]"
                    fontSize={12}
                  />
                  <LabelList
                    dataKey="desktop"
                    position="right"
                    offset={8}
                    className="fill-foreground"
                    fontSize={12}
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>TOTAL BY COUNTRY</CardTitle>
            <CardDescription>Top ten country visits</CardDescription>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </div>
    </div>
  );
}
