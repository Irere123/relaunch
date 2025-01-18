"use client";

import useSWR from "swr";
import { useContext } from "react";

import { DashboardContext } from "./dashboard-provider";
import { AreaChart } from "../ui/area-chart";
import { BarList } from "../ui/bar-list";
import { ProjectStatsLoading } from "./project-stats-loading";

const dataFormatter = (num: number) =>
  `${Intl.NumberFormat("us").format(num).toString()}`;

export function ProjectStats() {
  const { projects, selectedProjectIndex: idx } = useContext(DashboardContext);
  const currentProject = projects[idx];

  const { data: analyticsData, isLoading: analyticsLoading } = useSWR(
    `/api/analytics/visits?projectId=${currentProject?.id}`
  );

  const { data: reviewStats, isLoading: reviewsLoading } = useSWR(
    `/api/projects/${currentProject?.id}/reviews/stats`
  );

  const { data: countryStats, isLoading: countriesLoading } = useSWR(
    `/api/analytics/countries?projectId=${currentProject?.id}`
  );

  if (analyticsLoading || reviewsLoading || countriesLoading) {
    return <ProjectStatsLoading />;
  }

  const reviewData =
    reviewStats?.weekly.map((item: any) => ({
      name: item.date,
      value: item.count,
    })) || [];

  const countryData =
    countryStats?.countries.map((item: any) => ({
      name: item.country,
      value: item.visits,
      icon: (
        <img
          src={`https://flagcdn.com/w40/${item.country.toLowerCase()}.png`}
          className="h-3 w-5 rounded-sm"
          alt={item.country}
        />
      ),
    })) || [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Performance Overview
        </h2>
        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-[0_1px_3px_0_rgba(0,0,0,0.08)]">
          <AreaChart
            className="h-72"
            data={analyticsData?.visits || []}
            index="date"
            categories={["Visitors", "Reviews"]}
            colors={["blue", "emerald"]}
            valueFormatter={dataFormatter}
            showLegend={true}
            showGridLines={false}
            showXAxis={true}
            showYAxis={true}
            yAxisWidth={65}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Review Activity
          </h2>
          <div className="rounded-lg border border-gray-200 bg-white p-5 shadow">
            <BarList data={reviewData} valueFormatter={dataFormatter} />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Geographic Reach
          </h2>
          <div className="rounded-lg border border-gray-200 bg-white p-5 shadow">
            <BarList data={countryData} valueFormatter={dataFormatter} />
          </div>
        </div>
      </div>
    </div>
  );
}
