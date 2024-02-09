import * as path from 'node:path';
import process from 'node:process';
import * as fs from 'node:fs';
import * as yaml from 'js-yaml';

const doParse = (way) => {
  const actualPath = path.resolve(process.cwd(), way);

  const fileContent = fs.readFileSync(actualPath);

  const getExtension = (filepath) => filepath.split('.').pop();

  if (getExtension(way) === 'yaml') {
    return yaml.load(fileContent);
  }

  return JSON.parse(fileContent);
};

export default doParse;
