import { cn } from "@/lib/utils";
import ProjectCard from "./project-card";
import { Project } from "@/types";

export const ProjectsGrid: React.FC<{
  className?: string;
  projects: Project[];
}> = ({ className, projects }) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {projects.map((project: Project | null) => (
        <ProjectCard key={project?.id} {...project!} />
      ))}
    </div>
  );
};
