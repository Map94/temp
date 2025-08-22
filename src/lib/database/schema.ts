import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// .src/lib/db/schema.ts
 export const todosTable = sqliteTable(
  "todos_table",
  {
    id: integer().primaryKey({ autoIncrement: true }).notNull(),
    content: text().notNull(),
    completed: integer({ mode: "boolean" }).notNull(),
    priority: integer().notNull().default(0)
    // andre felter
  },
);