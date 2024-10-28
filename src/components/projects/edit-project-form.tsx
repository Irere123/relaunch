"use client";

import { Project } from "@/db/schema";
// import { useMediaQuery } from "@/hooks/use-media-query";
// import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useRef } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

export default function EditProjectForm({}: {
  props: Project;
  setShowEditProjectModal: Dispatch<SetStateAction<boolean>>;
}) {
  // const router = useRouter();
  // const { isMobile } = useMediaQuery();

  // const formRef = useRef<HTMLFormElement>(null);

  return (
    <form>
      <FormButton disabled={false} />
    </form>
  );
}

const FormButton = ({ disabled }: { disabled: boolean }) => {
  // const { pending } = useFormStatus();

  return <Button disabled={disabled}>Save changes</Button>;
};
