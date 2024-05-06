import { neon } from "@neondatabase/serverless";
const sql = neon(
  "postgresql://reminderdb_owner:DZWPMabnl2V9@ep-round-glade-a22vugz0.eu-central-1.aws.neon.tech/reminderdb?sslmode=require"
);

export async function helloWorld() {
  const [userResponse] = await sql`SELECT * FROM korisnici;`;

  // Vraćamo odgovor baze podataka sa informacijama o korisnicima
  return userResponse;
}
