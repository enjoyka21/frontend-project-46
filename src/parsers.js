import { load } from 'js-yaml';

const parse = (content, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(content);
    case 'yml':
    case 'yaml':
      return load(content);
    default:
      throw new Error(`Unsupported format: ${format}`);
  }
};

export default parse;
