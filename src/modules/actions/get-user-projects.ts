import { eq } from "drizzle-orm";

import { db } from "@/db";
import { projects } from "@/db/schema";
import { Project } from "@/types";

export const getUserProjects = async ({
  userId,
}: {
  userId: string;
}): Promise<Project[]> => {
  const result = (await db.query.projects.findMany({
    where: eq(projects.userId, userId),
  })) as any;

  return result;
};
