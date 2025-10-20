import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth-utils";
import { updatePulsera } from "@/services/update-pulsera";

export async function PUT(request) {
  try {
    const session = await requireAdmin();

    if (!session) {
      return NextResponse.json(
        { error: "No tienes permisos para realizar esta acción" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json(
        { error: "ID de pulsera es requerido" },
        { status: 400 }
      );
    }

    const pulsera = await updatePulsera(id, data);

    return NextResponse.json({
      success: true,
      pulsera,
    });
  } catch (error) {
    console.error("Error al actualizar pulsera:", error);
    return NextResponse.json(
      { error: error.message || "Error al actualizar la pulsera" },
      { status: 500 }
    );
  }
}
