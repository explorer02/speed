// lib
import { useCallback, useState } from 'react';

// helpers
import { getFromLocalStorage, isBrowserMode, setToLocalStorage } from 'helper/localStorage';

export const useLocalStorage = <T>(
  key: string,
  initialValue: T,
): [T, (val: T | ((v: T) => T)) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (!isBrowserMode()) {
      return initialValue;
    }
    return getFromLocalStorage(key);
  });
  const setValue = useCallback(
    (value) => {
      setStoredValue((prev) => {
        try {
          const valueToStore = value instanceof Function ? value(prev) : value;
          if (isBrowserMode()) {
            setToLocalStorage(key, valueToStore);
          }
          return valueToStore;
        } catch (error) {
          console.log(error);
        }
        return initialValue;
      });
    },
    [initialValue, key],
  );
  return [storedValue, setValue];
};
