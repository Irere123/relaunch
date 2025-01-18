import React from "react";
import { ProjectReviewsSection } from "./project-reviews-section";
import { Project } from "@/types";

export const ProjectReviews: React.FC<{
  project: Project;
}> = async ({ project }) => {
  return (
    <div className="flex items-start w-full h-full p-4">
      <ProjectReviewsSection slug={project.slug} projectId={project.id} />
    </div>
  );
};
