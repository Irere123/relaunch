import { sql } from "drizzle-orm";

import { db } from "@/db";
import { analytics, projects } from "@/db/schema";

export async function getProjects() {
  const allProjects = await db.select().from(projects);
  return allProjects;
}

export async function getProjectsWithAnalytics() {
  const projectsWithAnalytics = await db
    .select({
      id: projects.id,
      name: projects.name,
      slug: projects.slug,
      userId: projects.userId,
      description: projects.description,
      gradient: projects.gradient,
      likes: projects.likes,
      logo: projects.logo,
      image: projects.image,
      visitors:
        sql<number>`COALESCE(COUNT(DISTINCT ${analytics.id}), 0)`.mapWith(
          Number
        ),
    })
    .from(projects)
    .leftJoin(analytics, sql`${projects.id} = ${analytics.projectId}`)
    .groupBy(projects.id);

  return projectsWithAnalytics;
}
