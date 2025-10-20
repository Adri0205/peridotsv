import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth-utils";
import { deletePulsera } from "@/services/delete-pulsera";
import { revalidatePath } from "next/cache";

export async function DELETE(request) {
  try {
    const session = await requireAdmin();

    if (!session) {
      return NextResponse.json(
        { error: "No tienes permisos para realizar esta acción" },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID de pulsera es requerido" },
        { status: 400 }
      );
    }

    const pulsera = await deletePulsera(id);

    revalidatePath("/");

    return NextResponse.json({
      success: true,
      pulsera,
    });
  } catch (error) {
    console.error("Error al eliminar pulsera:", error);
    return NextResponse.json(
      { error: error.message || "Error al eliminar la pulsera" },
      { status: 500 }
    );
  }
}
