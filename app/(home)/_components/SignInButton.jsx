"use client";

import { signIn } from "@/lib/auth-client";

export default function SignInButton() {
  const handleGoogleSignIn = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-semibold"
    >
      Iniciar Sesión
    </button>
  );
}
