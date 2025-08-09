import React from "react";

export interface TextProps {
  children: React.ReactNode;
  variant?: "body" | "section-heading" | "address-display";
}

const Text: React.FC<TextProps> = ({ children, variant = "body" }) => {
  const variantClasses = {
    body: "text-base font-normal text-text-primary leading-6",

    "section-heading": "text-lg font-medium text-text-primary leading-7",

    "address-display":
      "text-base font-normal text-text-primary leading-relaxed whitespace-pre-line",
  };

  return <span className={variantClasses[variant]}>{children}</span>;
};

export default Text;
