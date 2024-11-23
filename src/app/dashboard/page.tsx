import { ProjectClicksChart } from "@/components/dashboard/project-clicks-chart";
import { ProjectSelect } from "@/components/dashboard/project-select";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  return (
    <div className="space-y-4">
      <ProjectSelect />
      <ProjectClicksChart />
    </div>
  );
}
