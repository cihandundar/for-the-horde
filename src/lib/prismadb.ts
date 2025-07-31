import { PrismaClient } from '../generated/prisma';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = prisma;
}

export default prisma;

// Blog verisini id ile çekmek için fonksiyon:
export async function getBlogById(id: string) {
  const blog = await prisma.blogs.findUnique({
    where: { id },
  });
  return blog;
}