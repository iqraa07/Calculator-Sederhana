import React from "react";

export default function CalculatorDisplay({ value }) {
  return (
    <div className="relative w-full rounded-2xl p-6 mb-6 shadow-lg bg-gradient-to-br from-gray-800/95 to-gray-700/95 border-2 border-gray-900/10">
      {/* Efek "shine" kaca */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rotate-45 blur-xl"></div>
      </div>
      {/* Value */}
      <div
        className="relative text-white font-bold text-right select-all transition-all duration-300"
        style={{
          fontSize:
            value.length > 8
              ? `clamp(2rem, ${3.5 - (value.length - 8) * 0.2}rem, 3.5rem)`
              : "3.5rem",
          letterSpacing: value.length > 12 ? "0.03em" : "0.07em",
          minHeight: "2.5em",
          lineHeight: "2.7rem",
          textShadow:
            "0 2px 16px rgba(0,0,0,0.15), 0 1px 0 rgba(255,255,255,0.03)",
        }}
      >
        {value}
      </div>
    </div>
  );
}
