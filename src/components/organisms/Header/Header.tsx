import React from "react";
import Logo from "../../atoms/Logo/Logo";

const Header: React.FC<React.ComponentPropsWithoutRef<"header">> = (props) => {
  return (
    <header {...props} className="bg-white border-b border-gray-200">
      <div className="max-w-[62rem] mx-auto px-4 py-4">
        <Logo />
      </div>
    </header>
  );
};

export default Header;
