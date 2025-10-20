"use client";

import { useState, useEffect } from "react";

export default function PulseraFormModal({ pulsera, isOpen, onClose, onSave }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre_producto: "",
    descripcion: "",
    precio: "",
    sexo: "Unisex",
    imagen_url: "",
  });
  const [imagePreview, setImagePreview] = useState("");

  // Actualizar el formulario cuando cambie la pulsera o se abra el modal
  useEffect(() => {
    if (isOpen) {
      if (pulsera) {
        // Modo edición: cargar datos de la pulsera
        setFormData({
          nombre_producto: pulsera.nombre_producto || "",
          descripcion: pulsera.descripcion || "",
          precio: pulsera.precio || "",
          sexo: pulsera.sexo || "Unisex",
          imagen_url: pulsera.imagen_url || "",
        });
        setImagePreview(pulsera.imagen_url || "");
      } else {
        // Modo creación: resetear formulario
        setFormData({
          nombre_producto: "",
          descripcion: "",
          precio: "",
          sexo: "Unisex",
          imagen_url: "",
        });
        setImagePreview("");
      }
    }
  }, [pulsera, isOpen]);

  if (!isOpen) return null;

  const isEditMode = !!pulsera;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setFormData((prev) => ({
          ...prev,
          imagen_url: base64String,
        }));
        setImagePreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await onSave(formData, pulsera?.id_pulsera);
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full mx-4 my-8">
        <h2 className="text-2xl font-bold text-emerald-900 mb-6">
          {isEditMode ? "Editar Pulsera" : "Crear Nueva Pulsera"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nombre del producto */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre del Producto *
            </label>
            <input
              type="text"
              name="nombre_producto"
              value={formData.nombre_producto}
              onChange={handleInputChange}
              required
              maxLength={100}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              placeholder="Ej: Pulsera Cuero Clásica"
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción *
            </label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleInputChange}
              required
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none resize-none"
              placeholder="Descripción detallada del producto..."
            />
          </div>

          {/* Precio y Sexo en la misma fila */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Precio (USD) *
              </label>
              <input
                type="number"
                name="precio"
                value={formData.precio}
                onChange={handleInputChange}
                required
                min="0.01"
                step="0.01"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sexo
              </label>
              <select
                name="sexo"
                value={formData.sexo}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              >
                <option value="Unisex">Unisex</option>
                <option value="Hombre">Hombre</option>
                <option value="Mujer">Mujer</option>
              </select>
            </div>
          </div>

          {/* Imagen */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Imagen del Producto
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            />
            {imagePreview && (
              <div className="mt-3">
                <p className="text-sm text-gray-600 mb-2">Vista previa:</p>
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg border-2 border-emerald-200"
                />
              </div>
            )}
          </div>

          {/* Botones */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Guardando..." : isEditMode ? "Actualizar" : "Crear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
