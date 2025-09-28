import { prisma } from './database';

export async function markPageAsMemorised(pageNumber: number, date?: Date) {
  const page = await prisma.page.findUnique({
    where: { pageNumber },
  });

  if (!page) {
    throw new Error(`Page ${pageNumber} not found`);
  }

  const existing = await prisma.memorisation.findUnique({
    where: { pageId: page.id },
  });

  if (existing) {
    return existing;
  }

  return await prisma.memorisation.create({
    data: {
      pageId: page.id,
      date: date || new Date(),
    },
  });
}

export async function getMemorisation(pageNumber: number) {
  const page = await prisma.page.findUnique({
    where: { pageNumber },
    include: { memorisation: true },
  });

  return page?.memorisation || null;
}

export async function deleteMemorisation(pageNumber: number) {
  const page = await prisma.page.findUnique({
    where: { pageNumber },
    include: { memorisation: true },
  });

  if (!page?.memorisation) {
    return null;
  }

  return await prisma.memorisation.delete({
    where: { id: page.memorisation.id },
  });
}

export async function getAllMemorisedPages() {
  return await prisma.page.findMany({
    where: {
      memorisation: { isNot: null },
    },
    include: { memorisation: true },
    orderBy: { pageNumber: 'asc' },
  });
}