export enum StalenessLevel {
  Fresh = 'fresh',
  Stale = 'stale',
  VeryStale = 'very-stale',
  NeverRevised = 'never-revised',
}

export interface PageStaleness {
  pageNumber: number;
  level: StalenessLevel;
  daysSinceLastRevision: number | null;
  lastRevisionDate: Date | null;
  memorisedDate: Date | null;
}