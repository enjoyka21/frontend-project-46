import fs from 'node:fs';
import path from 'node:path';
import parse from './parsers.js';
import _ from 'lodash';

const genDiff = (filepath1, filepath2) => {
  const absolutePath1 = path.resolve(process.cwd(), filepath1);
  const absolutePath2 = path.resolve(process.cwd(), filepath2);

  const content1 = fs.readFileSync(absolutePath1, 'utf-8');
  const content2 = fs.readFileSync(absolutePath2, 'utf-8');

  const format1 = path.extname(filepath1).slice(1);
  const format2 = path.extname(filepath2).slice(1);

  const data1 = parse(content1, format1);
  const data2 = parse(content2, format2);

  const keys = _.sortBy([...new Set([
    ...Object.keys(data1),
    ...Object.keys(data2),
  ])]);

  const result = keys.flatMap((key) => {
    const hasKey1 = Object.hasOwn(data1, key);
    const hasKey2 = Object.hasOwn(data2, key);

    if (hasKey1 && hasKey2 && data1[key] === data2[key]) {
      return `    ${key}: ${data1[key]}`;
    }

    const lines = [];

    if (hasKey1) {
      lines.push(`  - ${key}: ${data1[key]}`);
    }

    if (hasKey2) {
      lines.push(`  + ${key}: ${data2[key]}`);
    }

    return lines;
  });

  return `{\n${result.join('\n')}\n}`;
};

export default genDiff;