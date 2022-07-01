import React, { useEffect, useState } from 'react';

const useCheckbox = (initialValue = false) => {
  const [checked, setChecked] = useState(initialValue);

  useEffect(() => {}, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.currentTarget.checked);
  };

  return { checked, onChecked: handleChange };
};

export default useCheckbox;
