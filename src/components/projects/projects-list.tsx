import { Suspense } from "react";
import { ProjectsGrid } from "./projects-grid";
import { db } from "@/db";
import { projects } from "@/db/schema";

export default function ProjectsList() {
  return (
    <Suspense fallback={null}>
      <ProjectsListRSC />
    </Suspense>
  );
}

async function ProjectsListRSC() {
  const projectsFromDb = await db.select().from(projects);

  return (
    <div className="py-10">
      <ProjectsGrid projects={projectsFromDb} />
    </div>
  );
}
