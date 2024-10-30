"use client";
import { useFormStatus } from "react-dom";

import { createProject } from "./actions";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/text-area";
import { toast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

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
      toast({
        variant: "default",
        description: "Successfully submitted project!",
      });
    }
  }, [state?.redirect, router]);

  return (
    <form
      action={formAction}
      className="flex flex-col sm:w-[400px] w-full border border-gray-200 gap-4 px-5 py-6 shadow-md rounded-lg"
    >
      <div>
        <p className="text-xl font-medium">New project</p>
      </div>
      <Label>Name</Label>
      <Input placeholder="Add title" name="name" />
      <Label>Description</Label>
      <Textarea placeholder="Add description" rows={5} name="description" />
      {state.error && <p>{state.error}</p>}
      <div className="flex justify-end space-x-4">
        <Button variant={"ghost"} onClick={() => router.push("/dashboard")}>
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-gradient-to-br from-sky-600 to-sky-400 text-white"
          disabled={pending}
        >
          Create project
        </Button>
      </div>
    </form>
  );
};
