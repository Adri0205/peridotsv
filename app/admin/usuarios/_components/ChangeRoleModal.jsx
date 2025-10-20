"use client";

import { useState } from "react";

export default function ChangeRoleModal({ user, isOpen, onClose, onConfirm }) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState(user?.role || "user");

  if (!isOpen || !user) return null;

  const handleConfirm = async () => {
    setIsLoading(true);
    await onConfirm(user.id, selectedRole);
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold text-emerald-900 mb-4">
          Cambiar Rol de Usuario
        </h2>

        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
            {user.image ? (
              <img
                src={user.image}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-emerald-200"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-emerald-200 flex items-center justify-center text-emerald-800 font-semibold text-lg">
                {user.name?.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <p className="font-semibold text-gray-900">{user.name}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rol actual: <span className="font-bold">{user.role}</span>
            </label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              disabled={isLoading}
            >
              <option value="user">Usuario</option>
              <option value="admin">Administrador</option>
            </select>
          </div>
        </div>

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
            disabled={isLoading || selectedRole === user.role}
            className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Actualizando..." : "Confirmar"}
          </button>
        </div>
      </div>
    </div>
  );
}
