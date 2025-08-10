import React from "react";

export interface IconProps {
  name: "shipping" | "print" | "download" | "arrow-right" | "truck";
}

const Icon: React.FC<IconProps> = ({ name }) => {
  if (name === "shipping") {
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-current"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M18.3334 5.83331H13.3334V2.49998C13.3334 2.27897 13.2456 2.06701 13.0893 1.91073C12.933 1.75445 12.721 1.66665 12.5 1.66665H2.50002C2.27901 1.66665 2.06705 1.75445 1.91077 1.91073C1.75449 2.06701 1.66669 2.27897 1.66669 2.49998V13.3333H3.33335C3.33335 14.2174 3.68455 15.0652 4.30967 15.6903C4.93478 16.3154 5.78262 16.6666 6.66669 16.6666C7.55075 16.6666 8.39859 16.3154 9.0237 15.6903C9.64882 15.0652 10 14.2174 10 13.3333H11.6667C11.6667 14.2174 12.0179 15.0652 12.643 15.6903C13.2681 16.3154 14.116 16.6666 15 16.6666C15.8841 16.6666 16.7319 16.3154 17.357 15.6903C17.9822 15.0652 18.3334 14.2174 18.3334 13.3333V5.83331ZM6.66669 15C6.22466 15 5.80073 14.8244 5.48817 14.5118C5.17561 14.1993 5.00002 13.7754 5.00002 13.3333C5.00002 12.8913 5.17561 12.4674 5.48817 12.1548C5.80073 11.8423 6.22466 11.6666 6.66669 11.6666C7.10871 11.6666 7.53264 11.8423 7.8452 12.1548C8.15776 12.4674 8.33335 12.8913 8.33335 13.3333C8.33335 13.7754 8.15776 14.1993 7.8452 14.5118C7.53264 14.8244 7.10871 15 6.66669 15ZM15 15C14.558 15 14.1341 14.8244 13.8215 14.5118C13.5089 14.1993 13.3334 13.7754 13.3334 13.3333C13.3334 12.8913 13.5089 12.4674 13.8215 12.1548C14.1341 11.8423 14.558 11.6666 15 11.6666C15.442 11.6666 15.866 11.8423 16.1785 12.1548C16.4911 12.4674 16.6667 12.8913 16.6667 13.3333C16.6667 13.7754 16.4911 14.1993 16.1785 14.5118C15.866 14.8244 15.442 15 15 15ZM13.3334 7.49998H16.6667V10H13.3334V7.49998Z"
          fill="currentColor"
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
        className="text-current"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M4 4V2C4 1.45 4.45 1 5 1H11C11.55 1 12 1.45 12 2V4M4 4H2C1.45 4 1 4.45 1 5V10C1 10.55 1.45 11 2 11H4M4 4H12M12 4H14C14.55 4 15 4.45 15 5V10C15 10.55 14.55 11 14 11H12M4 11V14C4 14.55 4.45 15 5 15H11C11.55 15 12 14.55 12 14V11M4 11H12"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (name === "truck") {
    return (
      <svg
        width="20"
        height="16"
        viewBox="0 0 20 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-current"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M4 12.6667C4.73638 12.6667 5.33333 12.0697 5.33333 11.3333C5.33333 10.597 4.73638 10 4 10C3.26362 10 2.66667 10.597 2.66667 11.3333C2.66667 12.0697 3.26362 12.6667 4 12.6667Z M14.6667 12.6667C15.403 12.6667 16 12.0697 16 11.3333C16 10.597 15.403 10 14.6667 10C13.9303 10 13.3333 10.597 13.3333 11.3333C13.3333 12.0697 13.9303 12.6667 14.6667 12.6667Z M1.33333 2H12V10.6667H5.74667C5.41333 9.71333 4.54667 9 3.5 9C2.45333 9 1.58667 9.71333 1.25333 10.6667H0V3.33333C0 2.59695 0.596954 2 1.33333 2Z M18.6667 5.33333H12V10.6667H15.4133C15.7467 9.71333 16.6133 9 17.66 9C18.7067 9 19.5733 9.71333 19.9067 10.6667H20V6.66667C20 5.93029 19.403 5.33333 18.6667 5.33333Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (name === "arrow-right") {
    return (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-current"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M1 8H15M15 8L8 1M15 8L8 15"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
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
        className="text-current"
        aria-hidden="true"
        focusable="false"
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
