import React from "react";

export interface IconProps {
  name: "shipping" | "print" | "download";
}

const Icon: React.FC<IconProps> = ({ name }) => {
  if (name === "shipping") {
    return (
      <svg
        width="30"
        height="24"
        viewBox="0 0 30 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary-500"
      >
        <path
          d="M0.65 1.56L29.35 22.41"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="0.047"
        />
      </svg>
    );
  }

  if (name === "print") {
    return (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-white"
      >
        <path
          d="M4 4V2C4 1.45 4.45 1 5 1H11C11.55 1 12 1.45 12 2V4M4 4H2C1.45 4 1 4.45 1 5V10C1 10.55 1.45 11 2 11H4M4 4H12M12 4H14C14.55 4 15 4.45 15 5V10C15 10.55 14.55 11 14 11H12M4 11V14C4 14.55 4.45 15 5 15H11C11.55 15 12 14.55 12 14V11M4 11H12"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    );
  }

  if (name === "download") {
    return (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-text-primary"
      >
        <path
          d="M8 1V11M8 11L5 8M8 11L11 8M2 15H14"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return null;
};

export default Icon;
