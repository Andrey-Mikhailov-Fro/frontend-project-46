/* eslint-disable import/extensions */
import * as path from 'node:path';
import * as fs from 'node:fs';
import parse from './parsers.js';
import getDiff from './getDiff.js';
import getTree from './formatters/stylish.js';
import getPlain from './formatters/plain.js';
import getJSON from './formatters/json.js';

const doDiff = (filepath1, filepath2, typeFormat) => {
  const collection = [filepath1, filepath2];
  const [file1, file2] = collection.map((item) => {
    const actualPath = path.resolve(process.cwd(), item);

    const fileContent = fs.readFileSync(actualPath);

    const getExtension = (filepath) => filepath.split('.').pop();

    return parse(fileContent, getExtension(item));
  });

  const format = (type = 'stylish') => type;

  const formatter = format(typeFormat);

  switch (formatter) {
    case 'plain':
      return getPlain(getDiff(file1, file2));
    case 'json':
      return getJSON(getDiff(file1, file2));
    case 'stylish':
      return getTree(getDiff(file1, file2));
    default:
      throw new Error(`There is no such supported format like '${formatter}'`);
  }
};

export default doDiff;
