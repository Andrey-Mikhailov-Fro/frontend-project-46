/* eslint-disable import/extensions */
import getDiff from '../getDiff.js';
import getPlain from './plain.js';
import getTree from './stylish.js';
import getJSON from './json.js';

export default (file1, file2, type = 'stylish') => {
  const formatter = type;

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
