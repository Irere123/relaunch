import { PROJECT_GRADIENTS } from "@/lib/constants";
import { trim } from "@/utils/trim";
import { getUrlFromString, isValidUrl } from "@/utils/urls";
import { z } from "zod";

export type FormResponse =
  | {
      status: "error";
      message: string;
      errors?: { path: string; message: string }[];
    }
  | {
      status: "success";
      message: string;
      data?: any;
    };

export const editGradientSchema = z.object({
  gradient: z.enum(PROJECT_GRADIENTS as [string, ...string[]]),
  projectId: z.string().min(8),
});

export const editProjectSchema = z.object({
  name: z.preprocess(trim, z.string().min(4).max(64), {
    message: "Invalid project name",
  }),
  logo: z
    .string()
    .transform((v) => getUrlFromString(v))
    .refine((l) => isValidUrl(l), { message: "Invalid Logo URL" }),
  description: z.preprocess(trim, z.string().min(1).max(1000), {
    message: "Invalid project description",
  }),
  website: z
    .string()
    .transform((v) => getUrlFromString(v))
    .refine((l) => isValidUrl(l), { message: "Invalid Website URL" })
    .optional(),
  projectId: z.string().min(8),
});

export const editTeamSchema = z.object({
  projectId: z.string().min(1).max(64),
});

export const selectUserSchema = z.object({ name: z.string().min(1).max(64) });

export const createReviewSchema = z.object({
  content: z.preprocess(trim, z.string().min(2), {
    message: "Invalid review content",
  }),
  userId: z.string().min(8),
  projectId: z.string().min(8),
});
