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

  for (let i = 1; i <= totalPages; i++) {
    await prisma.page.upsert({
      where: { pageNumber: i },
      update: {},
      create: { pageNumber: i },
    });
  }

  console.log(`Seeded ${totalPages} pages`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });