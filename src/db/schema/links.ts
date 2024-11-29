import { sqliteTable, text } from "drizzle-orm/sqlite-core";

import { projects } from "./projects";
import { relations } from "drizzle-orm";

export const links = sqliteTable("link", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  type: text("type"),
  url: text("url"),
  projectId: text("project_id").references(() => projects.id),
});

export const linkRelations = relations(links, ({ many, one }) => ({
  project: one(projects, {
    fields: [links.projectId],
    references: [projects.id],
  }),
}));

export type LinkSelect = typeof links.$inferSelect;
