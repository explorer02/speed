// types
import * as React from 'react';
import { StringAnyMap } from 'types/generic';

export const useWhyDidYouUpdate = (name: string, props?: StringAnyMap): void => {
  // Get a mutable ref object where we can store props ...
  // ... for comparison next time this hook runs.
  const previousProps = React.useRef<StringAnyMap>();
  React.useEffect(() => {
    if (props && previousProps.current) {
      // Get all keys from previous and current props
      const allKeys = Object.keys({ ...previousProps.current, ...props });
      // Use this object to keep track of changed props
      const changesObj: StringAnyMap = {};
      // Iterate through keys
      allKeys.forEach((key) => {
        // If previous is different from current
        // @ts-ignore
        if (previousProps.current[key] !== props[key]) {
          // Add to changesObj
          changesObj[key] = {
            // @ts-ignore
            from: previousProps.current[key],
            to: props[key],
          };
        }
      });
      // If changesObj not empty then output to console
      if (Object.keys(changesObj).length) {
        console.log('[why-did-you-update]', name, changesObj);
      }
    }
    // Finally update previousProps with current props for next hook call
    previousProps.current = props;
  });
};
