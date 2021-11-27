export const isBrowserMode = () => typeof window !== 'undefined';

export const getFromLocalStorage = (key: string) => {
  if (!isBrowserMode()) return undefined;
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : undefined;
};

export const setToLocalStorage = (key: string, value?: any) =>
  isBrowserMode() && localStorage.setItem(key, JSON.stringify(value));
