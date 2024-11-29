import { eq, or } from "drizzle-orm";
import { cache } from "react";

import { db } from "@/db";
import { projects } from "@/db/schema";
import { Link, Project as ExtentedProject, ProjectContrib } from "@/types";

export const getProject = cache(
  async ({
    id,
    slug,
  }: {
    slug?: string;
    id?: string;
  }): Promise<ExtentedProject | null> => {
    const conditions = [];
    if (id) conditions.push(eq(projects.id, id));
    if (slug) conditions.push(eq(projects.slug, slug));

    const project = await db.query.projects.findFirst({
      where: or(...conditions),
      with: { links: true, projectTeam: true },
    });

    if (!project) return null;

    const githubLink = project.links.find((link) => link.type === "GITHUB")!;
    const websiteLink = project.links.find((link) => link.type === "WEBSITE");

    return {
      ...project,
      links: project.links as Link[],
      team: project.projectTeam as unknown as ProjectContrib[],
      websiteLink,
      githubLink,
    };
  }
);
