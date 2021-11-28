import { useState } from 'react';

export function useControlledFormState(initialState, setValInStore) {
  const [val, setVal] = useState(initialState);

  const handleFormInputChange = (e, {value}) => {
    setVal(value);
    setValInStore(value);
  };

  return [val, handleFormInputChange];
}