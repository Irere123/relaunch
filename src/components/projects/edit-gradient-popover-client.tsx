"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Check, Edit2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Project } from "@/db/schema";
import { Popover } from "../ui/popover";
import { cn } from "@/lib/utils";
import { buttonLinkVariants } from "../ui/button-link";
import { FormResponse } from "@/modules/actions/utils";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { PROJECT_GRADIENTS } from "@/lib/constants";
import { Label } from "../ui/label";
import { LoadingSpinner } from "../icons";
import { editGradient } from "@/modules/actions/edit-gradient";

export function EditGradientPopoverClient({ project }: { project: Project }) {
  const [openPopover, setOpenPopover] = useState(false);

  return (
    <Popover
      content={<EditGradientForm project={project} />}
      openPopover={openPopover}
      setOpenPopover={setOpenPopover}
    >
      <button
        className={cn(
          buttonLinkVariants({ variant: "secondary" }),
          "space-x-0 px-1"
        )}
        onClick={() => setOpenPopover(!openPopover)}
      >
        <span className="sr-only">Edit Project Gradient</span>
        <Edit2 className="h-4 w-4" />
      </button>
    </Popover>
  );
}

const EditGradientForm = ({ project }: { project: Project }) => {
  const [state, formAction] = useFormState<FormResponse, FormData>(
    editGradient,
    null
  );
  const [selectedGradient, setSelectedGradient] = useState(
    project.gradient as string
  );

  useEffect(() => {
    if (!state) {
      return;
    }

    if (state.status == "error") {
      console.log(state.errors);
    }

    if (state.status == "success") {
    }
  }, [state]);

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form ref={formRef} action={formAction}>
      <RadioGroup
        name="gradient"
        className="grid grid-cols-2 gap-2 p-4"
        defaultValue={selectedGradient}
        onValueChange={(value) => {
          setSelectedGradient(value);
          formRef.current?.requestSubmit();
        }}
      >
        {PROJECT_GRADIENTS.map((gradient) => (
          <div key={gradient} className="flex items-center">
            <RadioGroupItem
              value={gradient}
              id={gradient}
              className="peer pointer-events-none absolute opacity-0"
            />
            <Label
              htmlFor={gradient}
              className={cn(
                "flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-gradient-to-tr",
                gradient,
                selectedGradient === gradient && "border-gray-700"
              )}
            >
              {selectedGradient === gradient && <Indicator />}
              <p className="sr-only">{gradient}</p>
            </Label>
          </div>
        ))}
      </RadioGroup>
      <input type="hidden" name="projectId" value={project.id} />
    </form>
  );
};

const Indicator = () => {
  const { pending } = useFormStatus();
  return pending ? (
    <LoadingSpinner className="h-4 w-4" />
  ) : (
    <Check className="h-4 w-4 text-black" />
  );
};
