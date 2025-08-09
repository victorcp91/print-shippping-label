import React from "react";

export interface BadgeProps {
  children: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({ children }) => {
  return (
    <div className="w-6 h-6 bg-neutral-200 rounded-full flex items-center justify-center">
      <span className="text-sm font-medium text-text-secondary">
        {children}
      </span>
    </div>
  );
};

export default Badge;
