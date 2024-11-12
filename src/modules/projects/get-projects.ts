import { db } from "@/db";
import { projects } from "@/db/schema";

export async function getProjects() {
  const allProjects = await db.select().from(projects);
  return allProjects;
}
 