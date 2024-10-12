import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { users } from "./users";

export const projects = sqliteTable("project", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").unique(),
  slug: text("slug").unique(),
  description: text("description"),
  logo: text("logo"),
  image: text("image"),
  gradient: text("gradient").default(
    "from-purple-100 via-violet-50 to-blue-100"
  ),
  clicks: integer("clicks").default(0),
  likes: integer("likes").default(0),
  tags: text("tags", { mode: "json" })
    .notNull()
    .$type<string[]>()
    .default(sql`(json_array())`),
  userId: text("user_id").references(() => users.id),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
});

export const projectReviews = sqliteTable("project_review", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  projectId: text("project_id").references(() => projects.id),
  content: text("content"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
});

export const projectTeam = sqliteTable("project_team", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  projectId: text("project_id").references(() => projects.id),
  userId: text("user_id").references(() => users.id),
});

export type Project = typeof projects.$inferSelect;
