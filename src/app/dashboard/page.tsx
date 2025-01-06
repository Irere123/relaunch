"use client";

import { useContext } from "react";

import { ProjectStats } from "@/components/dashboard/project-stats";
import { ProjectSelect } from "@/components/dashboard/project-select";
import { DashboardContext } from "@/components/dashboard/dashboard-provider";

export default async function DashboardPage() {
  const { projects } = useContext(DashboardContext);

  if (!projects.length) {
    return (
      <div>
        <h2>You have no active projects currently</h2>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <title>Dashboard | Relaunch</title>
      <ProjectSelect />
      <ProjectStats />
    </div>
  );
}
