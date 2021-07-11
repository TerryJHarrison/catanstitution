import { useState } from 'react';

export function useFormInput(initialState) {
  const [val, setVal] = useState(initialState);

  const handleFormInputChange = (e, {value}) => {setVal(value)};

  return [val, handleFormInputChange];
}
