import { sql } from "@/lib/sql";

export async function deletePulsera(id) {
  const result = await sql.query(
    `DELETE FROM pulseras WHERE id_pulsera = $1 RETURNING *`,
    [id]
  );

  if (result.rows.length === 0) {
    throw new Error("Pulsera no encontrada");
  }

  return result.rows[0];
}
