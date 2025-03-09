import { writeClient } from "@/sanity/lib/write-client";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) return NextResponse.json({ error: "ID gerekli" }, { status: 400 });

    await writeClient.delete(id); // Sanity'den blogu sil

    return NextResponse.json({ message: "Silme işlemi başarılı" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

//write-client'i, server-only comp ile kullanamazsın bu sebeple api içinde route oluşturdum