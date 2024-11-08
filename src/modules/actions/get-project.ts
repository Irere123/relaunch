import { eq, or } from "drizzle-orm";
import { cache } from "react";

import { db } from "@/db";
import { links, projects, projectTeam } from "@/db/schema";
import { Link, Project, ProjectContrib } from "@/types";

export const getProject = cache(
  async ({
    id,
    slug,
  }: {
    slug?: string;
    id?: string;
  }): Promise<Project | null> => {
    const [result] = await db
      .select()
      .from(projects)
      .where(or(eq(projects.id, id || ""), eq(projects.slug, slug || "")))
      .leftJoin(links, eq(links.projectId, projects.id))
      .leftJoin(projectTeam, eq(projectTeam.projectId, projects.id))
      .limit(1);

    console.log(result);

    if (!result) return null;

    // const githubLink = result.links.find((link: Link) => link.type == "GITHUB");
    // const websiteLink = result.links.find(
    //   (link: Link) => link.type == "GITHUB"
    // );

    return {
      ...result.project,
      links: result.link as unknown as Link[],
      team: result.project_team as unknown as ProjectContrib[],
      websiteLink: "",
      githubLink: "",
    };
  }
);
