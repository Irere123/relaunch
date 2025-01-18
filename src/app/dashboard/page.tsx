"use client";

import { useContext } from "react";

import { ProjectStats } from "@/components/dashboard/project-stats";
import { ProjectSelect } from "@/components/dashboard/project-select";
import { DashboardContext } from "@/components/dashboard/dashboard-provider";
import { EmptyProjects } from "@/components/dashboard/empty-projects";

export default function DashboardPage() {
  const { projects } = useContext(DashboardContext);

  if (!projects.length) {
    return <EmptyProjects />;
  }

  return (
    <div className="space-y-4">
      <title>Dashboard | Relaunch</title>
      <ProjectSelect />
      <ProjectStats />
    </div>
  );
}
