"use server";

import { Project } from "@/types";
import { editTeamSchema, FormResponse } from "./utils";
import { authProject } from "./auth";
import { db } from "@/db";
import { projectTeam } from "@/db/schema";
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

    const existingTeam = await db
      .select()
      .from(projectTeam)
      .where(eq(projectTeam.projectId, projectId));

    const existingUserIds = existingTeam.map((member) => member.userId);
    const newUserIds = users.map((user) => user.id);

    const usersToRemove = existingUserIds.filter(
      (id) => id !== null && !newUserIds.includes(id)
    );

    const usersToAdd = newUserIds.filter(
      (id) => id !== null && !existingUserIds.includes(id)
    );

    await Promise.all([
      usersToRemove.length > 0
        ? db
            .delete(projectTeam)
            .where(
              and(
                eq(projectTeam.projectId, projectId),
                inArray(
                  projectTeam.userId,
                  usersToRemove.filter(Boolean) as string[]
                )
              )
            )
        : Promise.resolve(),

      ...usersToAdd.map((userId) =>
        db.insert(projectTeam).values({
          projectId,
          userId,
        })
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
