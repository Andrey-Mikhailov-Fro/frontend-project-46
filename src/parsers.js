import * as yaml from 'js-yaml';

const doParse = (fileContent, extension) => {
  switch (extension) {
    case 'yaml':
      return yaml.load(fileContent);
    case 'yml':
      return yaml.load(fileContent);
    case 'json':
      return JSON.parse(fileContent);
    default:
      throw new Error(`Can't read file with extension ${extension}`);
  }
};

export default doParse;
