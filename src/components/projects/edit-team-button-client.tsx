"use client";

import { useContext } from "react";
import { Edit2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { ProjectContext } from "./project-provider";
import { buttonLinkVariants } from "../ui/button-link";

export function EditTeamButtonClient() {
  const { setShowEditTeamModal } = useContext(ProjectContext);

  return (
    <button
      className={cn(
        buttonLinkVariants({ variant: "secondary" }),
        "space-x-0 px-1"
      )}
      onClick={() => setShowEditTeamModal(true)}
    >
      <span className="sr-only">Edit Project</span>
      <Edit2 className="h-4 w-4" />
    </button>
  );
}
