import { prisma } from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        const blogs = await prisma.Blogs.findMany()
        return NextResponse.json({ blogs }, { status: 200 })
    } catch (error) {
        console.error("🔥 API HATASI DETAY:", error)
        return NextResponse.json(
            { message: "Veritabanı hatası", error: error instanceof Error ? error.message : error },
            { status: 500 }
        )
    }
}
