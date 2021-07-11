import { useState } from 'react';

export function useFormModal() {
  const [isOpen, setOpen] = useState(false);

  const open = () =>  {setOpen(true)};
  const close = () =>  {setOpen(false)};

  return [isOpen, open, close];
}
