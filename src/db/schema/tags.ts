import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const projectTags = sqliteTable("project_tag", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
});
