import React from "react";

export default function Notification({ show, message }) {
  return (
    <div
      className={`fixed top-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl bg-yellow-300 text-yellow-900 shadow-lg flex items-center gap-2 font-semibold text-base z-50 transition-all duration-500 ${
        show ? "opacity-100 pointer-events-auto scale-100" : "opacity-0 pointer-events-none scale-95"
      }`}
      style={{ minWidth: 220 }}
    >
      <span className="text-xl">🛒</span>
      <span>{message}</span>
    </div>
  );
}
