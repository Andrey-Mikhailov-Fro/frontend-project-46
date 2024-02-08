/* eslint-disable no-undef */
/* eslint-disable import/extensions */

import genDiff from '../src/getdiff.js';

const file1 = {
  aKey: 'value1_before',
  bKey: 'value2_before',
};

const file2 = {
  aKey: 'value1_after',
  bKey: 'value2_before',
  cKey: 'new_value',
};

const diff = '{\n - aKey: value1_before,\n + aKey: value1_after,\n   bKey: value2_before,\n + cKey: new_value\n}';

test('gendiff', () => {
  expect(genDiff(file1, file2).match(diff));
});
