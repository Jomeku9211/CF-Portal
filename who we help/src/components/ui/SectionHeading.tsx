import React from 'react';
interface SectionHeadingProps {
  children: React.ReactNode;
}
export function SectionHeading({
  children
}: SectionHeadingProps) {
  return <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
      {children}
    </h2>;
}