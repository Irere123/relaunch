import { eq } from "drizzle-orm";
import { cache } from "react";

import { db } from "@/db";
import { users } from "@/db/schema";

export const getUserProfile = cache(async (id: string) => {
  const [result] = await db
    .select()
    .from(users)
    .where(eq(users.id, id))
    .limit(1);

  if (!result) return null;

  return result;
});
