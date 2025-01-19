import { NextResponse } from "next/server";
import { and, eq, sql } from "drizzle-orm";

import { db, analytics, projectReviews } from "@/db";

const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get("projectId");

    if (!projectId) {
      return new NextResponse("Project ID is required", { status: 400 });
    }

    // Get the last 30 days of visits
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const thirtyDaysAgoTimestamp = thirtyDaysAgo.toISOString();

    // Get visits data with unique visitors per day
    const visitData = await db
      .select({
        date: sql`date(${analytics.date})`.as("date"),
        visits: sql<number>`COUNT(DISTINCT ${analytics.id})`.as("visits"),
      })
      .from(analytics)
      .where(
        and(
          eq(analytics.projectId, projectId),
          sql`date(${analytics.date}) >= date(${thirtyDaysAgoTimestamp})`
        )
      )
      .groupBy(sql`date(${analytics.date})`);

    // Get reviews data
    const reviewData = await db
      .select({
        date: sql`date(${projectReviews.createdAt})`.as("date"),
        reviews: sql<number>`count(*)`.as("reviews"),
      })
      .from(projectReviews)
      .where(
        and(
          eq(projectReviews.projectId, projectId),
          sql`date(${projectReviews.createdAt}) >= date(${thirtyDaysAgoTimestamp})`
        )
      )
      .groupBy(sql`date(${projectReviews.createdAt})`);

    // Combine and format data
    const allDates = [];
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = formatDate(date);

      // Find visit count for this date
      const visitForDate = visitData.find(
        (v) => v.date && formatDate(new Date(v.date.toString())) === dateStr
      );

      // Find review count for this date
      const reviewForDate = reviewData.find(
        (r) => r.date && formatDate(new Date(r.date.toString())) === dateStr
      );

      allDates.push({
        date: dateStr,
        Visitors: visitForDate?.visits || 0,
        Reviews: reviewForDate?.reviews || 0,
      });
    }

    return NextResponse.json({ visits: allDates.reverse() });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
