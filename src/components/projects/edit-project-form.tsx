"use client";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Project } from "@/db/schema";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Dispatch,
  SetStateAction,
  useActionState,
  useEffect,
  useRef,
} from "react";
import { Button } from "../ui/button";
import { editProjectSchema, FormResponse } from "@/modules/actions/utils";
import { editProject } from "@/modules/actions/edit-project";
import { revalidateProject } from "@/modules/actions/revalidate-project";
import { toast } from "@/hooks/use-toast";

export default function EditProjectForm({
  props,
  setShowEditProjectModal,
}: {
  props: Project;
  setShowEditProjectModal: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const { isMobile } = useMediaQuery();

  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<z.infer<typeof editProjectSchema>>({
    resolver: zodResolver(editProjectSchema),
  });

  const [state, formAction] = useActionState<FormResponse, FormData>(
    editProject,
    null
  );

  useEffect(() => {
    if (!state) {
      return;
    }

    if (state.status === "error") {
      state.errors?.forEach((error) => {
        setError(error.path as keyof typeof errors, { message: error.message });
      });
    }

    if (state.status === "success") {
      revalidateProject(props.slug).then(() => {
        router.refresh();
        setShowEditProjectModal(false);
        toast({ description: "Project updated successfully" });
      });
    }
  }, [state]);

  return (
    <form action={formAction} className="flex flex-col" ref={formRef}>
      <FormButton disabled={false} />
    </form>
  );
}

const FormButton = ({ disabled }: { disabled: boolean }) => {
  const { pending } = useFormStatus();

  return <Button disabled={disabled || pending}>Save changes</Button>;
};
