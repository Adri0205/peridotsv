"use client";

import Link from "next/link";

export default function SignInButton() {
  return (
    <Link
      href="/login"
      className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-semibold inline-block"
    >
      Iniciar Sesión
    </Link>
  );
}
