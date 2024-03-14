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

  return parse(fileContent, getExtension(filepath));
};

const doDiff = (filepath1, filepath2, typeFormat) => {
  const fileData1 = getFileContent(filepath1);

  const fileData2 = getFileContent(filepath2);

  return getFormat(fileData1, fileData2, typeFormat);
};

export default doDiff;
