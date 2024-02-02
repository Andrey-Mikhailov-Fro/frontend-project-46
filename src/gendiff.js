#!/usr/bin/env node

import { program } from 'commander';

/*program
    .option('-h, --help', 'output usage information')
    .option('-v, --version', 'output version number');
*/

program
    .name('gendiff')
    .version('1.0.0')
    .description('Compares two configuration files and shows a difference.')
    .arguments('<filepath1> <filepath2>');

program
    .option('-f, --format [type]', 'output format');

program.parse();