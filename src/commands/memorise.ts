import { markPageAsMemorised, disconnect } from '../services';

export async function memoriseCommand(page: string) {
  try {
    const pageNumber = parseInt(page, 10);

    if (isNaN(pageNumber) || pageNumber < 1 || pageNumber > 604) {
      console.error('Invalid page number. Must be between 1 and 604.');
      process.exit(1);
    }

    const memorisation = await markPageAsMemorised(pageNumber);
    console.log(`✓ Page ${pageNumber} marked as memorised`);
    console.log(`  Date: ${memorisation.date.toLocaleDateString()}`);
  } catch (error: any) {
    console.error('Error:', error.message);
    process.exit(1);
  } finally {
    await disconnect();
  }
}