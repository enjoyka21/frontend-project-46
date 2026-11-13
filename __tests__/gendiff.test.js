import { describe, expect, test } from 'vitest';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import genDiff from '../src/index.js';
import parse from '../src/parsers.js';

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
  test('compares flat YAML files', () => {
  const filepath1 = path.join(fixturesPath, 'file1.yml');
  const filepath2 = path.join(fixturesPath, 'file2.yml');

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
  expect(() => parse('{}', 'xml')).toThrow('Unsupported format: xml');
});
test('compares nested JSON files', () => {
  const filepath1 = path.join(fixturesPath, 'nested1.json');
  const filepath2 = path.join(fixturesPath, 'nested2.json');

  const expected = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

  expect(genDiff(filepath1, filepath2)).toBe(expected);
});
test('compares nested YAML files', () => {
  const filepath1 = path.join(fixturesPath, 'nested1.yml');
  const filepath2 = path.join(fixturesPath, 'nested2.yml');

  const expected = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

  expect(genDiff(filepath1, filepath2)).toBe(expected);
});

  test('compares nested JSON files in plain format', () => {
    const filepath1 = path.join(fixturesPath, 'nested1.json');
    const filepath2 = path.join(fixturesPath, 'nested2.json');

    const expected = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

    expect(genDiff(filepath1, filepath2, 'plain')).toBe(expected);
  });
test('throws an error for unsupported output format', () => {
  const filepath1 = path.join(fixturesPath, 'nested1.json');
  const filepath2 = path.join(fixturesPath, 'nested2.json');

  expect(() => genDiff(filepath1, filepath2, 'xml'))
    .toThrow('Unsupported format: xml');
});
});