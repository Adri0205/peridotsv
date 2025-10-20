import { sql } from "@/lib/sql";

export async function updatePulsera(id, data) {
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
    `UPDATE pulseras 
     SET nombre_producto = $1, descripcion = $2, precio = $3, sexo = $4, imagen_url = $5
     WHERE id_pulsera = $6
     RETURNING *`,
    [nombre_producto, descripcion, precio, sexo || null, imagen_url || null, id]
  );

  if (result.rows.length === 0) {
    throw new Error("Pulsera no encontrada");
  }

  return result.rows[0];
}
