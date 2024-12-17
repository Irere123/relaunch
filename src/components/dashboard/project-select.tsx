"use client";

import { ChevronDown } from "lucide-react";
import { useContext } from "react";

import { Button } from "../ui/button";
import {
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { DashboardContext } from "./dashboard-provider";

export const ProjectSelect: React.FC = () => {
  const { projects, selectedProjectIndex, setSelectedProjectIndex } =
    useContext(DashboardContext);

  if (projects.length === 0) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="default" className="gap-2">
          {projects[selectedProjectIndex].name}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {projects.map((project, idx) => (
          <DropdownMenuItem
            key={project.id}
            onClick={() => setSelectedProjectIndex(idx)}
          >
            {project.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
