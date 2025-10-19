import { sql } from "@/lib/sql";

export async function getPulseras() {
  const pulseras = await sql`
    SELECT * FROM pulseras
  `;

  return pulseras;
}
