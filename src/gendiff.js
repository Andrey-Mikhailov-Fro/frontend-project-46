#!/usr/bin/env node
/* eslint-disable no-console */
/* eslint-disable import/extensions */

import { program } from 'commander';
import parse from './parsers.js';
import getDiff from './getDiff.js';
import getTree from './formatters/stylish.js';
import getPlain from './formatters/plain.js';
import getJSON from './formatters/json.js';

const doDiff = () => {
  // eslint-disable-next-line prefer-const

  const format = (type = 'stylish') => type;

  program
    .name('gendiff')
    .version('1.0.0')
    .description('Compares two configuration files and shows a difference.');

  program
    .arguments('<filepath1> <filepath2>')
    .option('-f, --format [type]', 'output format')
    .action((filepath1, filepath2, type) => {
      const collection = [filepath1, filepath2];
      const [file1, file2] = collection.map((item) => parse(item));

      const formatter = format(type.format);
      if (formatter === 'stylish') {
        console.log(getTree(getDiff(file1, file2)));
      }

      if (formatter === 'plain') {
        console.log(getPlain(getDiff(file1, file2)));
      }

      if (formatter === 'json') {
        console.log(getJSON(getDiff(file1, file2)));
      }
    });

  program.parse();
};

doDiff();

export default doDiff;
