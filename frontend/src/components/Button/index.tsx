import React from 'react';
import './style.scss';

type ButtonProps = {
  label: string;
  disabled?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button = ({ label, disabled = false, onClick }: ButtonProps) => {
  return (
    <button className="button-container" onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

export default Button;
