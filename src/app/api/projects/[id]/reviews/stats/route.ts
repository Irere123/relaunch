import { NextResponse } from "next/server";
import { and, eq, sql } from "drizzle-orm";

import { db, projectReviews } from "@/db";

const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Get the last 7 days of reviews
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const sevenDaysAgoTimestamp = sevenDaysAgo.toISOString();

    const reviewData = await db
      .select({
        date: sql`date(${projectReviews.createdAt})`.as("date"),
        count: sql<number>`count(*)`.as("count"),
      })
      .from(projectReviews)
      .where(
        and(
          eq(projectReviews.projectId, params.id),
          sql`date(${projectReviews.createdAt}) >= date(${sevenDaysAgoTimestamp})`
        )
      )
      .groupBy(sql`date(${projectReviews.createdAt})`);

    // Fill in missing dates with zero reviews
    const weekly = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = formatDate(date);
      const dayData = reviewData.find(
        (d) => d.date && formatDate(new Date(d.date.toString())) === dateStr
      );
      weekly.push({
        date: dateStr,
        count: dayData?.count || 0,
      });
    }

    return NextResponse.json({ weekly: weekly.reverse() });
  } catch (error) {
    console.error("Error fetching review stats:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
