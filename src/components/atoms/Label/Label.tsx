import React from "react";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  required?: boolean;
}

const Label: React.FC<LabelProps> = ({
  children,
  required = false,
  ...props
}) => {
  return (
    <label
      className="block text-base font-medium text-text-primary mb-1"
      {...props}
    >
      {children}
      {required && (
        <span className="text-red-500 ml-1" aria-label="required">
          *
        </span>
      )}
    </label>
  );
};

export default Label;
