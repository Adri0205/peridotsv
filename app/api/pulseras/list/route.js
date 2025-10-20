import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth-utils";
import { getPulseras } from "@/services/get-pulseras";

export async function GET(request) {
  try {
    const session = await requireAdmin();

    if (!session) {
      return NextResponse.json(
        { error: "No tienes permisos para realizar esta acción" },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const searchTerm = searchParams.get("search") || "";

    const pulseras = await getPulseras(searchTerm);

    revalidatePath("/");

    return NextResponse.json({
      success: true,
      pulseras,
    });
  } catch (error) {
    console.error("Error al obtener pulseras:", error);
    return NextResponse.json(
      { error: "Error al obtener las pulseras" },
      { status: 500 }
    );
  }
}
