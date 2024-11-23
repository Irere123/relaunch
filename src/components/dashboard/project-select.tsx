"use client";

import { ChevronDown } from "lucide-react";

import { Button } from "../ui/button";
import {
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export const ProjectSelect: React.FC = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="default" className="gap-2">
          Relaunch
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Reall</DropdownMenuItem>
        <DropdownMenuItem>Spek</DropdownMenuItem>
        <DropdownMenuItem>Swipe</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
