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

    const node = [];

    switch (state) {
      case 'deleted':
        node.push({ property, state, value: objBefore[property] });
        break;
      case 'added':
        node.push({ property, state, value: objAfter[property] });
        break;
      case 'complex':
        node.push({ property, state, children: getDiff(objBefore[property], objAfter[property]) });
        break;
      case 'changed':
        node.push({
          property,
          state,
          oldValue: objBefore[property],
          newValue: objAfter[property],
        });
        break;
      default:
        node.push({ property, state, value: objBefore[property] });
    }

    return node.pop();
  });

  return diffObj;
};

export default getDiff;
