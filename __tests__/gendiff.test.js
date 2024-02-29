/* eslint-disable no-undef */
/* eslint-disable import/extensions */

import * as fs from 'node:fs';
import getDiff from '../src/getDiff.js';
import parse from '../src/parsers.js';
import getStylish from '../src/formatters/stylish.js';
import getPlain from '../src/formatters/plain.js';
import getJSON from '../src/formatters/json.js';

const filepathJSON = ['__fixtures__/file12.json', '__fixtures__/file22.json'];

const filepathYML = ['__fixtures__/file12.yml', '__fixtures__/file22.yml'];

const stylishParams = ['__fixtures__/test_stylish', 'utf-8'];
const plainParams = ['__fixtures__/test_plain', 'utf-8'];
const jsonParams = ['__fixtures__/test_json.txt', 'utf-8'];

describe.each([[stylishParams, getStylish], [plainParams, getPlain], [jsonParams, getJSON]])('gendiff (%#)', (parameters, formatFunc) => {
  test.each([['json', filepathJSON], ['yml', filepathYML]])('diff with (%p)', (extension, filepath) => {
    const [diffPath, decode] = parameters;
    const expectedDiff = fs.readFileSync(diffPath, decode);

    const [file1, file2] = filepath.map((currentPath) => {
      const content = fs.readFileSync(currentPath);
      return parse(content, extension);
    });

    const diff = getDiff(file1, file2);

    expect(formatFunc(diff)).toBe(expectedDiff);
  });
});
