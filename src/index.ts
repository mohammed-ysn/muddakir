#!/usr/bin/env node

import { Command } from 'commander';

const programme = new Command();

programme
  .name('muddakir')
  .description('CLI tool for tracking Quran memorisation and revision')
  .version('0.1.0');

programme.parse(process.argv);