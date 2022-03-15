import _cloneDeep from 'lodash/cloneDeep';

/* eslint-disable no-restricted-syntax */
/* eslint-disable no-prototype-builtins */
export const helper = <T extends object>(obj: T): T => {
  if (Array.isArray(obj)) {
    // @ts-ignore
    return obj.map(helper);
  }

  const copy = { ...obj };

  if (copy.hasOwnProperty('__typename')) {
    // @ts-ignore
    delete copy.__typename;
  }

  for (const entry of Object.entries(copy)) {
    const [key, value] = entry;
    if (value && typeof value === 'object') {
      // @ts-ignore
      copy[key] = helper(value);
    }
  }

  return copy;
};

export const stripTypename = <T extends object>(obj: T): T => helper(_cloneDeep(obj));
