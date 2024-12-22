import { relations, sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

import { projects } from "./projects";
import { users } from "./users";

export const projectReviews = sqliteTable("project_review", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  projectId: text("project_id").references(() => projects.id),
  userId: text("user_id").references(() => users.id),
  content: text("content"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text("created_at")
    .notNull()
    .default(sql`(current_timestamp)`),
});

export const projectReviewsRelations = relations(projectReviews, ({ one }) => ({
  user: one(users, { fields: [projectReviews.userId], references: [users.id] }),
}));

export type Review = typeof projectReviews.$inferSelect;
