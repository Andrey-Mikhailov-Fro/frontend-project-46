import _ from 'lodash';

const genDiff = (file1, file2) => {
    const [newFile1, newFile2] = _.cloneDeep([file1, file2]);

    const diff = (prop, obj1, obj2) => {
        if (Object.hasOwn(obj1, prop) && Object.hasOwn(obj2, prop)) {
            return obj1[prop] === obj2[prop] ? `  "${prop}":"${obj1[prop]}"` : [`- "${prop}": "${obj1[prop]}"`, `+ "${prop}": "${obj2[prop]}"`];
        }

        if (Object.hasOwn(obj1, prop) && !Object.hasOwn(obj2, prop)) {
            return `- "${prop}": "${obj1[prop]}"`;
        }

        if (!Object.hasOwn(obj1, prop) && Object.hasOwn(obj2, prop)) {
            return `+ "${prop}": "${obj2[prop]}"`;
        }
    };

    const summaryKeys = Object.keys({...newFile1, ...newFile2});
    const properties = _.sortBy(summaryKeys);

    const diffSummary = properties.flatMap((prop) => diff(prop, newFile1, newFile2));
    const stringDiff = `{\n ${diffSummary.join(',\n ')}\n}`;
    
    //console.log(stringDiff);

    return stringDiff;
};

export default genDiff;