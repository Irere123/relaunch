"use client";

import { createContext, Dispatch, SetStateAction } from "react";
import { useEditProjectModal } from "./edit-project-modal";
import { Project } from "@/types";
import { useEditTeamModal } from "./edit-team-modal";

export const ProjectContext = createContext<{
  props: Project;
  setShowEditProjectModal: Dispatch<SetStateAction<boolean>>;
  setShowEditTeamModal: Dispatch<SetStateAction<boolean>>;
}>({
  props: {} as Project,
  setShowEditProjectModal: () => {},
  setShowEditTeamModal: () => {},
});

export const ProjectContextProvider: React.FC<{
  children: React.ReactNode;
  props: Project;
}> = ({ children, props }) => {
  const { setShowEditProjectModal, EditProjectModal } = useEditProjectModal({
    props,
  });
  const { EditTeamModal, setShowEditTeamModal } = useEditTeamModal({ props });

  return (
    <ProjectContext.Provider
      value={{ props, setShowEditProjectModal, setShowEditTeamModal }}
    >
      <EditProjectModal />
      <EditTeamModal />
      {children}
    </ProjectContext.Provider>
  );
};
