"use client";

import {
  Dispatch,
  SetStateAction,
  useActionState,
  useEffect,
  useState,
} from "react";
import { useFormStatus } from "react-dom";
import { AlertCircle, CornerDownLeft, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Project, User } from "@/types";
import {
  editTeamSchema,
  FormResponse,
  selectUserSchema,
} from "@/modules/actions/utils";
import { selectTeamMember } from "@/modules/actions/select-team-member";
import { cn } from "@/lib/utils";
import { editTeam } from "@/modules/actions/edit-team";
import { toast } from "@/hooks/use-toast";
import { revalidateProject } from "@/modules/actions/revalidate-project";
import { LoadingSpinner } from "../icons";
import { Button } from "../ui/button";
import { buttonLinkVariants } from "../ui/button-link";

export function EditTeamForm({
  props,
  setShowEditTeamModal,
}: {
  props: Project;
  setShowEditTeamModal: Dispatch<SetStateAction<boolean>>;
}) {
  const { team: projectUsers } = props;
  const [users, setUsers] = useState<Project["team"]>(projectUsers);

  const {
    register,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<z.infer<typeof selectUserSchema>>({
    resolver: zodResolver(selectUserSchema),
  });

  const [state, formAction] = useActionState<
    (FormResponse & { user?: User }) | null,
    FormData
  >(selectTeamMember, null);

  useEffect(() => {
    if (!state) {
      return;
    }

    if (state.status === "error") {
      state.errors?.forEach((error) => {
        setError(error.path as keyof typeof errors, { message: error.message });
      });
    }

    if (state.status === "success" && state.user) {
      const { user: foundUser } = state;
      setUsers((prev) => {
        if (prev.some((user) => user.id === foundUser.id)) {
          return prev;
        }

        return [...prev, { ...foundUser }];
      });
    }
  }, [state]);

  return (
    <div className="flex flex-col space-y-4 py-8">
      <form action={formAction}>
        <div className="relative">
          <input
            {...register("name")}
            required
            autoFocus
            autoComplete="off"
            placeholder="Search for a user"
            className={`${
              errors.name
                ? "border-red-300 pr-10 text-red-500 placeholder-red-300 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:ring-gray-500"
            } w-full rounded-md focus:outline-none sm:text-sm`}
            onChange={() => {
              if (errors.name) {
                clearErrors("name");
              }
            }}
          />
          {errors.name ? (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <AlertCircle
                className="h-5 w-5 text-red-500"
                fill="currentColor"
                stroke="white"
                aria-hidden="true"
              />
            </div>
          ) : (
            <LoadingInput />
          )}
        </div>
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </form>
      <div className="flex flex-col divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white px-4 py-2">
        {users.map((user) => (
          <div
            key={user.id}
            className="group relative flex items-center space-x-3 p-2"
          >
            <img
              src={user.image}
              alt="avatar"
              className="h-10 w-10 rounded-full"
            />
            <div className="flex flex-col">
              <p className="font-medium text-gray-700">{user.name}</p>
            </div>
            <button
              className={cn(
                buttonLinkVariants({ variant: "secondary" }),
                "absolute inset-y-0 right-0 my-auto h-6 w-6 justify-center space-x-0 p-0 opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100"
              )}
              onClick={() =>
                setUsers((prev) => prev.filter((u) => u.id !== user.id))
              }
            >
              <p className="sr-only">Remove user</p>
              <X className="h-4 w-4 text-gray-400" />
            </button>
          </div>
        ))}
      </div>
      <EditTeamFormPseudo
        setShowEditTeamModal={setShowEditTeamModal}
        project={props}
        users={users}
      />
    </div>
  );
}

const LoadingInput = () => {
  const { pending } = useFormStatus();

  return (
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
      {pending ? (
        <LoadingSpinner />
      ) : (
        <div className="rounded-lg border border-gray-300 px-2 py-1">
          <CornerDownLeft className="h-3.5 w-3.5 text-gray-400" />
        </div>
      )}
    </div>
  );
};

const EditTeamFormPseudo = ({
  project,
  setShowEditTeamModal,
  users,
}: {
  users: Project["team"];
  project: Project;
  setShowEditTeamModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();

  const { register } = useForm<z.infer<typeof editTeamSchema>>({
    resolver: zodResolver(editTeamSchema),
  });

  const edtiTeamWithUsers = editTeam.bind(null, users);

  const [state, formAction] = useActionState<FormResponse, FormData>(
    edtiTeamWithUsers,
    null
  );

  useEffect(() => {
    if (!state) {
      return;
    }

    if (state.status === "error") {
      toast({ description: state.message, variant: "destructive" });
    }

    if (state.status === "success") {
      revalidateProject(project.slug).then(() => {
        router.refresh();
        setShowEditTeamModal(false);
        toast({ description: "Project updated successfully" });
      });
    }
  }, [state]);

  return (
    <form action={formAction}>
      <input
        {...register("projectId")}
        type="hidden"
        value={project.id}
        readOnly
      />
      <FormButton />
    </form>
  );
};

const FormButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type="submit">
      Save changes
    </Button>
  );
};
