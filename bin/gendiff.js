#!/usr/bin/env node

/* eslint-disable import/extensions */
/* eslint-disable no-console */
import { program } from 'commander';
import * as path from 'node:path';
import * as fs from 'node:fs';
import parse from '../src/parsers.js';
import gendiff from '../src/index.js';

program
  .name('gendiff')
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.');

program
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2, type) => {
    const collection = [filepath1, filepath2];
    const [file1, file2] = collection.map((item) => {
      const actualPath = path.resolve(process.cwd(), item);

      const fileContent = fs.readFileSync(actualPath);

      const getExtension = (filepath) => filepath.split('.').pop();

      return parse(fileContent, getExtension(item));
    });

    console.log(gendiff(file1, file2, type.format));
  })
  .parse();
