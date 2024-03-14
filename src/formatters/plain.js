import _ from 'lodash';

const getValue = (node) => {
  if (_.isObject(node)) {
    return '[complex value]';
  }

  if (typeof node === 'string') {
    return `'${node}'`;
  }

  return node;
};

const doPlainDiff = (diff, currentPath = '', depth = 1) => {
  const plainedDiff = diff.flatMap((item) => {
    const stringifiedPath = depth === 1 ? `${item.property}` : `${currentPath}.${item.property}`;

    switch (item.changeType) {
      case 'deleted':
        return `Property '${stringifiedPath}' was removed`;
      case 'added':
        return `Property '${stringifiedPath}' was added with value: ${getValue(item.value)}`;
      case 'complex':
        return doPlainDiff(item.children, stringifiedPath, depth + 1);
      case 'changed':
        return `Property '${stringifiedPath}' was updated. From ${getValue(item.file1Value)} to ${getValue(item.file2Value)}`;
      default:
        return null;
    }
  }).filter((plainedString) => plainedString !== null).join('\n');

  return plainedDiff;
};

export default doPlainDiff;
