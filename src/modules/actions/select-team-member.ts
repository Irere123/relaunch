"use server";

import { User } from "@/types";
import { FormResponse, selectUserSchema } from "./utils";
import { authUser } from "./auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { ZodError } from "zod";

export async function selectTeamMember(
  _prevState: any,
  data: FormData
): Promise<FormResponse & { user?: User }> {
  try {
    const { name } = selectUserSchema.parse({ name: data.get("name") });

    await authUser();

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.name, name))
      .limit(1);

    if (!user) {
      throw new ZodError([
        { path: ["username"], code: "custom", message: "User not found" },
      ]);
    }

    return {
      status: "success",
      message: "User found",
      user: user as unknown as User,
    };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        status: "error",
        message: "Invalid form data",
        errors: error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      };
    }

    return {
      status: "error",
      message: (error as Error).message,
    };
  }
}
