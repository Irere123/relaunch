import { db } from "@/db";
import { auth } from "../auth";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function authUser() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("You need to be logged in to perform this action");
  }

  return session;
}

export async function authProject({ projectId }: { projectId: string }) {
  const session = await authUser();

  const userIsProjectAdmin = await db
    .select()
    .from(projects)
    .where(eq(projects.userId, session.user?.id!))
    .limit(1);

  if (!userIsProjectAdmin) {
    throw new Error("You need to be a member of this projet to edit it");
  }
}
