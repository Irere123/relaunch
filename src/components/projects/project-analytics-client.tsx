"use client";

import { AreaChart } from "@tremor/react";

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
    <div className="mt-4 w-full h-full">
      <AreaChart
        className="h-72 mt-4"
        data={chartdata}
        index="date"
        categories={["Views"]}
        colors={["blue"]}
      />
    </div>
  );
}
