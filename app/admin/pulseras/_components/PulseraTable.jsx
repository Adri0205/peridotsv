"use client";

import PulseraRow from "./PulseraRow";

export default function PulseraTable({ pulseras, onEdit, onDelete }) {
  if (pulseras.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-12 border border-emerald-100 text-center">
        <p className="text-gray-500">No se encontraron pulseras</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md border border-emerald-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-emerald-50 border-b border-emerald-100">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-900">
                Imagen
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-900">
                Nombre
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-900">
                Descripción
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-900">
                Precio
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-900">
                Sexo
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-900">
                Fecha
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-900">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {pulseras.map((pulsera) => (
              <PulseraRow
                key={pulsera.id_pulsera}
                pulsera={pulsera}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
