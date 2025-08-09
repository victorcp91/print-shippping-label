import React from "react";

export interface HeadingProps {
  children: React.ReactNode;
}

const Heading: React.FC<HeadingProps> = ({ children }) => {
  return (
    <h1 className="text-xl font-medium text-text-primary leading-7">
      {children}
    </h1>
  );
};

export default Heading;
