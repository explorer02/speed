export const parseJSON = <T>(str: string): T | undefined => {
  try {
    const res = JSON.parse(str) as T;
    return res;
  } catch (e) {
    console.log(e);
  }
  return undefined;
};

export const stringifyJSON = <T extends object>(obj: T): string => {
  try {
    const res = JSON.stringify(obj);
    return res;
  } catch (e) {
    console.log(e);
  }
  return '';
};
