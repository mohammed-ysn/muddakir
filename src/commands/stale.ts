import { getAllPageStaleness, disconnect } from '../services';
import { StalenessLevel } from '../models/staleness';

export async function staleCommand() {
  try {
    const allPages = await getAllPageStaleness();

    const needsAttention = allPages.filter(
      (p) =>
        p.level === StalenessLevel.Stale ||
        p.level === StalenessLevel.VeryStale ||
        p.level === StalenessLevel.NeverRevised
    );

    if (needsAttention.length === 0) {
      console.log('✓ All memorised pages are fresh!');
      return;
    }

    console.log('\nPages Needing Revision');
    console.log('======================\n');

    needsAttention.sort((a, b) => {
      const order = {
        [StalenessLevel.VeryStale]: 0,
        [StalenessLevel.NeverRevised]: 1,
        [StalenessLevel.Stale]: 2,
        [StalenessLevel.Fresh]: 3,
      };
      return order[a.level] - order[b.level];
    });

    for (const page of needsAttention) {
      const levelEmoji =
        page.level === StalenessLevel.VeryStale
          ? '🔴'
          : page.level === StalenessLevel.NeverRevised
          ? '⚪'
          : '🟡';

      const daysText = page.daysSinceLastRevision
        ? `${page.daysSinceLastRevision} days ago`
        : 'never revised';

      console.log(`${levelEmoji} Page ${page.pageNumber.toString().padStart(3)} - ${daysText}`);
    }

    console.log(`\nTotal: ${needsAttention.length} pages`);
  } catch (error: any) {
    console.error('Error:', error.message);
    process.exit(1);
  } finally {
    await disconnect();
  }
}