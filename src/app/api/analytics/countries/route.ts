import { NextResponse } from "next/server";
import { auth } from "@/modules/auth";
import { db } from "@/db";
import { eq, sql } from "drizzle-orm";
import { analytics } from "@/db/schema";

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

    const countryData = await db
      .select({
        country: analytics.country,
        visits: sql<number>`count(*)`,
      })
      .from(analytics)
      .where(eq(analytics.projectId, projectId))
      .groupBy(analytics.country)
      .orderBy(sql`count(*) DESC`)
      .limit(10);

    // Handle null countries and format data
    const countries = countryData.map((item) => ({
      country: item.country || "Unknown",
      visits: item.visits,
    }));

    return NextResponse.json({ countries });
  } catch (error) {
    console.error("Error fetching country stats:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
