import { db } from "@/db";
import { projects } from "@/db/schema";
import { sql } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");

  if (!query) {
    return Response.json({ items: [] });
  }

  const items = await db
    .select()
    .from(projects)
    .where(sql`${projects.name} LIKE ${query + "%"} COLLATE NOCASE`);

  return Response.json({ items });
}
