import React from "react";

export interface BackButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  children?: React.ReactNode;
}

const BackButton: React.FC<BackButtonProps> = ({
  onClick,
  children = "Back",
  disabled,
  type = "button",
  ...props
}) => {
  const classes =
    "cursor-pointer flex items-center gap-2 text-primary-500 hover:text-primary-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-sm";

  const BackIcon = () => (
    <svg
      width="14"
      height="16"
      viewBox="0 0 14 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-current"
    >
      <path
        d="M13 8H1M1 8L7 14M1 8L7 2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <button
      onClick={onClick}
      className={classes}
      disabled={disabled}
      type={type}
      {...props}
    >
      <BackIcon />
      {children}
    </button>
  );
};

export default BackButton;
