import { useState } from 'react';

interface TooltipProps {
  children: React.ReactNode;
  content: string;
}

export function Tooltip({ children, content }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div 
        onMouseEnter={() => setIsVisible(true)} 
        onMouseLeave={() => setIsVisible(false)} 
        onClick={() => setIsVisible(!isVisible)}
      >
        {children}
      </div>
      
      {isVisible && (
        <div className="absolute z-10 w-64 p-2 mt-1 text-sm text-white bg-gray-800 rounded-md shadow-lg -left-28 top-full">
          <div className="absolute w-3 h-3 bg-gray-800 transform rotate-45 -mt-1 left-1/2 -translate-x-1/2"></div>
          {content}
        </div>
      )}
    </div>
  );
}
