import React from 'react';

export function Select({ children, className, ...props }) {
  return (
    <select
      className={`border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}
