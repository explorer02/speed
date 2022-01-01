export const isBrowserMode = (): boolean => typeof window !== 'undefined';

export const getFromLocalStorage = (key: string): any | undefined => {
  if (!isBrowserMode()) return undefined;
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : undefined;
};

export const setToLocalStorage = (key: string, value?: any): void => {
  if (isBrowserMode()) localStorage.setItem(key, JSON.stringify(value));
};
