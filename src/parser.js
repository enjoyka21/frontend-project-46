const parse = (content, format) => {
  if (format === 'json') {
    return JSON.parse(content);
  }

  throw new Error(`Unsupported format: ${format}`);
};

export default parse;
