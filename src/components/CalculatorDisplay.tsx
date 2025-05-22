import React from "react";

export default function CalculatorDisplay({ value }) {
  return (
    <div className="w-full bg-gray-900/90 rounded-lg p-4 mb-4 shadow-inner text-right flex flex-col">
      <div
        className="text-white text-3xl font-medium transition-all duration-300 overflow-x-auto scrollbar-hide"
        style={{
          fontSize: value.length > 7 ? `${Math.max(1.5, 3 - (value.length - 10) * 0.1)}rem` : "3rem",
        }}
      >
        {value}
      </div>
    </div>
  );
}
