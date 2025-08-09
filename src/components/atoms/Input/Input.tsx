import React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  required?: boolean;
}

const Input: React.FC<InputProps> = ({ required = false, ...props }) => {
  return (
    <input
      className="w-full h-12 px-3 bg-white border border-border-default rounded-md text-base font-normal text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
      required={required}
      {...props}
    />
  );
};

export default Input;
