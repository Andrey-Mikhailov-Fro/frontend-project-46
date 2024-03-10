import _ from 'lodash';

const determineState = (obj1, obj2, item) => {
  const conditions = [
    [!Object.hasOwn(obj2, item), 'deleted'],
    [!Object.hasOwn(obj1, item), 'added'],
    [(_.isObject(obj1[item]) && _.isObject(obj2[item])), 'complex'],
    [(!_.isEqual(obj1[item], obj2[item])), 'changed'],
    [(_.isEqual(obj1[item], obj2[item])), 'unchanged'],
  ];

  const [state] = conditions.map(([condition, nodeState]) => {
    if (condition === true) {
      return nodeState;
    }

    return '';
  }).filter((rightState) => rightState !== '');

  return state;
};

const getDiff = (obj1, obj2) => {
  const properties = _.sortBy(_.uniq(Object.keys({ ...obj1, ...obj2 })));
  const diffObj = properties.map((property) => {
    const state = determineState(obj1, obj2, property);

    switch (state) {
      case 'deleted':
        return { property, state, value: obj1[property] };
      case 'added':
        return { property, state, value: obj2[property] };
      case 'complex':
        return { property, state, children: getDiff(obj1[property], obj2[property]) };
      case 'changed':
        return {
          property,
          state,
          file1Value: obj1[property],
          file2Value: obj2[property],
        };
      default:
        return { property, state, value: obj1[property] };
    }
  });

  return diffObj;
};

export default getDiff;
