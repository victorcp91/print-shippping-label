import React from "react";

const Footer: React.FC<React.ComponentPropsWithoutRef<"footer">> = (props) => {
  return (
    <footer {...props} className="bg-white border-t border-gray-200 py-6">
      <div className="max-w-[62rem] mx-auto px-4">
        <div className="text-center text-sm text-gray-500">
          <p>2025 PrintLabel</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
