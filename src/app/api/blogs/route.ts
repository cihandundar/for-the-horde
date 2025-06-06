import { prisma } from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        console.log('Prisma instance:', prisma); // Debug log
        const blogs = await prisma.blogs.findMany();
        return NextResponse.json({ blogs });
    } catch (error) {
        console.error('Bloglar alınırken hata:', error);
        console.error('Prisma instance durumu:', {
            isPrismaDefined: !!prisma,
            prismaType: typeof prisma,
            prismaKeys: prisma ? Object.keys(prisma) : 'undefined'
        });
        
        return NextResponse.json(
            {
                message: 'Bir hata oluştu',
                error: error instanceof Error ? error.message : String(error),
                details: error instanceof Error ? error.stack : undefined
            },
            { status: 500 }
        );
    }
}
