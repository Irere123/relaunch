import { eq, sql } from "drizzle-orm";

import { db } from "@/db";
import { analytics, projects } from "@/db/schema";
import { Project } from "@/types";

export const getUserProjects = async ({
  userId,
}: {
  userId: string;
}): Promise<Project[]> => {
  const result = (await db
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
      clicks: sql<number>`COALESCE(COUNT(DISTINCT ${analytics.id}), 0)`.mapWith(
        Number
      ),
    })
    .from(projects)
    .where(eq(projects.userId, userId))
    .leftJoin(analytics, sql`${projects.id} = ${analytics.projectId}`)
    .groupBy(projects.id)) as unknown as Project[];

  return result;
};
