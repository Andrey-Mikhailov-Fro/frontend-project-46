import _ from 'lodash';

const getValue = (data, innerDepth) => {
  if (data === null) {
    return 'null';
  }

  if (!_.isObject(data)) {
    return `${data}`;
  }

  const innerSpace = ' '.repeat(4 * innerDepth);
  const outerSpace = ' '.repeat(4 * (innerDepth - 1));

  const benches = Object.entries(data).map(([key, value]) => {
    const reachedValue = getValue(value, innerDepth + 1);
    const bench = `${innerSpace}${key}: ${reachedValue}`;
    return bench;
  });

  const innerTree = `{\n${benches.join('\n')}\n${outerSpace}}`;

  return innerTree;
};

const generateTree = (diff, depth = 1) => {
  const space = ' '.repeat(4 * depth - 3);
  const lockSpace = ' '.repeat(4 * (depth - 1));

  const tree = diff.flatMap((node) => {
    switch (node.changeType) {
      case 'deleted':
        return `${space}- ${node.property}: ${getValue(node.value, depth + 1)}`;
      case 'added':
        return `${space}+ ${node.property}: ${getValue(node.value, depth + 1)}`;
      case 'complex':
        return `${space}  ${node.property}: ${generateTree(node.children, depth + 1)}`;
      case 'changed':
        return [`${space}- ${node.property}: ${getValue(node.file1Value, depth + 1)}`, `${space}+ ${node.property}: ${getValue(node.file2Value, depth + 1)}`];
      default:
        return `${space}  ${node.property}: ${getValue(node.value)}`;
    }
  });

  const completedTree = depth === 1 ? `{\n ${tree.join('\n ')}\n}` : `{\n ${tree.join('\n ')}\n${lockSpace}}`;

  return completedTree;
};

export default generateTree;
