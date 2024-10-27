"use client";

import { Edit2 } from "lucide-react";
import { buttonLinkVariants } from "../ui/button-link";
import { cn } from "@/lib/utils";
import { useEditProjectModal } from "./edit-project-modal";
import { Project } from "@/db/schema";
import { useContext } from "react";
import { ProjectContext } from "./project-provider";

export function EditProjectButtonClient() {
  const { setShowEditProjectModal } = useContext(ProjectContext);
  return (
    <button
      className={cn(
        buttonLinkVariants({ variant: "secondary" }),
        "space-x-0 px-1"
      )}
      onClick={() => setShowEditProjectModal(true)}
    >
      <span className="sr-only">Edit project</span>
      <Edit2 className="h-4 w-4" />
    </button>
  );
}
