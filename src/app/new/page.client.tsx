"use client";
import { useFormStatus } from "react-dom";

import { createProject } from "./actions";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const initialState = {
  error: null,
};

export const CreateProjectForm = () => {
  const [state, formAction] = useActionState(createProject, initialState);
  const { pending } = useFormStatus();

  const router = useRouter();

  useEffect(() => {
    if (state?.redirect) {
      router.push(state.redirect);
      // toast.success("Successfully submitted project!");
    }
  }, [state?.redirect, router]);

  return (
    <form
      action={formAction}
      className="flex flex-col max-w-sm bg-slate-800 gap-4 px-3 py-6"
    >
      <input placeholder="name" name="name" />
      <input placeholder="description" name="description" />
      {state.error && <p>{state.error}</p>}
      <button type="submit" disabled={pending}>
        Create project
      </button>
    </form>
  );
};
