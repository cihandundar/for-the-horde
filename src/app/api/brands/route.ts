import { prisma } from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        const brands = await prisma.Brands.findMany()
        return NextResponse.json({ brands }, { status: 200 })
    } catch (error) {
        console.error("API HATASI:", error)
        const errorMessage = error instanceof Error ? error.message : "Bilinmeyen bir hata oluştu"
        return NextResponse.json({ message: "Veritabanı hatası", error: errorMessage }, { status: 500 })
    }
}
