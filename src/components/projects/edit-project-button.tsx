import { Project } from "@/db/schema";
import { auth } from "@/modules/auth";
import { EditProjectButtonClient } from "./edit-project-button-client";

export async function EditProjectButton({ project }: { project: Project }) {
  const session = await auth();

  if (!session) return null;

  if (project.userId === session.user?.id) {
    return <EditProjectButtonClient />;
  }
}
