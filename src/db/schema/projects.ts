import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { users } from "./users";
import { links } from "./links";
import { analytics } from "./analytics";
import { projectReviews } from "./reviews";

export const projects = sqliteTable("project", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").unique().notNull(),
  slug: text("slug").unique().notNull(),
  description: text("description").notNull(),
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

export const projectRelations = relations(projects, ({ many, one }) => ({
  owner: one(users, { fields: [projects.userId], references: [users.id] }),
  links: many(links, { relationName: "projectLink" }),
  projectTeam: many(projectTeam),
  analytics: many(analytics),
  reviews: many(projectReviews),
}));

export const projectTeam = sqliteTable("project_team", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  projectId: text("project_id").references(() => projects.id),
  userId: text("user_id").references(() => users.id),
});

export const projectTeamRelations = relations(projectTeam, ({ one, many }) => ({
  project: one(projects, {
    fields: [projectTeam.projectId],
    references: [projects.id],
  }),
  member: one(users, {
    fields: [projectTeam.userId],
    references: [users.id],
  }),
}));

export type Project = typeof projects.$inferSelect;
export type ProjectTeam = typeof projectTeam.$inferSelect;
