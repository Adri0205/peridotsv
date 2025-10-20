"use client";

import { useState } from "react";

export default function DeleteConfirmModal({
  pulsera,
  isOpen,
  onClose,
  onConfirm,
}) {
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen || !pulsera) return null;

  const handleConfirm = async () => {
    setIsLoading(true);
    await onConfirm(pulsera.id_pulsera);
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Confirmar Eliminación
        </h2>

        <p className="text-gray-700 mb-4">
          ¿Estás seguro de que deseas eliminar esta pulsera?
        </p>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="flex items-center gap-3">
            {pulsera.imagen_url && (
              <img
                src={pulsera.imagen_url}
                alt={pulsera.nombre_producto}
                className="w-16 h-16 object-cover rounded-lg border-2 border-gray-200"
              />
            )}
            <div>
              <p className="font-semibold text-gray-900">
                {pulsera.nombre_producto}
              </p>
              <p className="text-sm text-gray-600">${pulsera.precio}</p>
            </div>
          </div>
        </div>

        <p className="text-sm text-red-600 mb-6">
          Esta acción no se puede deshacer.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            disabled={isLoading}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Eliminando..." : "Eliminar"}
          </button>
        </div>
      </div>
    </div>
  );
}
