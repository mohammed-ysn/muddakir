import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.config.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      totalPages: 604,
    },
  });

  const config = await prisma.config.findUnique({ where: { id: 1 } });
  const totalPages = config?.totalPages || 604;

  const existingCount = await prisma.page.count();

  if (existingCount === 0) {
    const pages = Array.from({ length: totalPages }, (_, i) => ({
      pageNumber: i + 1,
    }));

    await prisma.page.createMany({
      data: pages,
    });

    console.log(`Seeded ${totalPages} pages`);
  } else {
    console.log(`Database already seeded with ${existingCount} pages`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });