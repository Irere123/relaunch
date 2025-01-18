"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { RefreshCcw } from "lucide-react";
import useSWR from "swr";

import { buttonLinkVariants } from "../ui/button-link";
import { LoadingSpinner } from "../icons";
import { AreaChart } from "../ui/area-chart";

const dataFormatter = (num: number) =>
  `${Intl.NumberFormat("us").format(num).toString()}`;

export function ProjectAnalyticsClient({ projectId }: { projectId: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const { data: analyticsData, isLoading } = useSWR(
    `/api/analytics/visits?projectId=${projectId}`
  );

  const refreshData = async () => {
    startTransition(() => {
      router.refresh();
    });
  };

  if (isLoading) {
    return <div className="h-72 w-full animate-pulse bg-gray-50 rounded-lg" />;
  }

  return (
    <div className="w-full">
      <div className="mb-2 flex justify-end">
        <button
          onClick={refreshData}
          disabled={isPending}
          className={buttonLinkVariants({ variant: "secondary" })}
        >
          {isPending ? (
            <LoadingSpinner className="h-4 w-4" />
          ) : (
            <RefreshCcw className="h-4 w-4" />
          )}
        </button>
      </div>
      <div className="p-5">
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
  );
}
