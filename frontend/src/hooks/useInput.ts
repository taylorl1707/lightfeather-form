import React, { useEffect, useState } from 'react';

const useInput = (initialValue: string | number = '') => {
  const [value, setValue] = useState<string | number>(initialValue);

  useEffect(() => {}, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setValue(e.target.value);
  };

  return { value, onChange: handleChange };
};

export default useInput;
