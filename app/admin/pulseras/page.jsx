"use client";

import { useState, useEffect } from "react";
import PulseraTable from "./_components/PulseraTable";
import PulseraFormModal from "./_components/PulseraFormModal";
import DeleteConfirmModal from "./_components/DeleteConfirmModal";
import { useToast } from "../_components/ToastContext";

export default function PulserasPage() {
  const { addToast } = useToast();
  const [pulseras, setPulseras] = useState([]);
  const [filteredPulseras, setFilteredPulseras] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPulsera, setSelectedPulsera] = useState(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Cargar pulseras
  useEffect(() => {
    fetchPulseras();
  }, []);

  // Filtrar pulseras en tiempo real
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredPulseras(pulseras);
    } else {
      const filtered = pulseras.filter((pulsera) =>
        pulsera.nombre_producto.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPulseras(filtered);
    }
  }, [searchTerm, pulseras]);

  const fetchPulseras = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/pulseras/list");
      const data = await response.json();
      setPulseras(data.pulseras || []);
      setFilteredPulseras(data.pulseras || []);
    } catch (error) {
      console.error("Error al cargar pulseras:", error);
      addToast("Error al cargar las pulseras", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateNew = () => {
    setSelectedPulsera(null);
    setIsFormModalOpen(true);
  };

  const handleEdit = (pulsera) => {
    setSelectedPulsera(pulsera);
    setIsFormModalOpen(true);
  };

  const handleDelete = (pulsera) => {
    setSelectedPulsera(pulsera);
    setIsDeleteModalOpen(true);
  };

  const handleSave = async (formData, id) => {
    try {
      const url = id ? "/api/pulseras/update" : "/api/pulseras/create";
      const method = id ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(id ? { id, ...formData } : formData),
      });

      const data = await response.json();

      if (data.success) {
        await fetchPulseras();
        setIsFormModalOpen(false);
        setSelectedPulsera(null);
        addToast(
          id
            ? "Pulsera actualizada exitosamente"
            : "Pulsera creada exitosamente",
          "success"
        );
      } else {
        addToast("Error: " + data.error, "error");
      }
    } catch (error) {
      console.error("Error al guardar pulsera:", error);
      addToast("Error al guardar la pulsera", "error");
    }
  };

  const handleConfirmDelete = async (id) => {
    try {
      const response = await fetch(`/api/pulseras/delete?id=${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        await fetchPulseras();
        setIsDeleteModalOpen(false);
        setSelectedPulsera(null);
        addToast("Pulsera eliminada exitosamente", "success");
      } else {
        addToast("Error: " + data.error, "error");
      }
    } catch (error) {
      console.error("Error al eliminar pulsera:", error);
      addToast("Error al eliminar la pulsera", "error");
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-emerald-900 mb-2">
            Gestión de Pulseras
          </h1>
          <p className="text-gray-600">
            Administra el catálogo de pulseras del sitio web.
          </p>
        </div>
        <button
          onClick={handleCreateNew}
          className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors shadow-md"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Nueva Pulsera
        </button>
      </div>

      {/* Barra de búsqueda */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar por nombre de producto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-12 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
          />
          <svg
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        {searchTerm && (
          <p className="mt-2 text-sm text-gray-600">
            {filteredPulseras.length} pulsera(s) encontrada(s)
          </p>
        )}
      </div>

      {/* Tabla de pulseras */}
      {isLoading ? (
        <div className="bg-white rounded-lg shadow-md p-12 border border-emerald-100 text-center">
          <p className="text-gray-500">Cargando pulseras...</p>
        </div>
      ) : (
        <PulseraTable
          pulseras={filteredPulseras}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {/* Modal de formulario */}
      <PulseraFormModal
        pulsera={selectedPulsera}
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setSelectedPulsera(null);
        }}
        onSave={handleSave}
      />

      {/* Modal de confirmación de eliminación */}
      <DeleteConfirmModal
        pulsera={selectedPulsera}
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedPulsera(null);
        }}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
