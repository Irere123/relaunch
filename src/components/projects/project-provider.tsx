"use client";

import { Project } from "@/db/schema";
import { createContext, Dispatch, SetStateAction } from "react";
import { useEditProjectModal } from "./edit-project-modal";

export const ProjectContext = createContext<{
  props: Project;
  setShowEditProjectModal: Dispatch<SetStateAction<boolean>>;
}>({ props: {} as Project, setShowEditProjectModal: () => {} });

export const ProjectContextProvider: React.FC<{
  children: React.ReactNode;
  props: Project;
}> = ({ children, props }) => {
  const { setShowEditProjectModal, EditProjectModal } = useEditProjectModal({
    props,
  });

  return (
    <ProjectContext.Provider value={{ props, setShowEditProjectModal }}>
      <EditProjectModal />
      {children}
    </ProjectContext.Provider>
  );
};
