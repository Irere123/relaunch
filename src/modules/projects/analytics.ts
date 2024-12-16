import { db } from "@/db";
import { analytics, projects } from "@/db/schema";
import { and, eq, sql } from "drizzle-orm";

export async function pageVisits({
  projectId,
  slug,
}: {
  projectId: string;
  slug: string;
}) {
  return await db
    .select({
      day: sql<number>`CAST(strftime('%d', analytics.date) AS INTEGER)`,
      month: sql<number>`CAST(strftime('%m', analytics.date) AS INTEGER)`,
      year: sql<number>`CAST(strftime('%Y', analytics.date) AS INTEGER)`,
      total: sql<number>`COUNT(*)`.as("total"),
    })
    .from(analytics)
    .innerJoin(projects, eq(analytics.projectId, projects.id))
    .where(
      and(
        eq(projects.id, projectId),
        eq(projects.slug, slug),
        sql`analytics.date >= date('now', '-30 days')`
      )
    )
    .groupBy(
      sql`strftime('%d', analytics.date)`,
      sql`strftime('%m', analytics.date)`,
      sql`strftime('%Y', analytics.date)`
    )
    .orderBy(sql`year ASC`, sql`month ASC`, sql`day ASC`);
}
