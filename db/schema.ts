import {
  pgTable,
  serial,
  text,
  date,
  boolean,
  integer,
  check,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  created_at: date("created_at").notNull(),
});

export const reminders = pgTable("reminders", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  details: text("details").notNull(),
  due_at: date("due_at").notNull(),
  finished: boolean("finished").notNull().default(false),
  userId: integer("user_id").references(() => users.id),
  priorityId: integer("priority_id").references(() => priorities.id),
});

export const priorities = pgTable("priorities", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});
