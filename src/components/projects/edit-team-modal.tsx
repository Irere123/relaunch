import { Project } from "@/types";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import { Modal } from "../ui/modal";
import Image from "next/image";
import { EditTeamForm } from "./edit-team-form";

export const EditTeamModal = ({
  props,
  setShowEditTeamModal,
  showEditTeamModal,
}: {
  showEditTeamModal: boolean;
  setShowEditTeamModal: Dispatch<SetStateAction<boolean>>;
  props: Project;
}) => {
  return (
    <Modal showModal={showEditTeamModal} setShowModal={setShowEditTeamModal}>
      <div className="flex flex-col items-center justify-center space-y-2 border-b border-gray-200 bg-white py-6 pt-8 text-center">
        <Image
          src={props.logo as string}
          alt="Logo"
          className="h-10 w-10 rounded-full"
          width={20}
          height={20}
        />
        <h3 className="text-xl font-bold">Edit Team</h3>

        <EditTeamForm
          props={props}
          setShowEditTeamModal={setShowEditTeamModal}
        />
      </div>
    </Modal>
  );
};

export function useEditTeamModal({ props }: { props: Project }) {
  const [showEditTeamModal, setShowEditTeamModal] = useState(false);

  const EditTeamModalCallback = useCallback(() => {
    return (
      <EditTeamModal
        showEditTeamModal={showEditTeamModal}
        setShowEditTeamModal={setShowEditTeamModal}
        props={props}
      />
    );
  }, [showEditTeamModal, setShowEditTeamModal, props]);

  return useMemo(
    () => ({
      setShowEditTeamModal,
      EditTeamModal: EditTeamModalCallback,
    }),
    [setShowEditTeamModal, EditTeamModalCallback]
  );
}
