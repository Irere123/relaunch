import { eq, or } from "drizzle-orm";
import { cache } from "react";

import { db } from "@/db";
import { links, projects } from "@/db/schema";

export const getProject = cache(
  async ({ id, slug }: { slug?: string; id?: string }) => {
    const [result] = await db
      .select()
      .from(projects)
      .where(or(eq(projects.id, id || ""), eq(projects.slug, slug || "")))
      .leftJoin(links, eq(projects.id, links.projectId))
      .limit(1);

    if (!result) return null;

    return { ...result.project, links: result.link };
  }
);
