"use server";

import { Project } from "@/types";
import { editTeamSchema, FormResponse } from "./utils";
import { authProject } from "./auth";
import { db } from "@/db";
import { projects, projectTeam } from "@/db/schema";
import { and, eq, inArray } from "drizzle-orm";
import { ZodError } from "zod";

export async function editTeam(
  users: Project["team"],
  _prevState: any,
  data: FormData
): Promise<FormResponse> {
  try {
    const { projectId } = editTeamSchema.parse({
      projectId: data.get("projectId"),
    });

    await authProject({ projectId });

    await Promise.all([
      db.delete(projectTeam).where(
        inArray(
          projectTeam.userId,
          users.map((user) => user.id)
        )
      ),
      ...Array.from(users).map((user) =>
        db
          .update(projectTeam)
          .set({ userId: user.id })
          .where(
            and(
              eq(projectTeam.userId, user.id),
              eq(projectTeam.projectId, projectId)
            )
          )
      ),
    ]);

    return {
      status: "success",
      message: "Team members updated successfully",
    };
  } catch (error) {
    if (error instanceof ZodError) {
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
      message: (error as Error).message,
    };
  }
}
