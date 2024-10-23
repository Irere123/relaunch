"use client";

import { eq } from "drizzle-orm";
import { ZodError } from "zod";

import { db } from "@/db";
import { projects } from "@/db/schema";
import { authProject } from "./auth";
import { editGradientSchema, FormResponse } from "./utils";

export async function editGradient(
  _prevState: any,
  data: FormData
): Promise<FormResponse> {
  try {
    const { gradient, projectId } = editGradientSchema.parse({
      gradient: data.get("gradient"),
      projectId: data.get("projectId"),
    });

    await authProject({ projectId });

    await db
      .update(projects)
      .set({ gradient })
      .where(eq(projects.id, projectId));

    return {
      status: "success",
      message: "Gradient updated successfully",
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
