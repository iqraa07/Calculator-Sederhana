import React, { useState, useRef } from "react";
import CalculatorButton from "./CalculatorButton";
import CalculatorDisplay from "./CalculatorDisplay";
import Notification from "./Notification";

const BUTTONS = [
  "C", "⌫", "÷", "×",
  "7", "8", "9", "-",
  "4", "5", "6", "+",
  "1", "2", "3", "=",
  "0", ".",
];

function customSumLogic(exp) {
  // Deteksi ekspresi "angka + angka" saja (tanpa spasi)
  const match = exp.match(/^(\d+)\s*\+\s*(\d+)$/);
  if (match) {
    const x = Number(match[1]);
    const y = Number(match[2]);
    if (x === y) {
      // Kalau sama: x + 2y
      return (x + 2 * y).toString();
    } else {
      // Kalau beda: x + 3y
      return (x + 3 * y).toString();
    }
  }
  // Kalau bukan 2 angka penjumlahan, return null (biar pakai eval biasa)
  return null;
}

function calculate(exp) {
  // Cek logika khusus dulu
  const special = customSumLogic(exp);
  if (special !== null) return special;
  // Operator lain: normal
  let str = exp.replace(/÷/g, "/").replace(/×/g, "*");
  try {
    // eslint-disable-next-line no-eval
    let result = eval(str);
    if (result === Infinity || result === -Infinity || isNaN(result)) return "Error";
    return result.toString();
  } catch {
    return "Error";
  }
}

export default function Calculator() {
  const [exp, setExp] = useState("");
  const [value, setValue] = useState("0");
  const [justEvaluated, setJustEvaluated] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const notifTimer = useRef(null);

  const handleButton = (btn) => {
    if (btn === "C") {
      setExp("");
      setValue("0");
      setJustEvaluated(false);
    } else if (btn === "⌫") {
      if (exp.length > 0) {
        setExp(exp.slice(0, -1));
        setValue(exp.slice(0, -1) || "0");
      }
    } else if (btn === "=") {
      if (exp === "") return;
      const res = calculate(exp);
      setValue(res);
      setExp(res === "Error" ? "" : res);
      setJustEvaluated(true);
      if (res !== "Error") {
        setShowNotif(true);
        if (notifTimer.current) clearTimeout(notifTimer.current);
        notifTimer.current = setTimeout(() => setShowNotif(false), 2000);
      }
    } else if (["+", "-", "×", "÷"].includes(btn)) {
      if (exp === "" && btn !== "-") return;
      if (/[+\-×÷]$/.test(exp)) return;
      setExp(exp + btn);
      setValue(exp + btn);
      setJustEvaluated(false);
    } else if (btn === ".") {
      let lastNum = exp.split(/[+\-×÷]/).pop();
      if (lastNum.includes(".")) return;
      setExp(exp === "" ? "0." : exp + ".");
      setValue(exp === "" ? "0." : exp + ".");
      setJustEvaluated(false);
    } else { // number
      if (exp === "0" || justEvaluated) {
        setExp(btn);
        setValue(btn);
        setJustEvaluated(false);
      } else {
        setExp(exp + btn);
        setValue(exp + btn);
      }
    }
  };

  return (
    <>
      <Notification show={showNotif} message="Berhasil! Jangan lupa cek keranjang kuning!" />
      <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 shadow-xl max-w-sm w-full mx-auto">
        <CalculatorDisplay value={value} />
        <div className="grid grid-cols-4 gap-3">
          {BUTTONS.map((btn, i) => (
            <CalculatorButton 
              key={i}
              label={btn}
              onClick={() => handleButton(btn)}
              variant={
                btn === "="
                  ? "equals"
                  : ["+", "-", "×", "÷"].includes(btn)
                  ? "operator"
                  : ["C", "⌫"].includes(btn)
                  ? "function"
                  : "number"
              }
              doubleWidth={btn === "0"}
            />
          ))}
        </div>
      </div>
    </>
  );
}
