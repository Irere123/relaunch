import { and, eq, sql } from "drizzle-orm";

import { db } from "@/db";
import { analytics, projects } from "@/db/schema";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const projectId = url.searchParams.get("projectId");
  const slug = url.searchParams.get("slug");

  if (!slug || !projectId) {
    return Response.json({ visits: [] });
  }

  let visits;

  try {
    visits = await db
      .select({
        day: sql<number>`CAST(strftime('%d', date) AS INTEGER)`,
        month: sql<number>`CAST(strftime('%m', date) AS INTEGER)`,
        year: sql<number>`CAST(strftime('%Y', date) AS INTEGER)`,
        total: sql<number>`COUNT(*)`.as("total"),
      })
      .from(analytics)
      .where(
        and(
          eq(analytics.projectId, projects.id),
          sql`date >= date('now', '-30 days')`
        )
      )
      .groupBy(
        sql`strftime('%d', date)`,
        sql`strftime('%m', date)`,
        sql`strftime('%Y', date)`
      )
      .orderBy(sql`year ASC`, sql`month ASC`, sql`day ASC`);
  } catch (error) {
    console.log(error);
    return Response.json({ visits: [] });
  }

  return Response.json({ visits });
}
