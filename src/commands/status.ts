import { getAllPageStaleness, disconnect } from '../services';
import { StalenessLevel } from '../models/staleness';

export async function statusCommand() {
  try {
    const allPages = await getAllPageStaleness();

    const fresh = allPages.filter((p) => p.level === StalenessLevel.Fresh);
    const stale = allPages.filter((p) => p.level === StalenessLevel.Stale);
    const veryStale = allPages.filter((p) => p.level === StalenessLevel.VeryStale);
    const neverRevised = allPages.filter((p) => p.level === StalenessLevel.NeverRevised);

    console.log('\nMemorisation Status');
    console.log('===================');
    console.log(`Total memorised: ${allPages.length}/604`);
    console.log(`\nFresh (0-7 days):        ${fresh.length}`);
    console.log(`Stale (8-30 days):       ${stale.length}`);
    console.log(`Very Stale (31+ days):   ${veryStale.length}`);
    console.log(`Never Revised:           ${neverRevised.length}`);
  } catch (error: any) {
    console.error('Error:', error.message);
    process.exit(1);
  } finally {
    await disconnect();
  }
}