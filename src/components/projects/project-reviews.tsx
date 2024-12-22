import React from "react";
import { ProjectReviewsSection } from "./project-reviews-section";
import { getProjectReviews } from "@/modules/projects/reviews";
import { Project, ProjectReview } from "@/types";

export const ProjectReviews: React.FC<{
  project: Project;
}> = async ({ project }) => {
  const reviews = await getProjectReviews({
    projectId: project.id,
    slug: project.slug,
  });

  return (
    <div className="w-full h-full p-4">
      <ProjectReviewsSection
        slug={project.slug}
        projectId={project.id}
        reviews={reviews as unknown as ProjectReview[]}
      />
    </div>
  );
};
