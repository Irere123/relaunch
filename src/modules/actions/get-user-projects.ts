import { eq } from "drizzle-orm";

import { db } from "@/db";
import { Project, projects } from "@/db/schema";

export const getUserProjects = async ({
  userId,
}: {
  userId: string;
}): Promise<Project[]> => {
  const result = await db
    .select()
    .from(projects)
    .where(eq(projects.userId, userId));

  return result;
};
