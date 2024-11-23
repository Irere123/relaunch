import { notFound } from "next/navigation";

import { ProjectAnalytics } from "@/components/projects/project-analytics";
import { ProjectReviews } from "@/components/projects/project-reviews";
import { ProjectTeam } from "@/components/projects/project-team";
import { getProject } from "@/modules/actions";

export async function generateStaticParams() {
  return [
    {
      tab: [], // for the root page
    },
  ];
}

export default async function ProjectPage(props: {
  params: Promise<{ slug: string; tab?: string[] }>;
}) {
  const params = await props.params;

  const { slug, tab } = params;

  const project = await getProject({ slug });

  if (!project) {
    notFound();
  }

  if (tab?.[0] === "team") {
    return <ProjectTeam project={project} />;
  }

  if (tab?.[0] === "reviews") {
    return <ProjectReviews />;
  }

  return <ProjectAnalytics />;
}
