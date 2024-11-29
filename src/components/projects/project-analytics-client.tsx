"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { buttonLinkVariants } from "../ui/button-link";
import { LoadingSpinner } from "../icons";
import { RefreshCcw } from "lucide-react";
import { AreaChart } from "../ui/area-chart";

const chartdata = [
  {
    date: "Jan 22",
    Reviews: 12,
    Clicks: 10,
  },
  {
    date: "Feb 22",
    Reviews: 7,
    Clicks: 27,
  },
  {
    date: "Mar 22",
    Reviews: 30,
    Clicks: 11,
  },
  {
    date: "Apr 22",
    Reviews: 20,
    Clicks: 40,
  },
];

const dataFormatter = (num: number) =>
  `${Intl.NumberFormat("us").format(num).toString()}`;

export function ProjectAnalyticsClient() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const refreshData = async () => {
    startTransition(() => {
      router.refresh();
    });
  };

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
      <AreaChart
        className="mt-4 h-72"
        data={chartdata}
        index="date"
        yAxisWidth={65}
        categories={["Clicks", "Reviews"]}
        colors={["fuchsia", "cyan"]}
        valueFormatter={dataFormatter}
      />
    </div>
  );
}
