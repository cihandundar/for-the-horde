import { prisma } from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const product = await prisma.Products.findUnique({
            where: {
                id: params.id,
            },
        });

        if (!product) {
            return NextResponse.json(
                { message: "Product not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ product }, { status: 200 });
    } catch (error) {
        console.error("API HATASI:", error);
        const errorMessage =
            error instanceof Error ? error.message : "Bilinmeyen bir hata oluştu";
        return NextResponse.json(
            { message: "Veritabanı hatası", error: errorMessage },
            { status: 500 }
        );
    }
}
