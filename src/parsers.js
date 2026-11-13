import { load } from 'js-yaml';

const parse = (content, format) => {
  if (format === 'json') {
    return JSON.parse(content);
  }

  if (format === 'yml' || format === 'yaml') {
    return load(content);
  }

  throw new Error(`Unsupported format: ${format}`);
};

export default parse;
