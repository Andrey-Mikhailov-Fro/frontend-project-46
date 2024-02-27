import _ from 'lodash';

const plain = (diff, currentPath = [], depth = 1) => {
  const getSimpleValue = (node) => {
    if (_.isObject(node)) {
      return '[complex value]';
    }

    if (typeof node === 'string') {
      return `'${node}'`;
    }

    return node;
  };

  const plainDiff = diff.flatMap((item) => {
    if (depth <= currentPath.length) {
      currentPath.splice(depth - 1);
    }

    currentPath.push(item.property);

    const stringifiedPath = [...currentPath].join('.');

    if (item.state === 'deleted') {
      return `Property '${stringifiedPath}' was removed`;
    }

    if (item.state === 'added') {
      return `Property '${stringifiedPath}' was added with value: ${getSimpleValue(item.value)}`;
    }

    if (item.state === 'complex') {
      return plain(item.children, currentPath, depth + 1);
    }

    if (item.state === 'changed') {
      return `Property '${stringifiedPath}' was updated. From ${getSimpleValue(item.oldValue)} to ${getSimpleValue(item.newValue)}`;
    }

    return null;
  }).filter((plainedString) => plainedString !== null).join('\n');

  return plainDiff;
};

export default plain;
