import { Project } from "@/types";
import { auth } from "@/modules/auth";
import { EditTeamButtonClient } from "./edit-team-button-client";

export async function EditTeamButton({ project }: { project: Project }) {
  const session = await auth();

  if (!session) return null;

  if (
    project.team.some((member) => member.id === session.user?.id) ||
    project.userId === session.user?.id
  ) {
    return <EditTeamButtonClient />;
  }
}
