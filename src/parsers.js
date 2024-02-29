import * as yaml from 'js-yaml';

const doParse = (fileContent, extension) => {
  const parsed = [];

  switch (extension) {
    case 'yaml':
      parsed.push(yaml.load(fileContent));
      break;
    case 'yml':
      parsed.push(yaml.load(fileContent));
      break;
    case 'json':
      parsed.push(JSON.parse(fileContent));
      break;
    default:
      parsed.push(`Can't read file with extension ${extension}`);
  }

  return parsed.pop();
};

export default doParse;
