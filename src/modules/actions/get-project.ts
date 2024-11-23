import { eq, or } from "drizzle-orm";
import { cache } from "react";

import { db } from "@/db";
import {
  links,
  LinkSelect,
  Project,
  projects,
  ProjectTeam,
  projectTeam,
  users,
} from "@/db/schema";
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

    const rows = await db
      .select({
        project: { ...projects },
        link: { ...links },
        project_team: {
          id: users.id,
          name: users.name,
          image: users.image,
        },
      })
      .from(projects)
      .leftJoin(projectTeam, eq(projects.id, projectTeam.projectId)) // Join projectTeam first
      .leftJoin(users, eq(projectTeam.userId, users.id)) // Then join users
      .leftJoin(links, eq(projects.id, links.projectId)) // Finally join links
      .where(or(...conditions)) // Apply conditions
      .limit(1);

    if (rows.length === 0) return null;

    const result = rows.reduce<
      Record<
        string,
        { project: Project; links: LinkSelect[]; projectTeam: any[] }
      >
    >((acc, row) => {
      const project = row.project;
      const link = row.link;
      const teamMember = row.project_team;

      if (!acc[project.id]) {
        acc[project.id] = { project, links: [], projectTeam: [] };
      }

      if (link) {
        acc[project.id].links.push(link);
      }

      if (teamMember) {
        acc[project.id].projectTeam.push(teamMember);
      }
      return acc;
    }, {});

    const projectData = result[Object.keys(result)[0]];

    const githubLink = projectData.links.find(
      (link) => link.type === "GITHUB"
    )!;
    const websiteLink = projectData.links.find(
      (link) => link.type === "WEBSITE"
    );

    return {
      ...(projectData.project as Project),
      links: projectData.links as Link[],
      team: projectData.projectTeam as unknown as ProjectContrib[],
      websiteLink,
      githubLink,
    };
  }
);
