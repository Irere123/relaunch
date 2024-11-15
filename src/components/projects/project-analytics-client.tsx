"use client";

import { nFormatter } from "@/lib/utils";
import { AreaChart } from "@tremor/react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { buttonLinkVariants } from "../ui/button-link";
import { LoadingSpinner } from "../icons";
import { RefreshCcw } from "lucide-react";

const chartData = [
  {
    date: "Jan 22",
    Views: 2890,
  },
];

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
        className="-ml-4 h-80"
        data={chartData}
        index="start"
        categories={["Views"]}
        colors={["rose", "blue"]}
        valueFormatter={nFormatter}
        yAxisWidth={60}
        startEndOnly={true}
        showAnimation
        onValueChange={(v) => console.log(v)}
      />
    </div>
  );
}
