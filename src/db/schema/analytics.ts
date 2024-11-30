import { sqliteTable, text } from "drizzle-orm/sqlite-core";

import { projects } from "./projects";

export const analytics = sqliteTable("analytics", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  slug: text("slug").unique(),
  flag: text("flug"),
  country: text("country"),
  city: text("city"),
  date: text("date"),
  longitude: text("longitude"),
  latitude: text("latitude"),
  projectId: text("project_id").references(() => projects.id),
});
