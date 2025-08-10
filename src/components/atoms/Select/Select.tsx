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
  const isInvalid = props["aria-invalid"] === "true";
  return (
    <select
      className={[
        "block w-full h-12 px-4 rounded-md border-2 border-solid",
        isInvalid ? "border-red-500" : "border-gray-300",
        "bg-white text-gray-900 placeholder:text-gray-500",
        isInvalid
          ? "focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
          : "focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500",
        "hover:border-gray-400",
        "disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200",
        "transition-all duration-200",
        "appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQgNkw4IDEwTDEyIDYiIHN0cm9rZT0iIzFGMjkzNyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==')] bg-no-repeat bg-[right_12px_center] pr-10",
      ].join(" ")}
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
