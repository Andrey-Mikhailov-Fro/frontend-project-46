#!/usr/bin/env node
/* eslint-disable import/extensions */

import { program } from 'commander';
import parse from './parsers.js';
import genDiff from './getdiff.js';

const doDiff = () => {
  const command = (filepath1, filepath2) => {
    const collection = [filepath1, filepath2];
    const [file1, file2] = collection.map((item) => parse(item));
    // eslint-disable-next-line no-console
    console.log(genDiff(file1, file2));
  };

  program
    .name('gendiff')
    .version('1.0.0')
    .description('Compares two configuration files and shows a difference.')
    .arguments('<filepath1> <filepath2>')
    .action(command);

  program
    .option('-f, --format [type]', 'output format');

  program.parse();
};

doDiff();

export default doDiff;
