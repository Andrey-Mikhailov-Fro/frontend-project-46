/* eslint-disable no-undef */
/* eslint-disable import/extensions */

import * as fs from 'node:fs';
import genDiff from '../src/getdiff.js';
import parse from '../src/parsers.js';

const file1 = parse('__fixtures__/file12.json');

const file2 = parse('__fixtures__/file22.json');

const file1YML = parse('__fixtures__/file12.yml');

const file2YML = parse('__fixtures__/file22.yml');

const diffFile = fs.readFileSync('__fixtures__/test_diff');

test('gendiff_JSON', () => {
  expect(genDiff(file1, file2).match(diffFile));
});

test('gendiff_YAML', () => {
  expect(genDiff(file1YML, file2YML).match(diffFile));
});
