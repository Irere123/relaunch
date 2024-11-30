"use client";

import React, { Dispatch, SetStateAction, useState } from "react";

import { Project } from "@/types";

export const DashboardContext = React.createContext<{
  projects: Project[];
  selectedProjectIndex: number;
  setSelectedProjectIndex: Dispatch<SetStateAction<number>>;
}>({
  projects: [],
  selectedProjectIndex: 0,
  setSelectedProjectIndex: () => {},
});

export const DashboardProvider: React.FC<{
  children: React.ReactNode;
  projects: Project[];
}> = ({ children, projects }) => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

  return (
    <DashboardContext.Provider
      value={{ projects, selectedProjectIndex, setSelectedProjectIndex }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
