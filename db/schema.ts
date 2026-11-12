import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const inquiries = sqliteTable("inquiries", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company").notNull().default(""),
  market: text("market").notNull(),
  service: text("service").notNull(),
  brief: text("brief").notNull(),
  availability: text("availability").notNull(),
  createdAt: text("created_at").notNull().default(sql.raw("CURRENT_TIMESTAMP")),
});
