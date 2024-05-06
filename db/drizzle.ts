import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../db/schema";

const sql = neon(
  "postgresql://reminderdb_owner:DZWPMabnl2V9@ep-round-glade-a22vugz0.eu-central-1.aws.neon.tech/reminderdb?sslmode=require"
);

const db = drizzle(sql, { schema });

export default db;
