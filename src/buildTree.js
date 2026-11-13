const isObject = (value) => (
  value !== null
  && typeof value === 'object'
  && !Array.isArray(value)
);

const buildTree = (data1, data2) => {
  const keys = [...new Set([
    ...Object.keys(data1),
    ...Object.keys(data2),
  ])].sort();

  return keys.flatMap((key) => {
    const hasKey1 = Object.hasOwn(data1, key);
    const hasKey2 = Object.hasOwn(data2, key);

    const value1 = data1[key];
    const value2 = data2[key];

    if (hasKey1 && hasKey2) {
      if (isObject(value1) && isObject(value2)) {
        return [{
          name: key,
          type: 'nested',
          children: buildTree(value1, value2),
        }];
      }

      if (value1 === value2) {
        return [{
          name: key,
          type: 'unchanged',
          value: value1,
        }];
      }

      return [
        {
          name: key,
          type: 'removed',
          value: value1,
        },
        {
          name: key,
          type: 'added',
          value: value2,
        },
      ];
    }

    if (hasKey1) {
      return [{
        name: key,
        type: 'removed',
        value: value1,
      }];
    }

    return [{
      name: key,
      type: 'added',
      value: value2,
    }];
  });
};

export default buildTree;
