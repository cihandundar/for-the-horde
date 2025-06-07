import { prisma } from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function GET() {
    try {

        const blogs = await prisma.blogs.findMany()
        return NextResponse.json({ blogs }, { status: 200 })
    } catch (error) {
        console.error("API HATASI:", error)
        const errorMessage = error instanceof Error ? error.message : "Bilinmeyen bir hata oluştu"
        if (errorMessage.includes("Failed to convert") && errorMessage.includes("DateTime")) {
            return NextResponse.json(
                {
                    message: "Tarih formatı hatası",
                    error: "Veritabanındaki tarih alanları uyumsuz. Lütfen veritabanını düzeltin veya şemayı güncelleyin.",
                    suggestion: "Prisma şemasında createdAt alanını String olarak değiştirmeyi deneyin.",
                },
                { status: 500 },
            )
        }
        return NextResponse.json({ message: "Veritabanı hatası", error: errorMessage }, { status: 500 })
    }
}
