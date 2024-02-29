/* eslint-disable no-console */
/* eslint-disable import/extensions */

import { program } from 'commander';
import * as path from 'node:path';
import * as fs from 'node:fs';
import parse from './parsers.js';
import getDiff from './getDiff.js';
import getTree from './formatters/stylish.js';
import getPlain from './formatters/plain.js';
import getJSON from './formatters/json.js';

const doDiff = () => {
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
      const [file1, file2] = collection.map((item) => {
        const actualPath = path.resolve(process.cwd(), item);

        const fileContent = fs.readFileSync(actualPath);

        const getExtension = (filepath) => filepath.split('.').pop();

        return parse(fileContent, getExtension(item));
      });

      const formatter = format(type.format);

      switch (formatter) {
        case 'plain':
          console.log(getPlain(getDiff(file1, file2)));
          break;
        case 'json':
          console.log(getJSON(getDiff(file1, file2)));
          break;
        case 'stylish':
          console.log(getTree(getDiff(file1, file2)));
          break;
        default:
          console.log(`There is no such format like '${formatter}'`);
      }
    });

  program.parse();
};

export default doDiff;
