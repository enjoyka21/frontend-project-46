const getIndent = (depth) => ' '.repeat(depth * 4);

const stringify = (value, depth) => {
  if (value === null) {
    return 'null';
  }

  if (typeof value !== 'object') {
    return String(value);
  }

  const lines = Object.entries(value).map(([key, val]) => (
    `${getIndent(depth + 1)}${key}: ${stringify(val, depth + 1)}`
  ));

  return `{\n${lines.join('\n')}\n${getIndent(depth)}}`;
};

const formatStylish = (tree, depth = 1) => {
  const lines = tree.flatMap((node) => {
    const {
      name, type, value, children,
    } = node;

    const indent = getIndent(depth);

    if (type === 'nested') {
      return `${indent}${name}: {\n${formatStylish(children, depth + 1)}\n${indent}}`;
    }

    if (type === 'unchanged') {
      return `${indent}${name}: ${stringify(value, depth)}`;
    }

    const sign = type === 'removed' ? '-' : '+';
    const markerIndent = ' '.repeat(depth * 4 - 2);

    return `${markerIndent}${sign} ${name}: ${stringify(value, depth)}`;
  });

  return lines.join('\n');
};

export default formatStylish;