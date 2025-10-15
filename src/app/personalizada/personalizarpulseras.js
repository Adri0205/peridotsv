"use client";

import { useEffect, useState } from "react";
import { apiClient } from "../../services/api";

export default function Personalizar() {
  const [options, setOptions] = useState({ cuentas: [], dijes: [], colores: [] });
  const [selected, setSelected] = useState({
    cuenta: "",
    dije: "",
    color: "negro",
    largo: 18,
    cantidad: 1,
  });
  const [msg, setMsg] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await apiClient.get("/pulseras/options");
        setOptions(res.data);
      } catch (e) {
        setOptions({
          cuentas: ["cristal", "madera", "metal"],
          dijes: ["corazon", "estrella", "inicial"],
          colores: ["negro", "blanco", "dorado", "plateado"],
        });
      }
    }
    load();
  }, []);

  function update(field, value) {
    setSelected(s => ({ ...s, [field]: value }));
  }

  async function addToCart() {
    setMsg("");
    const payload = { tipo: "personalizada", configuracion: selected };
    try {
      await apiClient.post("/cart", payload);
      setMsg("Pulsera añadida al carrito.");
    } catch (e) {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      cart.push(payload);
      localStorage.setItem("cart", JSON.stringify(cart));
      setMsg("Guardado en carrito local.");
    }
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>Personaliza tu pulsera</h1>
      <div style={{ display: "flex", gap: 24 }}>
        <div style={{ minWidth: 260 }}>
          <label>
            Cuentas
            <select value={selected.cuenta} onChange={(e) => update("cuenta", e.target.value)}>
              <option value="">-- Elige --</option>
              {options.cuentas.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </label>

          <label>
            Dije
            <select value={selected.dije} onChange={(e) => update("dije", e.target.value)}>
              <option value="">-- Elige --</option>
              {options.dijes.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </label>

          <label>
            Color
            <select value={selected.color} onChange={(e) => update("color", e.target.value)}>
              {options.colores.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </label>

          <label>
            Largo (cm)
            <input type="number" min="10" max="25" value={selected.largo} onChange={(e) => update("largo", e.target.value)} />
          </label>

          <label>
            Cantidad
            <input type="number" min="1" value={selected.cantidad} onChange={(e) => update("cantidad", e.target.value)} />
          </label>

          <button onClick={addToCart}>Añadir al carrito</button>
          {msg && <p>{msg}</p>}
        </div>

        <div style={{ flex: 1 }}>
          <h3>Vista previa</h3>
          <div style={{ border: "1px solid #ddd", padding: 16, borderRadius: 8 }}>
            <p><strong>Cuentas:</strong> {selected.cuenta || "—"}</p>
            <p><strong>Dije:</strong> {selected.dije || "—"}</p>
            <p><strong>Color:</strong> {selected.color}</p>
            <p><strong>Largo:</strong> {selected.largo} cm</p>
            <p><strong>Cantidad:</strong> {selected.cantidad}</p>
          </div>
        </div>
      </div>
    </main>
  );
}