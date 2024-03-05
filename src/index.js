/* eslint-disable import/extensions */
import getDiff from './getDiff.js';
import getTree from './formatters/stylish.js';
import getPlain from './formatters/plain.js';
import getJSON from './formatters/json.js';

const doDiff = (file1, file2, typeFormat) => {
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
