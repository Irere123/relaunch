"use client";

import { Card, AreaChart, Title } from "@tremor/react";

export function ProjectAnalyticsClient() {
  // Sample data - replace with your actual data
  const chartdata = [
    {
      date: "Jan 22",
      Views: 2890,
    },
    // Add more data points...
  ];

  return (
    <Card className="mt-4">
      <Title>Project Analytics</Title>
      <AreaChart
        className="h-72 mt-4"
        data={chartdata}
        index="date"
        categories={["Views"]}
        colors={["blue"]}
      />
    </Card>
  );
}
