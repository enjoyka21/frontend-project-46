
const formatValue = (value) => {
  if (value === null) {
    return 'null';
  }

  if (typeof value === 'string') {
    return `'${value}'`;
  }

  if (typeof value === 'object') {
    return '[complex value]';
  }

  return String(value);
};

const formatPlain = (tree, parentPath = '') => {
  const lines = [];

  for (let i = 0; i < tree.length; i += 1) {
    const node = tree[i];
    const { name, type, value, children } = node;
    const propertyPath = parentPath
      ? `${parentPath}.${name}`
      : name;

    if (type === 'nested') {
      lines.push(...formatPlain(children, propertyPath));
      continue;
    }

    if (type === 'unchanged') {
      continue;
    }

    if (
      type === 'removed'
      && tree[i + 1]?.type === 'added'
      && tree[i + 1].name === name
    ) {
      lines.push(
        `Property '${propertyPath}' was updated. From ${formatValue(value)} to ${formatValue(tree[i + 1].value)}`,
      );
      i += 1;
      continue;
    }

    if (type === 'removed') {
      lines.push(`Property '${propertyPath}' was removed`);
      continue;
    }

    lines.push(
      `Property '${propertyPath}' was added with value: ${formatValue(value)}`,
    );
  }

  return lines;
};

export default formatPlain;

