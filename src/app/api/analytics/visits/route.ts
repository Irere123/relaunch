import { NextResponse } from "next/server";
import { auth } from "@/modules/auth";
import { db } from "@/db";
import { and, eq, sql } from "drizzle-orm";
import { analytics, projectReviews } from "@/db/schema";

const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

export async function GET(request: Request) {
  try {
    const session = await auth();
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get("projectId");

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!projectId) {
      return new NextResponse("Project ID is required", { status: 400 });
    }

    // Get the last 30 days of visits
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const thirtyDaysAgoTimestamp = thirtyDaysAgo.getTime();

    // Get visits data
    const visitData = await db
      .select({
        date: analytics.date,
        visits: sql<number>`count(*)`,
      })
      .from(analytics)
      .where(
        and(
          eq(analytics.projectId, projectId),
          sql`${analytics.date} >= ${thirtyDaysAgoTimestamp}`
        )
      )
      .groupBy(analytics.date);

    // Get reviews data
    const reviewData = await db
      .select({
        date: projectReviews.createdAt,
        reviews: sql<number>`count(*)`,
      })
      .from(projectReviews)
      .where(
        and(
          eq(projectReviews.projectId, projectId),
          sql`${projectReviews.createdAt} >= ${thirtyDaysAgoTimestamp}`
        )
      )
      .groupBy(projectReviews.createdAt);

    // Combine and format data
    const allDates = [];
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const isoDate = date.toISOString().split("T")[0];

      // Find visit count for this date
      const visitForDate = visitData.find((v) => {
        if (!v.date) return false;
        return new Date(v.date).toISOString().split("T")[0] === isoDate;
      });

      // Find review count for this date
      const reviewForDate = reviewData.find((r) => {
        if (!r.date) return false;
        return new Date(r.date).toISOString().split("T")[0] === isoDate;
      });

      allDates.push({
        date: formatDate(date),
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
