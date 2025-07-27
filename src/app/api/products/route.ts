import { prisma } from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const products = await prisma.Products.findMany();
        return NextResponse.json({ customproducts: products }, { status: 200 });
    } catch (error) {
        console.error("API HATASI:", error);
        const errorMessage = error instanceof Error ? error.message : "Bilinmeyen bir hata oluştu";
        return NextResponse.json(
            { message: "Veritabanı hatası", error: errorMessage },
            { status: 500 }
        );
    }
}
