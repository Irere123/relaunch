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
import { AlertCircle } from "lucide-react";

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
    <form
      action={formAction}
      className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 w-full"
    >
      <label htmlFor="name">
        <span className="text-sm font-medium text-gray-900">Project name</span>
        <div className="relative mt-1">
          <input
            {...register("name")}
            autoFocus={!isMobile}
            required
            defaultValue={props.name}
            placeholder="Relaunch"
            className={`${
              errors.name
                ? "border-red-300 pr-10 text-red-500 placeholder-red-300 focus:border-red-500 focus:ring-red-500"
                : "border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:ring-gray-500"
            } w-full rounded-md focus:outline-none sm:text-sm`}
            onChange={() => {
              if (errors.name) {
                clearErrors("name");
              }
            }}
          />
          {errors.name && (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <AlertCircle
                className="h-5 w-5 text-red-500"
                fill="currentColor"
                stroke="white"
                aria-hidden="true"
              />
            </div>
          )}
        </div>
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </label>
      <label htmlFor="description">
        <span className="text-sm font-medium text-gray-900">
          Project description
        </span>
        <div className="relative mt-1">
          <input
            {...register("description")}
            required
            defaultValue={props.description}
            placeholder="Showcasing your ideas to the public!"
            className={`${
              errors.description
                ? "border-red-300 pr-10 text-red-500 placeholder-red-300 focus:border-red-500"
                : "border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:ring-gray-500"
            } w-full rounded-md focus:outline-none sm:text-sm`}
            onChange={() => {
              if (errors.description) {
                clearErrors("description");
              }
            }}
          />
          {errors.description && (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <AlertCircle
                className="h-5 w-5 text-red-500"
                fill="currentColor"
                stroke="white"
                aria-hidden="true"
              />
            </div>
          )}
        </div>
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">
            {errors.description.message}
          </p>
        )}
      </label>
      <label htmlFor="logo">
        <span className="text-sm font-medium text-gray-900">
          Project Logo URL
        </span>
        <div className="relative mt-1">
          <input
            {...register("logo")}
            required
            defaultValue={props.logo as string}
            placeholder="https://relaunch.dev/relaunch.png"
            className={`${
              errors.logo
                ? "border-red-300 pr-10 text-red-500 placeholder-red-300 focus:border-red-500"
                : "border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:ring-gray-500"
            } w-full rounded-md focus:outline-none sm:text-sm`}
            onChange={() => {
              if (errors.logo) {
                clearErrors("logo");
              }
            }}
          />
          {errors.logo && (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <AlertCircle
                className="h-5 w-5 text-red-500"
                fill="currentColor"
                stroke="white"
                aria-hidden="true"
              />
            </div>
          )}
        </div>
        {errors.logo && (
          <p className="mt-1 text-sm text-red-600">{errors.logo.message}</p>
        )}
      </label>
      <label htmlFor="website">
        <span className="text-sm font-medium text-gray-900">
          Project Website
        </span>
        <div className="relative mt-1">
          <input
            {...register("website")}
            required
            defaultValue={""}
            placeholder="https://relaunch.dev"
            className={`${
              errors.website
                ? "border-red-300 pr-10 text-red-500 placeholder-red-300 focus:border-red-500"
                : "border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:ring-gray-500"
            } w-full rounded-md focus:outline-none sm:text-sm`}
            onChange={() => {
              if (errors.website) {
                clearErrors("website");
              }
            }}
          />
          {errors.website && (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <AlertCircle
                className="h-5 w-5 text-red-500"
                fill="currentColor"
                stroke="white"
                aria-hidden="true"
              />
            </div>
          )}
        </div>
        {errors.website && (
          <p className="mt-1 text-sm text-red-600">{errors.website.message}</p>
        )}
      </label>
      <input type="hidden" name="projectId" value={props.id} />
      <FormButton disabled={false} />
    </form>
  );
}

const FormButton = ({ disabled }: { disabled: boolean }) => {
  const { pending } = useFormStatus();

  return <Button disabled={disabled || pending}>Save changes</Button>;
};
