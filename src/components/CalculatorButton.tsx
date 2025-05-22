import React from "react";

export default function CalculatorButton({
  label,
  onClick,
  variant = "number",
  doubleWidth = false,
}) {
  const base =
    "flex items-center justify-center rounded-lg font-medium transition-all duration-200 active:scale-95 shadow-md text-lg";
  const color = {
    number: "bg-gray-200/80 hover:bg-gray-300/90 text-gray-800",
    operator: "bg-blue-500/90 hover:bg-blue-600 text-white",
    function: "bg-gray-400/90 hover:bg-gray-500 text-white",
    equals: "bg-green-500/90 hover:bg-green-600 text-white",
  };
  const width = doubleWidth ? "col-span-2" : "";
  return (
    <button
      className={`${base} ${color[variant]} ${width}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
