import React from "react";

const Logo: React.FC<React.ComponentPropsWithoutRef<"div">> = (props) => {
  return (
    <div {...props} className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-lg">P</span>
      </div>
      <span className="text-xl font-semibold text-gray-900">PrintLabel</span>
    </div>
  );
};

export default Logo;
