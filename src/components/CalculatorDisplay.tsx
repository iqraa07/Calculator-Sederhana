import React from 'react';

interface CalculatorDisplayProps {
  value: string;
  formula?: string;
}

const CalculatorDisplay: React.FC<CalculatorDisplayProps> = ({ value, formula = '' }) => {
  // Format large numbers with commas
  const formatValue = (val: string) => {
    // Don't format if it's a decimal point or has an operator
    if (val.includes('.') || val.includes('e')) {
      return val;
    }
    
    // Format with commas
    return parseFloat(val).toLocaleString('en-US', {
      maximumFractionDigits: 10
    });
  };

  return (
    <div className="w-full bg-gray-900/90 rounded-lg p-4 mb-4 shadow-inner text-right flex flex-col">
      {formula && (
        <div className="text-gray-400 text-sm mb-1 h-6 overflow-hidden">
          {formula}
        </div>
      )}
      <div 
        className="text-white text-3xl font-medium transition-all duration-300 overflow-x-auto scrollbar-hide"
        style={{ 
          fontSize: value.length > 5 ? `${Math.max(1.5, 3 - (value.length - 10) * 0.1)}rem` : '3rem'
        }}
      >
        {formatValue(value)}
      </div>
    </div>
  );
};

export default CalculatorDisplay;
