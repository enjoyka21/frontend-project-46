import fs from 'node:fs';
import path from 'node:path';
import parse from './parsers.js';
import buildTree from './buildTree.js';
import formatStylish from './formatters/stylish.js';

const genDiff = (filepath1, filepath2) => {
  const absolutePath1 = path.resolve(process.cwd(), filepath1);
  const absolutePath2 = path.resolve(process.cwd(), filepath2);

  const content1 = fs.readFileSync(absolutePath1, 'utf-8');
  const content2 = fs.readFileSync(absolutePath2, 'utf-8');

  const format1 = path.extname(filepath1).slice(1);
  const format2 = path.extname(filepath2).slice(1);

  const data1 = parse(content1, format1);
  const data2 = parse(content2, format2);

  const tree = buildTree(data1, data2);

  return `{\n${formatStylish(tree)}\n}`;
};

export default genDiff;