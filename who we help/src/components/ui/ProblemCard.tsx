import React from 'react';
const colorMap = {
  blue: 'bg-blue-100 text-blue-600',
  purple: 'bg-purple-100 text-purple-600',
  green: 'bg-green-100 text-green-600',
  orange: 'bg-orange-100 text-orange-600',
  amber: 'bg-amber-100 text-amber-600',
  red: 'bg-red-100 text-red-600',
  indigo: 'bg-indigo-100 text-indigo-600'
};
interface ProblemCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: keyof typeof colorMap;
}
export function ProblemCard({
  icon,
  title,
  description,
  color
}: ProblemCardProps) {
  return <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className={`w-12 h-12 rounded-full ${colorMap[color]} flex items-center justify-center mb-4`}>
        <div className="w-6 h-6">{icon}</div>
      </div>
      <h4 className="text-lg font-semibold text-gray-900 mb-2">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </div>;
}