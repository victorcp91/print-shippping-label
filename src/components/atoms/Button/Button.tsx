import React from "react";
import Icon from "../Icon/Icon";

type CommonProps = {
  children: React.ReactNode;
  variant?: "primary" | "print";
  isValid?: boolean;
  isDirty?: boolean;
};

type AnchorOnlyProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "children"
> & { href: string };
type ButtonOnlyProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> & { href?: undefined };

export type ButtonProps = CommonProps & (AnchorOnlyProps | ButtonOnlyProps);

const Button: React.FC<ButtonProps> = (props) => {
  const {
    children,
    variant = "primary",
    isValid = true,
    isDirty = false,
    ...restProps
  } = props;
  const disabled = (restProps as ButtonOnlyProps).disabled ?? false;
  const baseClasses =
    "font-medium text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer";

  const variantClasses = {
    primary:
      "bg-primary-500 text-white px-6 py-3 rounded-md hover:bg-primary-600 focus:ring-primary-500 h-12 flex items-center gap-2",
    print:
      "bg-primary-500 text-white px-6 py-3 rounded-md hover:bg-primary-600 focus:ring-primary-500 h-12 flex items-center gap-2",
  } as const;

  const getButtonState = () => {
    if (disabled) return "opacity-50 cursor-not-allowed";
    if (!isDirty) return "opacity-60";
    if (!isValid) return "opacity-90 ring-2 ring-red-500/20";
    return "";
  };

  const renderContent = () => {
    if (variant === "primary") {
      return (
        <>
          {children}
          <Icon name="arrow-right" />
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

  // Render as link when href is provided (discriminated by presence of href)
  if ("href" in props && props.href) {
    const { href, target, rel, onClick } = props as AnchorOnlyProps &
      CommonProps;
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        className={`${baseClasses} ${
          variantClasses[variant]
        } ${getButtonState()}`}
        aria-disabled={disabled}
      >
        {renderContent()}
      </a>
    );
  }

  return (
    <button
      className={`${baseClasses} ${
        variantClasses[variant]
      } ${getButtonState()}`}
      disabled={disabled}
      {...(restProps as ButtonOnlyProps)}
    >
      {renderContent()}
    </button>
  );
};

export default Button;
