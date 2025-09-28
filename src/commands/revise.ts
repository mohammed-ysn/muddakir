import { addRevision, disconnect } from '../services';

export async function reviseCommand(page: string, quality: string) {
  try {
    const pageNumber = parseInt(page, 10);
    const qualityScore = parseInt(quality, 10);

    if (isNaN(pageNumber) || pageNumber < 1 || pageNumber > 604) {
      console.error('Invalid page number. Must be between 1 and 604.');
      process.exit(1);
    }

    if (isNaN(qualityScore) || qualityScore < 1 || qualityScore > 5) {
      console.error('Invalid quality score. Must be between 1 and 5.');
      process.exit(1);
    }

    const revision = await addRevision(pageNumber, qualityScore);
    console.log(`✓ Revision logged for page ${pageNumber}`);
    console.log(`  Quality: ${qualityScore}/5`);
    console.log(`  Date: ${revision.date.toLocaleDateString()}`);
  } catch (error: any) {
    console.error('Error:', error.message);
    process.exit(1);
  } finally {
    await disconnect();
  }
}