"use client";

import UserRow from "./UserRow";

export default function UserTable({ users, onChangeRole }) {
  if (users.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-12 border border-emerald-100 text-center">
        <p className="text-gray-500">No se encontraron usuarios</p>
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
                Usuario
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-900">
                Rol
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-900">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <UserRow key={user.id} user={user} onChangeRole={onChangeRole} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
