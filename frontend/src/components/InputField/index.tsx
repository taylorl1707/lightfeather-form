import classNames from 'classnames';
import React from 'react';
import './style.scss';

type InputFieldProps = {
  label: string;
  optional?: boolean;
  width?: 'full' | 'half';
  error?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  onChecked?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputField = ({
  label,
  optional = false,
  width = 'full',
  value,
  onChange,
  checked,
  onChecked,
  error = '',
}: InputFieldProps) => {
  return (
    <div className={classNames('input-field', width)}>
      <div className="input-label">
        {optional && (
          <label>
            <input type="checkbox" checked={checked} onChange={onChecked} />
            <span className={classNames('checkbox', { active: checked })} aria-hidden="true">
              <span className="checked" />
            </span>
          </label>
        )}
        <p>{label}</p>
      </div>
      <input className="input-box" value={value} onChange={onChange} />
      <div className="input-error">{error}</div>
    </div>
  );
};

export default InputField;
