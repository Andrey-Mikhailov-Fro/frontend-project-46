import _ from 'lodash';

const getDiff = (objBefore, objAfter) => {
  const properties = _.sortBy(_.uniq(Object.keys({ ...objBefore, ...objAfter })));
  const diffObj = properties.map((property) => {
    if (!Object.hasOwn(objAfter, property)) {
      return { property, state: 'deleted', value: objBefore[property] };
    }

    if (!Object.hasOwn(objBefore, property)) {
      return { property, state: 'added', value: objAfter[property] };
    }

    if ((typeof objBefore[property] === 'object') && typeof objAfter[property] === 'object') {
      return { property, state: 'complex', children: getDiff(objBefore[property], objAfter[property]) };
    }

    if (!_.isEqual(objBefore[property], objAfter[property])) {
      return {
        property,
        state: 'changed',
        oldValue: objBefore[property],
        newValue: objAfter[property],
      };
    }

    return { property, state: 'unchanged', value: objBefore[property] };
  });

  return diffObj;
};

export default getDiff;
