import { Suspense } from "react";
import { LoadingSpinner } from "../icons";
import { ProjectAnalyticsClient } from "./project-analytics-client";

export function ProjectAnalytics() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ProjectAnalyticsRSC />
    </Suspense>
  );
}

async function ProjectAnalyticsRSC() {
  return <ProjectAnalyticsClient />;
}
