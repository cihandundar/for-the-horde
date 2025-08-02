import { prisma } from "@/lib/prismadb";
import { NextResponse } from "next/server";

interface Params {
    params: { id: string };
}

export async function GET(req: Request, { params }: Params) {
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
