"use client";

import { useState, useEffect } from "react";
import UserTable from "./_components/UserTable";
import ChangeRoleModal from "./_components/ChangeRoleModal";

export default function UsuariosPage() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Cargar usuarios
  useEffect(() => {
    fetchUsers();
  }, []);

  // Filtrar usuarios en tiempo real
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/usuarios/list");
      const data = await response.json();
      setUsers(data.users || []);
      setFilteredUsers(data.users || []);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeRole = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleConfirmRoleChange = async (userId, newRole) => {
    try {
      const response = await fetch("/api/usuarios/update-role", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, role: newRole }),
      });

      const data = await response.json();

      if (data.success) {
        // Actualizar el usuario en la lista local
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId ? { ...user, role: newRole } : user
          )
        );
        setIsModalOpen(false);
        setSelectedUser(null);
      } else {
        alert("Error al actualizar el rol: " + data.error);
      }
    } catch (error) {
      console.error("Error al actualizar rol:", error);
      alert("Error al actualizar el rol del usuario");
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-emerald-900 mb-2">
          Gestión de Usuarios
        </h1>
        <p className="text-gray-600">Administra los usuarios y sus permisos.</p>
      </div>

      {/* Barra de búsqueda */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar por nombre o correo..."
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
            {filteredUsers.length} usuario(s) encontrado(s)
          </p>
        )}
      </div>

      {/* Tabla de usuarios */}
      {isLoading ? (
        <div className="bg-white rounded-lg shadow-md p-12 border border-emerald-100 text-center">
          <p className="text-gray-500">Cargando usuarios...</p>
        </div>
      ) : (
        <UserTable users={filteredUsers} onChangeRole={handleChangeRole} />
      )}

      {/* Modal para cambiar rol */}
      <ChangeRoleModal
        user={selectedUser}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedUser(null);
        }}
        onConfirm={handleConfirmRoleChange}
      />
    </div>
  );
}
