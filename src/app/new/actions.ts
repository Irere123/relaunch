"use server";
import slugify from "@sindresorhus/slugify";
import { parseWithZod } from "@conform-to/zod";
import { z } from "zod";

import { db } from "@/db";
import { projects, projectTeam } from "@/db/schema";
import { auth } from "@/modules/auth";
import { redirect } from "next/navigation";

const schema = z.object({
  name: z.string(),
  description: z.string(),
});

export async function createProject(_prevState: unknown, formData: FormData) {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  const submission = parseWithZod(formData, { schema });

  if (submission.status !== "success") {
    return { error: "Please provide all fields." };
  }

  let project;
  try {
    [project] = await db
      .insert(projects)
      .values({
        ...submission.value,
        slug: slugify(submission.value.name),
        userId: session.user?.id,
      })
      .returning();

    await db
      .insert(projectTeam)
      .values({ projectId: project.id, userId: session.user.id });
  } catch (error: any) {
    if (error.message.includes("UNIQUE constraint")) {
      return { error: "Project name already in taken." };
    }

    return {
      error: error.message,
    };
  }

  return {
    redirect: `/projects/${project.slug}`,
  };
}
