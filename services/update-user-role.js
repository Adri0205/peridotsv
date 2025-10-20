import { sql } from "@/lib/sql";

export async function updateUserRole(userId, newRole) {
  if (!["admin", "user"].includes(newRole)) {
    throw new Error("Rol inválido. Debe ser 'admin' o 'user'");
  }

  const result = await sql.query(
    `UPDATE "user" SET role = $1 WHERE id = $2 RETURNING *`,
    [newRole, userId]
  );

  if (result.rows.length === 0) {
    throw new Error("Usuario no encontrado");
  }

  return result.rows[0];
}
