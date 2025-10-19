"use client";

import { useSession, signOut } from "@/lib/auth-client";

export default function UserProfile() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return <div>Cargando...</div>;
  }

  if (!session) {
    return null;
  }

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="flex items-center gap-4">
      {session.user?.image && (
        <img
          src={session.user.image}
          alt={session.user.name || "Usuario"}
          className="w-10 h-10 rounded-full"
        />
      )}
      <div className="flex flex-col">
        <span className="font-medium">{session.user?.name}</span>
        <span className="text-sm text-gray-500">{session.user?.email}</span>
        {session.user?.role === "admin" && (
          <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full w-fit">
            Admin
          </span>
        )}
      </div>
      <button
        onClick={handleSignOut}
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
      >
        Cerrar sesión
      </button>
    </div>
  );
}
