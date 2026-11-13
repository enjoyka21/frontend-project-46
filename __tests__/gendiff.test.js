import { describe, expect, test } from 'vitest';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import genDiff from '../src/index.js';
import parse from '../src/parser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fixturesPath = path.join(__dirname, '__fixtures__');

describe('genDiff', () => {
  test('compares flat JSON files', () => {
    const filepath1 = path.join(fixturesPath, 'file1.json');
    const filepath2 = path.join(fixturesPath, 'file2.json');

    const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

    expect(genDiff(filepath1, filepath2)).toBe(expected);
  });
  test('throws an error for unsupported format', () => {
  expect(() => parse('{}', 'yaml')).toThrow('Unsupported format: yaml');
});
});