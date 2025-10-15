"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "../../services/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      const res = await apiClient.post("/auth/login", { email, password });
      const token = res.data.token ?? res.data.access_token ?? res.data;
      if (!token) throw new Error("No se recibió token.");
      localStorage.setItem("token", token);
      if (res.data.user) localStorage.setItem("user", JSON.stringify(res.data.user));
      router.push("/personalizar");
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Error al iniciar sesión");
    }
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>Iniciar sesión</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: 420, display: "grid", gap: 8 }}>
        <label>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Contraseña
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button type="submit">Entrar</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </main>
  );
}