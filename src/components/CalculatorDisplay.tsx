import React from "react";

export default function CalculatorDisplay({ value }) {
  return (
    <div className="relative w-full rounded-2xl p-6 mb-6 shadow-lg bg-gradient-to-br from-gray-800/95 to-gray-700/95 border-2 border-gray-900/10">
      <div className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rotate-45 blur-xl"></div>
      </div>
      <div
        className="relative text-white font-bold text-right select-all transition-all duration-300 break-words"
        style={{
          fontSize:
            value.length > 8
              ? `clamp(1.3rem, ${3.5 - (value.length - 8) * 0.19}rem, 3.5rem)`
              : "3.5rem",
          letterSpacing: value.length > 12 ? "0.03em" : "0.07em",
          minHeight: "2.5em",
          lineHeight: "2.7rem",
          wordBreak: "break-all",
        }}
      >
        {value}
      </div>
    </div>
  );
}
