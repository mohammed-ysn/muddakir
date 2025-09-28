#!/usr/bin/env node

import { Command } from 'commander';
import { initCommand } from './commands/init';
import { memoriseCommand } from './commands/memorise';
import { reviseCommand } from './commands/revise';
import { statusCommand } from './commands/status';
import { staleCommand } from './commands/stale';

const programme = new Command();

programme
  .name('muddakir')
  .description('CLI tool for tracking Quran memorisation and revision')
  .version('0.1.0');

programme
  .command('init')
  .description('Initialise database and seed pages')
  .action(initCommand);

programme
  .command('memorise <page>')
  .description('Mark a page as memorised')
  .action(memoriseCommand);

programme
  .command('revise <page> <quality>')
  .description('Log a revision session (quality: 1-5)')
  .action(reviseCommand);

programme
  .command('status')
  .description('View overall memorisation progress')
  .action(statusCommand);

programme
  .command('stale')
  .description('List pages needing revision')
  .action(staleCommand);

programme.parse(process.argv);