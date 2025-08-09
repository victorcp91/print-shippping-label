import React from "react";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
  placeholder?: string;
  required?: boolean;
}

const Select: React.FC<SelectProps> = ({
  children,
  placeholder = "Select an option",
  required = false,
  ...props
}) => {
  return (
    <select
      className="w-full h-12 px-3 bg-white border border-border-default rounded-md text-base font-normal text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQgNkw4IDEwTDEyIDYiIHN0cm9rZT0iIzFGMjkzNyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==')] bg-no-repeat bg-[right_12px_center] pr-10"
      required={required}
      {...props}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {children}
    </select>
  );
};

export default Select;
