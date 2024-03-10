/* eslint-disable import/extensions */
import * as path from 'node:path';
import * as fs from 'node:fs';
import parse from './parsers.js';
import getFormat from './formatters/formatter.js';

const getExtension = (filepath) => {
  const [, extension] = filepath.split('.');
  return extension;
};

const getFileContent = (filepath) => {
  const actualPath = path.resolve(process.cwd(), filepath);

  const fileContent = fs.readFileSync(actualPath);

  return fileContent;
};

const doDiff = (filepath1, filepath2, typeFormat) => {
  const content1 = getFileContent(filepath1);
  const file1 = parse(content1, getExtension(filepath1));

  const constent2 = getFileContent(filepath2);
  const file2 = parse(constent2, getExtension(filepath2));

  return getFormat(file1, file2, typeFormat);
};

export default doDiff;
