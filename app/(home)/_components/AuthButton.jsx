"use client";

import { useSession, signIn, signOut } from "@/lib/auth-client";

export default function AuthButton() {
  const { data: session, isPending } = useSession();

  const handleSignIn = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/";
        },
      },
    });
  };

  // Mostrar loading mientras carga la sesión
  if (isPending) {
    return (
      <div className="px-6 py-2 bg-gray-100 text-gray-400 rounded-lg font-semibold animate-pulse">
        Cargando...
      </div>
    );
  }

  // Si hay sesión, mostrar el perfil
  if (session?.user) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3">
          {session.user.image && (
            <img
              src={session.user.image}
              alt={session.user.name || "Usuario"}
              className="w-10 h-10 rounded-full border-2 border-emerald-200"
            />
          )}
          <div className="hidden md:flex flex-col">
            <span className="font-semibold text-gray-900 text-sm">
              {session.user.name}
            </span>
            <span className="text-xs text-gray-500">{session.user.email}</span>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold text-sm"
        >
          Cerrar Sesión
        </button>
      </div>
    );
  }

  // Si no hay sesión, mostrar botón de inicio de sesión
  return (
    <button
      onClick={handleSignIn}
      className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-semibold"
    >
      Iniciar Sesión
    </button>
  );
}
