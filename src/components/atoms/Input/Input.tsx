import React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  required?: boolean;
}

const Input: React.FC<InputProps> = ({ required = false, ...props }) => {
  const isInvalid = props["aria-invalid"] === "true";
  return (
    <input
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
      ].join(" ")}
      required={required}
      {...props}
    />
  );
};

export default Input;
