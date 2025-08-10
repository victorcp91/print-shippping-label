import React from "react";

export interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?:
    | "body"
    | "section-heading"
    | "address-display"
    | "body-small"
    | "error";
}

const Text: React.FC<TextProps> = ({
  children,
  variant = "body",
  ...props
}) => {
  const variantClasses = {
    body: "text-base font-normal text-gray-900 leading-6",
    "section-heading": "text-lg font-medium text-gray-900 leading-7",
    "address-display":
      "text-base font-normal text-gray-900 leading-relaxed whitespace-pre-line",
    "body-small": "text-sm font-normal text-gray-900 leading-5",
    error: "text-sm font-medium text-red-600 leading-5",
  };

  return (
    <span className={variantClasses[variant]} {...props}>
      {children}
    </span>
  );
};

export default Text;
