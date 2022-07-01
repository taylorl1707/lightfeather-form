import classNames from 'classnames';
import React from 'react';

import './style.scss';

export type SelectOption = {
  value: string;
  label: string;
};

type SelectFieldType = {
  options: SelectOption[];
  label: string;
  width?: 'full' | 'half';
  value: string | number;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const SelectField = ({ options, label, width = 'full', error = '', value, onChange }: SelectFieldType) => {
  return (
    <div className={classNames('select-field', width)}>
      <div className="select-label">
        <p>{label}</p>
      </div>
      <select value={value} onChange={onChange} className="select-box">
        {options.map((option: SelectOption) => {
          return <option label={option.label} value={option.value} key={option.value} />;
        })}
      </select>
      <div className="input-error">{error}</div>
    </div>
  );
};

export default SelectField;
