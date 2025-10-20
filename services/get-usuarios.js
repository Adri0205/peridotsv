import { sql } from "@/lib/sql";

export async function getUsuarios(searchTerm = "") {
  let query = `
    SELECT id, name, email, image, role
    FROM "user"
  `;

  const params = [];

  if (searchTerm) {
    query += ` WHERE name ILIKE $1 OR email ILIKE $1`;
    params.push(`%${searchTerm}%`);
  }

  const result = await sql.query(query, params);

  return result.rows;
}
