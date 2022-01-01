// lib
import * as React from 'react';

type UseValidateInput = (props: { initialValue?: string; regex?: RegExp; maxLength?: number }) => {
  input: string;
  handleInputChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  setInput: (n: string) => void;
};

export const useValidateInput: UseValidateInput = ({
  initialValue = '',
  regex = /\S+/g,
  maxLength,
}) => {
  const [input, setInput] = React.useState<string>(initialValue);
  const handleInputChange = React.useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      const targetValue = ev.target.value;
      const regexResult = targetValue.match(regex) ?? [];
      const newValue = regexResult.join('');
      if (!maxLength || newValue.length <= maxLength) {
        setInput(newValue);
      }
    },
    [maxLength, regex],
  );
  return { input, handleInputChange, setInput };
};
