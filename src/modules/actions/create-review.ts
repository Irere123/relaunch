"use server";

import { z, ZodError } from "zod";

import { trim } from "@/utils/trim";
import { createReviewSchema, FormResponse } from "./utils";
import { authUser } from "./auth";
import { projectReviews } from "@/db/schema";
import { db } from "@/db";

export async function createReview(
  _prevState: any,
  data: FormData
): Promise<FormResponse> {
  try {
    const { projectId, content, userId } = createReviewSchema.parse({
      content: data.get("content"),
      projectId: data.get("projectId"),
      userId: data.get("userId"),
    });

    await authUser();

    if (projectId && content && userId) {
      const review = await db
        .insert(projectReviews)
        .values({ content, projectId, userId })
        .returning();

      return {
        status: "success",
        message: "Review added successfully",
        data: review[0],
      };
    }

    return {
      status: "success",
      message: "Review added successfully",
    };
  } catch (error) {
    if (error instanceof ZodError) {
      console.log(error);
      return {
        status: "error",
        message: "Invalid form data",
        errors: error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      };
    }

    return {
      status: "error",
      message: (error as any).message,
    };
  }
}
