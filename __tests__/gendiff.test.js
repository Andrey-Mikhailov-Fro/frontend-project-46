/* eslint-disable no-undef */
/* eslint-disable import/extensions */

import * as fs from 'node:fs';
import getDiff from '../src/getDiff.js';
import parse from '../src/parsers.js';
import getStylish from '../src/formatters/stylish.js';
import getPlain from '../src/formatters/plain.js';
import getJSON from '../src/formatters/json.js';

const file1JSON = parse('__fixtures__/file12.json');
const file2JSON = parse('__fixtures__/file22.json');

const file1YML = parse('__fixtures__/file12.yml');
const file2YML = parse('__fixtures__/file22.yml');

const baseDiffJSON = getDiff(file1JSON, file2JSON);
const baseDiffYML = getDiff(file1YML, file2YML);

test('gendiff stylish', () => {
  const diffStylish = fs.readFileSync('__fixtures__/test_stylish', 'utf-8');
  expect(getStylish(baseDiffJSON)).toBe(diffStylish);
  expect(getStylish(baseDiffYML)).toBe(diffStylish);
});

test('gendiff plain', () => {
  const diffPlain = fs.readFileSync('__fixtures__/test_plain', 'utf-8');
  expect(getPlain(baseDiffJSON)).toBe(diffPlain);
  expect(getPlain(baseDiffYML)).toBe(diffPlain);
});

test('gendiff plain', () => {
  const diffJSON = fs.readFileSync('__fixtures__/test_json.txt', 'utf-8');
  expect(getJSON(baseDiffJSON)).toBe(diffJSON);
  expect(getJSON(baseDiffYML)).toBe(diffJSON);
});
