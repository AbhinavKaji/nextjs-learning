import { PrismaClient, Prisma } from "@/generated/prisma/client";

const prisma = new PrismaClient();
const demoUserId = "ff5c68a4-bd6f-4c71-940c-40775913d24e";

const productData: Prisma.ProductCreateInput[] = Array.from({ length: 25 }).map((_, i) => ({
      userId: demoUserId,
      name: `Product ${i + 1}`,
      price: (Math.random() * 90 + 10).toFixed(2),
      quantity: Math.floor(Math.random() * 20),
      lowStockAt: 5,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * (i * 5)),
    }));

export async function main() {
  for (const u of productData) {
    await prisma.product.createMany({ data: u });
  }
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });