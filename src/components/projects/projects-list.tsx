import { Suspense } from "react";

import { ProjectsGrid } from "./projects-grid";
import { Project } from "@/types";
import { getProjectsWithAnalytics } from "@/modules/projects/get-projects";

export default function ProjectsList() {
  return (
    <Suspense fallback={null}>
      <ProjectsListRSC />
    </Suspense>
  );
}

async function ProjectsListRSC() {
  const projectsWithVisits = await getProjectsWithAnalytics();

  return (
    <div className="py-10">
      <ProjectsGrid
        projects={
          projectsWithVisits.map((project) => ({
            ...project,
            clicks: project.visitors,
          })) as unknown as Project[]
        }
      />
    </div>
  );
}
