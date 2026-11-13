
import formatStylish from './stylish.js';
import formatPlain from './plain.js';

const formatters = {
  stylish: formatStylish,
  plain: formatPlain,
};

const getFormatter = (formatName) => {
  if (!Object.hasOwn(formatters, formatName)) {
    throw new Error(`Unsupported format: ${formatName}`);
  }

  return formatters[formatName];
};

export default getFormatter;
