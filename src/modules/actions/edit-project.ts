"use server";

import { ZodError } from "zod";
import { authProject } from "./auth";
import { getProject } from "./get-project";
import { editProjectSchema, FormResponse } from "./utils";
import { db } from "@/db";
import { links, projects } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function editProject(
  _prevState: any,
  data: FormData
): Promise<FormResponse> {
  try {
    const { description, projectId, logo, name, website } =
      editProjectSchema.parse({
        name: data.get("name"),
        description: data.get("description"),
        logo: data.get("logo"),
        website: data.get("website"),
        projectId: data.get("projectId"),
      });

    await authProject({ projectId });

    const props = await getProject({ id: projectId });

    if (
      props?.name !== name ||
      props?.websiteLink !== website ||
      props.description !== description ||
      props.logo !== logo
    ) {
      await db
        .update(projects)
        .set({ name, description, logo })
        .where(eq(projects.id, projectId));
      await db.update(links).set({ projectId, type: "WEBSITE", url: website });
    }

    return {
      status: "success",
      message: "Project updated successfully",
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
