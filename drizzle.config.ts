import "dotenv/config";
import type { Config } from "drizzle-kit";

export default {
  schema: "./db/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString:
      "postgresql://reminderdb_owner:DZWPMabnl2V9@ep-round-glade-a22vugz0.eu-central-1.aws.neon.tech/reminderdb?sslmode=require",
  },
} satisfies Config;
