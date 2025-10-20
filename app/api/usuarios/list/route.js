import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth-utils";
import { getUsuarios } from "@/services/get-usuarios";

export async function GET(request) {
  try {
    // Verificar que el usuario es admin
    const session = await requireAdmin();

    if (!session) {
      return NextResponse.json(
        { error: "No tienes permisos para realizar esta acción" },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const searchTerm = searchParams.get("search") || "";

    const users = await getUsuarios(searchTerm);

    return NextResponse.json({
      success: true,
      users,
    });
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return NextResponse.json(
      { error: "Error al obtener los usuarios" },
      { status: 500 }
    );
  }
}
