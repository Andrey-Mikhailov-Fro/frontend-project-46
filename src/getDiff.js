import _ from 'lodash';

const determineState = (obj1, obj2, item) => {
  const state = [
    !Object.hasOwn(obj2, item) ? 'deleted' : '',
    !Object.hasOwn(obj1, item) ? 'added' : '',
    (_.isObject(obj1[item]) && _.isObject(obj2[item])) ? 'complex' : '',
    (!_.isEqual(obj1[item], obj2[item])) ? 'changed' : '',
    (_.isEqual(obj1[item], obj2[item])) ? 'unchanged' : '',
  ].filter((result) => result !== '');

  const [result] = state;

  return result;
};

const getDiff = (objBefore, objAfter) => {
  const properties = _.sortBy(_.uniq(Object.keys({ ...objBefore, ...objAfter })));
  const diffObj = properties.map((property) => {
    const state = determineState(objBefore, objAfter, property);

    switch (state) {
      case 'deleted':
        return { property, state, value: objBefore[property] };
      case 'added':
        return { property, state, value: objAfter[property] };
      case 'complex':
        return { property, state, children: getDiff(objBefore[property], objAfter[property]) };
      case 'changed':
        return {
          property,
          state,
          oldValue: objBefore[property],
          newValue: objAfter[property],
        };
      default:
        return { property, state, value: objBefore[property] };
    }
  });

  return diffObj;
};

export default getDiff;
