import ProductCard from "./ProductCard";

const PRODUCTS = [
  { id: 1, title: "Pulsera Fiera", image: "/img/hombres/pulsera_fiera.jpg" },
  { id: 2, title: "Cielo Profundo", image: "/img/hombres/cielo_profundo.jpg" },
  { id: 3, title: "Pulsera Eclipse", image: "/img/hombres/pulsera_eclipse.jpg" },
  { id: 4, title: "Piedras naturales", image: "/img/hombres/piedras_naturales.jpg" },
  { id: 5, title: "Selva Nocturna", image: "/img/hombres/selva_nocturna.jpg" },
  { id: 6, title: "Pulsera Alpha", image: "/img/hombres/pulsera_alpha.jpg" }
];

export default function ProductGrid() {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Grid: 3 columnas en desktop, 2 en tablet, 1 en móvil */}
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