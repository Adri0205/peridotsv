import { sql } from "@/lib/sql";

export async function getPulseras() {
  const result = await sql.query(`
    SELECT * FROM pulseras
  `);

  return result.rows;
}
