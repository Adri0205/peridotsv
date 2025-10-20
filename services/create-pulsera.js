import { sql } from "@/lib/sql";

export async function createPulsera(data) {
  const { nombre_producto, descripcion, precio, sexo, imagen_url } = data;

  if (!nombre_producto || !descripcion || !precio) {
    throw new Error("Nombre, descripción y precio son requeridos");
  }

  if (precio <= 0) {
    throw new Error("El precio debe ser mayor a 0");
  }

  if (sexo && !["Hombre", "Mujer", "Unisex"].includes(sexo)) {
    throw new Error("Sexo debe ser 'Hombre', 'Mujer' o 'Unisex'");
  }

  const result = await sql.query(
    `INSERT INTO pulseras (nombre_producto, descripcion, precio, sexo, imagen_url)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [nombre_producto, descripcion, precio, sexo || null, imagen_url || null]
  );

  return result.rows[0];
}
