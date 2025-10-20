export default function ProductCard({ pulsera, whatsappNumber }) {
  // Función para obtener el estilo del badge según el sexo
  const getBadgeStyle = (sexo) => {
    const sexoLower = sexo?.toLowerCase();

    if (sexoLower === "hombre") {
      return "bg-blue-50 text-blue-700 border border-blue-200";
    } else if (sexoLower === "mujer") {
      return "bg-pink-50 text-pink-700 border border-pink-200";
    } else {
      // Unisex o cualquier otro valor
      return "bg-gray-50 text-gray-700 border border-gray-200";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      {/* Imagen */}
      <div className="relative h-64 bg-gray-200">
        {pulsera.imagen_url ? (
          <img
            src={pulsera.imagen_url}
            alt={pulsera.nombre_producto}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-100 to-emerald-200">
            <svg
              className="w-20 h-20 text-emerald-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-900">
            {pulsera.nombre_producto}
          </h3>
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getBadgeStyle(
              pulsera.sexo
            )}`}
          >
            {pulsera.sexo}
          </span>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-3">{pulsera.descripcion}</p>

        <div className="flex justify-between items-center">
          <span className="text-3xl font-bold text-emerald-600">
            ${parseFloat(pulsera.precio).toFixed(2)}
          </span>
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
              `¡Hola! Me interesa la pulsera "${
                pulsera.nombre_producto
              }" ($${parseFloat(pulsera.precio).toFixed(2)})`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Preguntar
          </a>
        </div>
      </div>
    </div>
  );
}
