export default function AdminPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-emerald-900 mb-4">
        Panel de Administración
      </h1>
      <p className="text-gray-600">
        Bienvenido al panel de administración. Selecciona una opción del menú
        lateral para comenzar.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-white rounded-lg shadow-md p-6 border-2 border-emerald-200 hover:border-emerald-400 transition-colors">
          <h2 className="text-2xl font-semibold text-emerald-800 mb-2">
            Pulseras
          </h2>
          <p className="text-gray-600">
            Gestiona el catálogo de pulseras del sitio web.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-2 border-emerald-200 hover:border-emerald-400 transition-colors">
          <h2 className="text-2xl font-semibold text-emerald-800 mb-2">
            Usuarios
          </h2>
          <p className="text-gray-600">
            Administra los usuarios y sus permisos.
          </p>
        </div>
      </div>
    </div>
  );
}
