/* eslint-disable no-undef */
/* eslint-disable import/extensions */

import * as fs from 'node:fs';
import getDiff from '../src/getDiff.js';
import parse from '../src/parsers.js';
import getStylish from '../src/formatters/stylish.js';
import getPlain from '../src/formatters/plain.js';
import getJSON from '../src/formatters/json.js';

describe.each([['stylish', getStylish], ['plain', getPlain], ['json', getJSON]])('gendiff (%#)', (formatter, formatFunc) => {
  test.each([['json'], ['yml']])('diff with (%p)', (extension) => {
    const diffPath = `__fixtures__/test_${formatter}`;
    const expectedDiff = fs.readFileSync(diffPath, 'utf-8');

    const filepath = [
      `__fixtures__/file1.${extension}`,
      `__fixtures__/file2.${extension}`,
    ];

    const [file1, file2] = filepath.map((currentPath) => {
      const content = fs.readFileSync(currentPath);
      return parse(content, extension);
    });

    const diff = getDiff(file1, file2);

    expect(formatFunc(diff)).toBe(expectedDiff);
  });
});
