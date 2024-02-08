import * as path from 'node:path';
import process from 'node:process';
import * as fs from 'node:fs';

const getFiles = (way) => {
  const actualPath = path.resolve(process.cwd(), way);

  const fileContent = fs.readFileSync(actualPath);

  return JSON.parse(fileContent);
};

export default getFiles;
