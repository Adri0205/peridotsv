// app/api/pulseras/route.js
export async function GET() {
  const pulseras = [
    {
      "id_pulsera": 1,
      "nombre_producto": "Pulsera Cuero Clásica",
      "descripcion": "Pulsera de cuero negro con broche metálico.",
      "precio": "15.99",
      "sexo": "Hombre",
      "imagen_url": "/img/pulsera_cuero.jpg",
      "fecha_registro": "2025-10-13T20:50:45.674Z"
    },
    {
      "id_pulsera": 2,
      "nombre_producto": "Pulsera de Perlas",
      "descripcion": "Pulsera con perlas naturales blancas.",
      "precio": "25.50",
      "sexo": "Mujer",
      "imagen_url": "/img/pulsera_perlas.jpg",
      "fecha_registro": "2025-10-13T20:50:45.674Z"
    },
    {
      "id_pulsera": 3,
      "nombre_producto": "Pulsera Trenzada Multicolor",
      "descripcion": "Pulsera artesanal trenzada con hilos de colores.",
      "precio": "8.75",
      "sexo": "Unisex",
      "imagen_url": "/img/pulsera_trenzada.jpg",
      "fecha_registro": "2025-10-13T20:50:45.674Z"
    }
  ];

  return new Response(JSON.stringify(pulseras), {
    headers: { 'Content-Type': 'application/json' }
  });
}