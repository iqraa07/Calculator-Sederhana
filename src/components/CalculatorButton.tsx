import React from 'react';

interface CalculatorButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'number' | 'operator' | 'function' | 'equals' | 'memory';
  className?: string;
  doubleWidth?: boolean;
}

const CalculatorButton: React.FC<CalculatorButtonProps> = ({
  label,
  onClick,
  variant = 'number',
  className = '',
  doubleWidth = false
}) => {
  const baseClasses = "flex items-center justify-center rounded-lg font-medium transition-all duration-200 active:scale-95 shadow-md text-lg";
  
  const variantClasses = {
    number: "bg-gray-200/80 hover:bg-gray-300/90 text-gray-800",
    operator: "bg-blue-500/90 hover:bg-blue-600 text-white",
    function: "bg-gray-400/90 hover:bg-gray-500 text-white",
    equals: "bg-green-500/90 hover:bg-green-600 text-white",
    memory: "bg-amber-500/90 hover:bg-amber-600 text-white"
  };

  const widthClass = doubleWidth ? "col-span-2" : "";
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${widthClass} ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default CalculatorButton;