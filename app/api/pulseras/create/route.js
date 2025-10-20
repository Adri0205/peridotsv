import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth-utils";
import { createPulsera } from "@/services/create-pulsera";
import { revalidatePath } from "next/cache";

export async function POST(request) {
  try {
    const session = await requireAdmin();

    if (!session) {
      return NextResponse.json(
        { error: "No tienes permisos para realizar esta acción" },
        { status: 403 }
      );
    }

    const body = await request.json();

    const pulsera = await createPulsera(body);

    revalidatePath("/");

    return NextResponse.json({
      success: true,
      pulsera,
    });
  } catch (error) {
    console.error("Error al crear pulsera:", error);
    return NextResponse.json(
      { error: error.message || "Error al crear la pulsera" },
      { status: 500 }
    );
  }
}
