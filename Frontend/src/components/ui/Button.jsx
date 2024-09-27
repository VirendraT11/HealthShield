import React from "react";

// Define different styles for variants and sizes
const variants = {
  primary: "bg-blue-600 text-white border-blue-600 hover:bg-blue-700 hover:border-blue-700",
  outline: "bg-transparent text-blue-600 border border-blue-600 hover:bg-blue-50",
  ghost: "bg-transparent text-gray-700 border-transparent hover:bg-gray-50",
  danger: "bg-red-600 text-white border-red-600 hover:bg-red-700 hover:border-red-700",
};

const sizes = {
  sm: "px-3 py-1 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-lg",
};

export function Button({ children, className, variant = 'primary', size = 'md', ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md font-medium ring-offset-background transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 
      ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
