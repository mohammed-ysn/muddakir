import { prisma } from './database';

export async function addRevision(pageNumber: number, quality: number, date?: Date) {
  if (quality < 1 || quality > 5) {
    throw new Error('Quality must be between 1 and 5');
  }

  const page = await prisma.page.findUnique({
    where: { pageNumber },
  });

  if (!page) {
    throw new Error(`Page ${pageNumber} not found`);
  }

  return await prisma.revision.create({
    data: {
      pageId: page.id,
      quality,
      date: date || new Date(),
    },
  });
}

export async function getRevisions(pageNumber: number) {
  const page = await prisma.page.findUnique({
    where: { pageNumber },
    include: {
      revisions: {
        orderBy: { date: 'desc' },
      },
    },
  });

  return page?.revisions || [];
}

export async function getLastRevision(pageNumber: number) {
  const page = await prisma.page.findUnique({
    where: { pageNumber },
    include: {
      revisions: {
        orderBy: { date: 'desc' },
        take: 1,
      },
    },
  });

  return page?.revisions[0] || null;
}

export async function deleteRevision(revisionId: number) {
  return await prisma.revision.delete({
    where: { id: revisionId },
  });
}