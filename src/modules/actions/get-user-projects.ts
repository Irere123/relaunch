import { eq } from "drizzle-orm";

import { db } from "@/db";
import { Project, projects } from "@/db/schema";

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
