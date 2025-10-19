import ProductCard from "./ProductCard";

const PRODUCTS = [
  { id: 1, title: "Asimetrica", image: "/img/mujeres/asimetrico.jpg" },
  { id: 2, title: "Conjunto Plata", image: "/img/mujeres/conjuntoplata.jpg" },
  { id: 3, title: "Conjunto Oro", image: "/img/mujeres/conjuntoro.jpg" },
  { id: 4, title: "Estilo", image: "/img/mujeres/estilo.jpg" },
  { id: 5, title: "Pulsera Verde", image: "/img/mujeres/pulseraverde.jpg" },
  { id: 6, title: "Venturina", image: "/img/mujeres/venturina.jpg" }
];

export default function ProductGrid() {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Grid: 3 columnas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {PRODUCTS.map(p => (
          <div key={p.id} className="flex flex-col items-center text-center">
            {/* Imagen grande */}
            <ProductCard title={p.title} image={p.image} />
            {/* Título y botón */}
            <h3 className="mt-4 text-lg font-semibold">{p.title}</h3>
            <button className="mt-2 px-4 py-1 border rounded text-sm bg-[var(--green-pill)] border-[rgba(0,0,0,0.08)]">
              Más info
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}