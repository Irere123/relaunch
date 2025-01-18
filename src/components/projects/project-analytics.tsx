import { Suspense } from "react";
import { LoadingSpinner } from "../icons";
import { ProjectAnalyticsClient } from "./project-analytics-client";

export function ProjectAnalytics({ projectId }: { projectId: string }) {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ProjectAnalyticsRSC projectId={projectId} />
    </Suspense>
  );
}

async function ProjectAnalyticsRSC({ projectId }: { projectId: string }) {
  return <ProjectAnalyticsClient projectId={projectId} />;
}
