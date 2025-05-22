/**
 * Calculator Logic
 * This file contains all the business logic for the calculator application
 */

// Define the memory value for memory operations
let memoryValue = 0;

// Define types for calculator state
export interface CalculatorState {
  currentValue: string;
  previousValue: string;
  operator: string | null;
  waitingForOperand: boolean;
  memory: number;
  history: string[];
}

// Initialize calculator state
export const initialState: CalculatorState = {
  currentValue: '0',
  previousValue: '',
  operator: null,
  waitingForOperand: false,
  memory: 0,
  history: []
};

// Handle number input
export function handleNumberInput(state: CalculatorState, digit: string): CalculatorState {
  const { currentValue, waitingForOperand } = state;

  if (waitingForOperand) {
    return {
      ...state,
      currentValue: digit,
      waitingForOperand: false
    };
  }

  return {
    ...state,
    currentValue: currentValue === '0' ? digit : currentValue + digit
  };
}

// Handle decimal point
export function handleDecimalPoint(state: CalculatorState): CalculatorState {
  const { currentValue, waitingForOperand } = state;

  if (waitingForOperand) {
    return {
      ...state,
      currentValue: '0.',
      waitingForOperand: false
    };
  }

  if (currentValue.indexOf('.') === -1) {
    return {
      ...state,
      currentValue: currentValue + '.',
    };
  }

  return state;
}

// Handle operator
export function handleOperator(state: CalculatorState, nextOperator: string): CalculatorState {
  const { currentValue, previousValue, operator } = state;
  const inputValue = parseFloat(currentValue);

  if (previousValue === '' && !isNaN(inputValue)) {
    return {
      ...state,
      previousValue: currentValue,
      operator: nextOperator,
      waitingForOperand: true
    };
  }

  if (operator) {
    const currentValueNum = parseFloat(currentValue);
    const previousValueNum = parseFloat(previousValue);
    let newValue;

    switch (operator) {
      case '+':
        newValue = previousValueNum + currentValueNum;
        break;
      case '-':
        newValue = previousValueNum - currentValueNum;
        break;
      case '×':
        newValue = previousValueNum * currentValueNum;
        break;
      case '÷':
        newValue = previousValueNum / currentValueNum;
        break;
      case '^':
        newValue = Math.pow(previousValueNum, currentValueNum);
        break;
      default:
        newValue = currentValueNum;
    }

    const newHistory = [...state.history];
    if (newHistory.length >= 5) {
      newHistory.shift();
    }
    newHistory.push(`${previousValue} ${operator} ${currentValue} = ${newValue}`);

    return {
      ...state,
      currentValue: String(newValue),
      previousValue: String(newValue),
      operator: nextOperator,
      waitingForOperand: true,
      history: newHistory
    };
  }

  return state;
}

// Handle equals
export function handleEquals(state: CalculatorState): CalculatorState {
  if (!state.operator || state.previousValue === '') {
    return state;
  }

  const result = handleOperator(state, null);
  return {
    ...result,
    previousValue: '',
    waitingForOperand: true
  };
}

// Handle clear
export function handleClear(state: CalculatorState): CalculatorState {
  return {
    ...initialState,
    memory: state.memory,
    history: state.history
  };
}

// Handle clear entry
export function handleClearEntry(state: CalculatorState): CalculatorState {
  return {
    ...state,
    currentValue: '0'
  };
}

// Handle backspace
export function handleBackspace(state: CalculatorState): CalculatorState {
  const { currentValue } = state;

  if (currentValue === '0' || currentValue.length === 1 || state.waitingForOperand) {
    return {
      ...state,
      currentValue: '0',
      waitingForOperand: false
    };
  }

  return {
    ...state,
    currentValue: currentValue.substring(0, currentValue.length - 1)
  };
}

// Handle percentage
export function handlePercentage(state: CalculatorState): CalculatorState {
  const { currentValue } = state;
  const value = parseFloat(currentValue);

  if (isNaN(value)) return state;

  return {
    ...state,
    currentValue: String(value / 100)
  };
}

// Handle square root
export function handleSquareRoot(state: CalculatorState): CalculatorState {
  const { currentValue } = state;
  const value = parseFloat(currentValue);

  if (isNaN(value) || value < 0) return state;

  return {
    ...state,
    currentValue: String(Math.sqrt(value))
  };
}

// Handle memory functions
export function handleMemoryAdd(state: CalculatorState): CalculatorState {
  const { currentValue, memory } = state;
  const value = parseFloat(currentValue);

  if (isNaN(value)) return state;

  return {
    ...state,
    memory: memory + value
  };
}

export function handleMemorySubtract(state: CalculatorState): CalculatorState {
  const { currentValue, memory } = state;
  const value = parseFloat(currentValue);

  if (isNaN(value)) return state;

  return {
    ...state,
    memory: memory - value
  };
}

export function handleMemoryRecall(state: CalculatorState): CalculatorState {
  return {
    ...state,
    currentValue: String(state.memory),
    waitingForOperand: false
  };
}

export function handleMemoryClear(state: CalculatorState): CalculatorState {
  return {
    ...state,
    memory: 0
  };
}

// Handle sign change
export function handleSignChange(state: CalculatorState): CalculatorState {
  const { currentValue } = state;
  const value = parseFloat(currentValue);

  if (isNaN(value) || value === 0) return state;

  return {
    ...state,
    currentValue: String(-value)
  };
}