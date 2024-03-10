import _ from 'lodash';

const doPlainDiff = (diff, currentPath = '', depth = 1) => {
  const getValue = (node) => {
    if (_.isObject(node)) {
      return '[complex value]';
    }

    if (typeof node === 'string') {
      return `'${node}'`;
    }

    return node;
  };

  const plainedDiff = diff.flatMap((item) => {
    const stringifiedPath = depth === 1 ? `${item.property}` : `${currentPath}.${item.property}`;

    if (item.state === 'deleted') {
      return `Property '${stringifiedPath}' was removed`;
    }

    if (item.state === 'added') {
      return `Property '${stringifiedPath}' was added with value: ${getValue(item.value)}`;
    }

    if (item.state === 'complex') {
      return doPlainDiff(item.children, stringifiedPath, depth + 1);
    }

    if (item.state === 'changed') {
      return `Property '${stringifiedPath}' was updated. From ${getValue(item.file1Value)} to ${getValue(item.file2Value)}`;
    }

    return null;
  }).filter((plainedString) => plainedString !== null).join('\n');

  return plainedDiff;
};

export default doPlainDiff;
