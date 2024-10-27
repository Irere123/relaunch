"use client";

import { Project } from "@/db/schema";
import { Modal } from "../ui/modal";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import Image from "next/image";
import EditProjectForm from "./edit-project-form";

const EditProjectModal = ({
  props,
  setShowEditProjectModal,
  showEditProjectModal,
}: {
  showEditProjectModal: boolean;
  setShowEditProjectModal: Dispatch<SetStateAction<boolean>>;
  props: Project;
}) => {
  return (
    <Modal
      showModal={showEditProjectModal}
      setShowModal={setShowEditProjectModal}
    >
      <div className="flex flex-col items-center justify-center space-y-2 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center md:px-16">
        <Image
          src={props.logo || "/relaunch.svg"}
          alt="Logo"
          className="h-10 w-10 rounded-full"
          width={20}
          height={20}
        />
        <h3 className="text-xl font-bold">Edit Project</h3>
        <EditProjectForm
          props={props}
          setShowEditProjectModal={setShowEditProjectModal}
        />
      </div>
    </Modal>
  );
};

export function useEditProjectModal({ props }: { props: Project }) {
  const [showEditProjectModal, setShowEditProjectModal] = useState(false);

  const EditProjectModalCallback = useCallback(() => {
    return (
      <EditProjectModal
        showEditProjectModal={showEditProjectModal}
        setShowEditProjectModal={setShowEditProjectModal}
        props={props}
      />
    );
  }, [showEditProjectModal, setShowEditProjectModal, props]);

  return useMemo(
    () => ({
      setShowEditProjectModal,
      EditProjectModal: EditProjectModalCallback,
    }),
    [setShowEditProjectModal, EditProjectModalCallback]
  );
}
