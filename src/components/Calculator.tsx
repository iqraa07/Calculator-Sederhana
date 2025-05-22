import React, { useState } from "react";
import CalculatorButton from "./CalculatorButton";
import CalculatorDisplay from "./CalculatorDisplay";

const BUTTONS = [
  "C", "⌫", "÷", "×",
  "7", "8", "9", "-",
  "4", "5", "6", "+",
  "1", "2", "3", "=",
  "0", ".", 
];

function calculate(exp) {
  // Ganti simbol ke operator js
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
    } else if (["+", "-", "×", "÷"].includes(btn)) {
      if (exp === "" && btn !== "-") return; // prevent starting with operator except minus
      if (/[+\-×÷]$/.test(exp)) return; // prevent double operator
      setExp(exp + btn);
      setValue(exp + btn);
      setJustEvaluated(false);
    } else if (btn === ".") {
      // prevent double decimal in one number
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
  );
}
