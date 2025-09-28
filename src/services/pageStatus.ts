import { prisma } from './database';
import { PageStaleness, StalenessLevel } from '../models/staleness';
import { calculateDaysSince, getStalenessLevel } from '../utils/staleness';

export async function getPageStaleness(pageNumber: number): Promise<PageStaleness | null> {
  const page = await prisma.page.findUnique({
    where: { pageNumber },
    include: {
      memorisation: true,
      revisions: {
        orderBy: { date: 'desc' },
        take: 1,
      },
    },
  });

  if (!page) {
    return null;
  }

  const lastRevision = page.revisions[0] || null;
  const daysSinceLastRevision = lastRevision ? calculateDaysSince(lastRevision.date) : null;

  return {
    pageNumber: page.pageNumber,
    level: getStalenessLevel(daysSinceLastRevision),
    daysSinceLastRevision,
    lastRevisionDate: lastRevision?.date || null,
    memorisedDate: page.memorisation?.date || null,
  };
}

export async function getAllPageStaleness(): Promise<PageStaleness[]> {
  const pages = await prisma.page.findMany({
    where: {
      memorisation: { isNot: null },
    },
    include: {
      memorisation: true,
      revisions: {
        orderBy: { date: 'desc' },
        take: 1,
      },
    },
    orderBy: { pageNumber: 'asc' },
  });

  return pages.map((page) => {
    const lastRevision = page.revisions[0] || null;
    const daysSinceLastRevision = lastRevision ? calculateDaysSince(lastRevision.date) : null;

    return {
      pageNumber: page.pageNumber,
      level: getStalenessLevel(daysSinceLastRevision),
      daysSinceLastRevision,
      lastRevisionDate: lastRevision?.date || null,
      memorisedDate: page.memorisation?.date || null,
    };
  });
}

export async function getPagesByStalenesLevel(level: StalenessLevel): Promise<PageStaleness[]> {
  const allPages = await getAllPageStaleness();
  return allPages.filter((page) => page.level === level);
}