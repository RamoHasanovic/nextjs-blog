"use server";

import { revalidatePath } from "next/cache";
import { neon } from "@neondatabase/serverless";
import { z } from "zod";

let sql = neon(
  "postgresql://reminderdb_owner:DZWPMabnl2V9@ep-round-glade-a22vugz0.eu-central-1.aws.neon.tech/reminderdb?sslmode=require"
);

export async function createReminder(formData: FormData) {
  const schema = z.object({
    name: z.string().min(1),
    due_at: z.date(),
    priority_id: z.number().min(1),
    details: z.string().min(1),
  });

  console.log(formData);
  const date = new Date("2022,11,19");

  const parse = schema.safeParse({
    name: formData.get("name"),
    due_at: new Date(formData.get("due_at") as string),
    priority_id: parseInt((formData.get("priority_id") as string) ?? "0"), // Parse priority_id as integer
    details: formData.get("details"),
  });

  console.log({ parse, error: parse.error });

  if (!parse.success) {
    return { message: "Failed to create reminder" };
  }

  const data = parse.data;

  try {
    const response = await sql`
      INSERT INTO reminders (name, due_at, priority_id, details)
      VALUES (${data.name}, ${data.due_at}, ${data.priority_id}, ${data.details})
    `;
    console.log(response);

    revalidatePath("/");
    return { message: `Saved reminder ${data.name}` };
  } catch (e) {
    console.error("Error saving reminder:", e);
    return { message: "Failed to save reminder" };
  }
}
