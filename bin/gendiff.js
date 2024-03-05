#!/usr/bin/env node

/* eslint-disable import/extensions */
/* eslint-disable no-console */
import { program } from 'commander';
import gendiff from '../src/index.js';

program
  .name('gendiff')
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.');

program
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2, type) => {
    console.log(gendiff(filepath1, filepath2, type.format));
  })
  .parse();
