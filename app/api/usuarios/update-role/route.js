import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth-utils";
import { updateUserRole } from "@/services/update-user-role";

export async function POST(request) {
  try {
    // Verificar que el usuario es admin
    const session = await requireAdmin();

    if (!session) {
      return NextResponse.json(
        { error: "No tienes permisos para realizar esta acción" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { userId, role } = body;

    if (!userId || !role) {
      return NextResponse.json(
        { error: "userId y role son requeridos" },
        { status: 400 }
      );
    }

    const updatedUser = await updateUserRole(userId, role);

    return NextResponse.json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error al actualizar rol:", error);
    return NextResponse.json(
      { error: error.message || "Error al actualizar el rol del usuario" },
      { status: 500 }
    );
  }
}
