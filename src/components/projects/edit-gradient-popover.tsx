import { Project } from "@/db/schema";
import { auth } from "@/modules/auth";
import { EditGradientPopoverClient } from "./edit-gradient-popover-client";

export async function EditGradientPopover({ project }: { project: Project }) {
  const session = await auth();

  if (!session) return null;

  if (session.user?.id !== project.userId) return null;

  return (
    <div className="absolute bottom-2 right-2 z-10">
      <EditGradientPopoverClient project={project} />
    </div>
  );
}
