import { db } from "@/db";
import { projectReviews, users } from "@/db/schema";
import { and, desc, eq, like } from "drizzle-orm";
import { NextResponse } from "next/server";

const PAGE_SIZE = 10;

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "0");
    const search = searchParams.get("search") || "";

    const query = db
      .select({
        id: projectReviews.id,
        content: projectReviews.content,
        createdAt: projectReviews.createdAt,
        updatedAt: projectReviews.updatedAt,
        projectId: projectReviews.projectId,
        userId: projectReviews.userId,
        user: {
          id: users.id,
          name: users.name,
          image: users.image,
          emailVerified: users.emailVerified,
        },
      })
      .from(projectReviews)
      .leftJoin(users, eq(projectReviews.userId, users.id))
      .where(
        and(
          eq(projectReviews.projectId, params.id),
          search ? like(projectReviews.content, `%${search}%`) : undefined
        )
      )
      .orderBy(desc(projectReviews.createdAt))
      .limit(PAGE_SIZE)
      .offset(page * PAGE_SIZE);

    const reviews = await query;

    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return new NextResponse("Error fetching reviews", { status: 500 });
  }
}
