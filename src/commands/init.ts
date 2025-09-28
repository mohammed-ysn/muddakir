import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function initCommand() {
  try {
    console.log('Initialising database...');

    await execAsync('npx prisma migrate deploy');

    console.log('Seeding pages...');
    await execAsync('npx ts-node prisma/seed.ts');

    console.log('✓ Database initialised successfully');
  } catch (error) {
    console.error('Failed to initialise database:', error);
    process.exit(1);
  }
}