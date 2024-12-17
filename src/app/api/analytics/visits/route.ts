import { and, asc, eq, sql } from "drizzle-orm";

import { db } from "@/db";
import { analytics, projects } from "@/db/schema";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const projectId = url.searchParams.get("projectId");
  const slug = url.searchParams.get("slug");

  console.log(projectId);
  console.log(slug);

  if (!slug || !projectId) {
    return Response.json({ visits: [] });
  }

  let visits;

  try {
    visits = await db
      .select({
        day: sql<number>`CAST(strftime('%d', ${analytics.date}) AS INTEGER)`,
        month: sql<number>`CAST(strftime('%m', ${analytics.date}) AS INTEGER)`,
        year: sql<number>`CAST(strftime('%Y', ${analytics.date}) AS INTEGER)`,
        total: sql<number>`COUNT(*)`.as("total"),
      })
      .from(analytics)
      .innerJoin(projects, eq(analytics.projectId, projects.id))
      .where(
        and(
          eq(projects.id, projectId),
          eq(projects.slug, slug),
          sql`${analytics.date} >= date('now', '-30 days')`
        )
      )
      .groupBy(
        sql`strftime('%d', ${analytics.date})`,
        sql`strftime('%m', ${analytics.date})`,
        sql`strftime('%Y', ${analytics.date})`
      )
      .orderBy(asc(analytics.date));
  } catch (error) {
    console.log(error);
    return Response.json({ visits: [] });
  }

  return Response.json({ visits });
}
