import { PROJECT_GRADIENTS } from "@/lib/constants";
import { z } from "zod";

export type FormResponse =
  | {
      status: "success";
      message: string;
    }
  | {
      status: "error";
      message: string;
      errors?: Array<{ path: string; message: string }>;
    }
  | null;

export const editGradientSchema = z.object({
  gradient: z.enum(PROJECT_GRADIENTS as [string, ...string[]]),
  projectId: z.string().min(8),
});
