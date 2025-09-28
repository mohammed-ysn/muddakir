import { StalenessLevel } from '../models/staleness';

export function calculateDaysSince(date: Date): number {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

export function getStalenessLevel(daysSinceLastRevision: number | null): StalenessLevel {
  if (daysSinceLastRevision === null) {
    return StalenessLevel.NeverRevised;
  }

  if (daysSinceLastRevision <= 7) {
    return StalenessLevel.Fresh;
  }

  if (daysSinceLastRevision <= 30) {
    return StalenessLevel.Stale;
  }

  return StalenessLevel.VeryStale;
}