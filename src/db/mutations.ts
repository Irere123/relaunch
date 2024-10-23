import { eq, sql } from "drizzle-orm";

import { db } from "@/db";
import { projects } from "@/db/schema";

export async function incrementClicks(id: string) {
  await db
    .update(projects)
    .set({ clicks: sql`${projects.clicks} + 1` })
    .where(eq(projects.id, id));
}
