"use server";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { projectReviews } from "@/db/schema";

export async function getProjectReviews({
  slug,
  projectId,
}: {
  slug?: string;
  projectId: string;
}) {
  try {
    const reviews = await db.query.projectReviews.findMany({
      where: eq(projectReviews.projectId, projectId),
      with: { user: true },
    });

    return reviews;
  } catch (error) {
    console.log(error);
    return [];
  }
}
