import React from "react";
import Icon from "../Icon/Icon";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "download" | "print";
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  ...props
}) => {
  const baseClasses =
    "font-medium text-base transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantClasses = {
    primary:
      "bg-primary-500 text-white px-4 py-2 rounded-sm hover:bg-primary-600 focus:ring-primary-500",

    download:
      "bg-transparent text-text-primary px-6 py-3 rounded-md hover:bg-neutral-50 focus:ring-neutral-300 h-12 flex items-center gap-2",

    print:
      "bg-primary-500 text-white px-6 py-3 rounded-md hover:bg-primary-600 focus:ring-primary-500 h-12 flex items-center gap-2",
  };

  const renderContent = () => {
    if (variant === "download") {
      return (
        <>
          <Icon name="download" />
          {children}
        </>
      );
    }

    if (variant === "print") {
      return (
        <>
          <Icon name="print" />
          {children}
        </>
      );
    }

    return children;
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]}`} {...props}>
      {renderContent()}
    </button>
  );
};

export default Button;
