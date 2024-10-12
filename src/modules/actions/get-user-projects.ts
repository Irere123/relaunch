import { eq, or } from "drizzle-orm";
import { cache } from "react";

import { db } from "@/db";
import { links, Project, projects, users } from "@/db/schema";

export const getUserProjects = async ({
  userId,
}: {
  userId: string;
}): Promise<Project[] | null> => {
  const result = await db
    .select()
    .from(projects)
    .where(eq(projects.userId, userId));

  if (!result) return null;

  return result;
};
