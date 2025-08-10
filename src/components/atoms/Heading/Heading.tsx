import React from "react";

export interface HeadingProps extends React.ComponentPropsWithoutRef<"h1"> {
  variant?: "default" | "section" | "subsection" | "small";
}

const Heading: React.FC<HeadingProps> = ({
  variant = "default",
  children,
  ...props
}) => {
  const variantConfig = {
    default: {
      element: "h1",
      classes: "text-4xl font-bold text-gray-900",
    },
    section: {
      element: "h2",
      classes: "text-2xl font-semibold text-gray-800",
    },
    subsection: {
      element: "h3",
      classes: "text-xl font-medium text-gray-700",
    },
    small: {
      element: "h4",
      classes: "text-lg font-medium text-gray-600",
    },
  };

  const config = variantConfig[variant];

  if (config.element === "h1") {
    return (
      <h1 className={config.classes} {...props}>
        {children}
      </h1>
    );
  }

  if (config.element === "h2") {
    return (
      <h2 className={config.classes} {...props}>
        {children}
      </h2>
    );
  }

  if (config.element === "h3") {
    return (
      <h3 className={config.classes} {...props}>
        {children}
      </h3>
    );
  }

  if (config.element === "h4") {
    return (
      <h4 className={config.classes} {...props}>
        {children}
      </h4>
    );
  }

  // Fallback to h1
  return (
    <h1 className={config.classes} {...props}>
      {children}
    </h1>
  );
};

export default Heading;
