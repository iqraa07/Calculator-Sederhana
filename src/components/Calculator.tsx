import React, { useReducer, useState } from 'react';
import CalculatorButton from './CalculatorButton';
import CalculatorDisplay from './CalculatorDisplay';
import { 
  initialState, 
  handleNumberInput, 
  handleDecimalPoint, 
  handleOperator, 
  handleEquals, 
  handleClear, 
  handleClearEntry,
  handleBackspace,
  handlePercentage,
  handleSquareRoot,
  handleMemoryAdd,
  handleMemorySubtract,
  handleMemoryRecall,
  handleMemoryClear,
  handleSignChange,
  CalculatorState
} from '../utils/calculatorLogic';

type CalculatorAction =
  | { type: 'NUMBER_INPUT'; payload: string }
  | { type: 'DECIMAL_POINT' }
  | { type: 'OPERATOR'; payload: string }
  | { type: 'EQUALS' }
  | { type: 'CLEAR' }
  | { type: 'CLEAR_ENTRY' }
  | { type: 'BACKSPACE' }
  | { type: 'PERCENTAGE' }
  | { type: 'SQUARE_ROOT' }
  | { type: 'MEMORY_ADD' }
  | { type: 'MEMORY_SUBTRACT' }
  | { type: 'MEMORY_RECALL' }
  | { type: 'MEMORY_CLEAR' }
  | { type: 'SIGN_CHANGE' };

const Calculator: React.FC = () => {
  const [showHistory, setShowHistory] = useState(false);

  // Reducer function to manage calculator state
  const calculatorReducer = (state: CalculatorState, action: CalculatorAction): CalculatorState => {
    switch (action.type) {
      case 'NUMBER_INPUT':
        return handleNumberInput(state, action.payload);
      case 'DECIMAL_POINT':
        return handleDecimalPoint(state);
      case 'OPERATOR':
        return handleOperator(state, action.payload);
      case 'EQUALS':
        return handleEquals(state);
      case 'CLEAR':
        return handleClear(state);
      case 'CLEAR_ENTRY':
        return handleClearEntry(state);
      case 'BACKSPACE':
        return handleBackspace(state);
      case 'PERCENTAGE':
        return handlePercentage(state);
      case 'SQUARE_ROOT':
        return handleSquareRoot(state);
      case 'MEMORY_ADD':
        return handleMemoryAdd(state);
      case 'MEMORY_SUBTRACT':
        return handleMemorySubtract(state);
      case 'MEMORY_RECALL':
        return handleMemoryRecall(state);
      case 'MEMORY_CLEAR':
        return handleMemoryClear(state);
      case 'SIGN_CHANGE':
        return handleSignChange(state);
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(calculatorReducer, initialState);
  
  // Display formula
  const getFormula = () => {
    if (state.previousValue && state.operator) {
      return `${state.previousValue} ${state.operator}${state.waitingForOperand ? '' : ' ' + state.currentValue}`;
    }
    return '';
  };

  return (
    <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 shadow-xl max-w-sm w-full mx-auto">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Calculator</h2>
        <button 
          onClick={() => setShowHistory(!showHistory)}
          className="text-blue-500 hover:text-blue-600 transition-colors"
        >
          {showHistory ? 'Hide History' : 'Show History'}
        </button>
      </div>

      {showHistory && (
        <div className="mb-4 bg-gray-100/90 rounded-lg p-3 max-h-32 overflow-y-auto">
          <h3 className="text-sm font-medium text-gray-600 mb-2">History</h3>
          {state.history.length === 0 ? (
            <p className="text-gray-500 text-sm">No calculations yet</p>
          ) : (
            <ul className="space-y-1">
              {state.history.map((item, index) => (
                <li key={index} className="text-sm text-gray-700">{item}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      <CalculatorDisplay value={state.currentValue} formula={getFormula()} />

      <div className="grid grid-cols-4 gap-3">
        {/* First Row - Memory and Clear Functions */}
        <CalculatorButton label="MC" onClick={() => dispatch({ type: 'MEMORY_CLEAR' })} variant="memory" />
        <CalculatorButton label="MR" onClick={() => dispatch({ type: 'MEMORY_RECALL' })} variant="memory" />
        <CalculatorButton label="M+" onClick={() => dispatch({ type: 'MEMORY_ADD' })} variant="memory" />
        <CalculatorButton label="M-" onClick={() => dispatch({ type: 'MEMORY_SUBTRACT' })} variant="memory" />

        {/* Second Row - Clear and Operations */}
        <CalculatorButton label="C" onClick={() => dispatch({ type: 'CLEAR' })} variant="function" />
        <CalculatorButton label="CE" onClick={() => dispatch({ type: 'CLEAR_ENTRY' })} variant="function" />
        <CalculatorButton label="⌫" onClick={() => dispatch({ type: 'BACKSPACE' })} variant="function" />
        <CalculatorButton label="÷" onClick={() => dispatch({ type: 'OPERATOR', payload: '÷' })} variant="operator" />

        {/* Third Row - Numbers and Multiply */}
        <CalculatorButton label="7" onClick={() => dispatch({ type: 'NUMBER_INPUT', payload: '7' })} />
        <CalculatorButton label="8" onClick={() => dispatch({ type: 'NUMBER_INPUT', payload: '8' })} />
        <CalculatorButton label="9" onClick={() => dispatch({ type: 'NUMBER_INPUT', payload: '9' })} />
        <CalculatorButton label="×" onClick={() => dispatch({ type: 'OPERATOR', payload: '×' })} variant="operator" />

        {/* Fourth Row - Numbers and Subtract */}
        <CalculatorButton label="4" onClick={() => dispatch({ type: 'NUMBER_INPUT', payload: '4' })} />
        <CalculatorButton label="5" onClick={() => dispatch({ type: 'NUMBER_INPUT', payload: '5' })} />
        <CalculatorButton label="6" onClick={() => dispatch({ type: 'NUMBER_INPUT', payload: '6' })} />
        <CalculatorButton label="-" onClick={() => dispatch({ type: 'OPERATOR', payload: '-' })} variant="operator" />

        {/* Fifth Row - Numbers and Add */}
        <CalculatorButton label="1" onClick={() => dispatch({ type: 'NUMBER_INPUT', payload: '1' })} />
        <CalculatorButton label="2" onClick={() => dispatch({ type: 'NUMBER_INPUT', payload: '2' })} />
        <CalculatorButton label="3" onClick={() => dispatch({ type: 'NUMBER_INPUT', payload: '3' })} />
        <CalculatorButton label="+" onClick={() => dispatch({ type: 'OPERATOR', payload: '+' })} variant="operator" />

        {/* Sixth Row - Special Functions */}
        <CalculatorButton label="±" onClick={() => dispatch({ type: 'SIGN_CHANGE' })} />
        <CalculatorButton label="0" onClick={() => dispatch({ type: 'NUMBER_INPUT', payload: '0' })} />
        <CalculatorButton label="." onClick={() => dispatch({ type: 'DECIMAL_POINT' })} />
        <CalculatorButton label="=" onClick={() => dispatch({ type: 'EQUALS' })} variant="equals" />

        {/* Seventh Row - Advanced Functions */}
        <CalculatorButton label="%" onClick={() => dispatch({ type: 'PERCENTAGE' })} variant="function" />
        <CalculatorButton label="√" onClick={() => dispatch({ type: 'SQUARE_ROOT' })} variant="function" />
        <CalculatorButton 
          label="x²" 
          onClick={() => {
            dispatch({ type: 'OPERATOR', payload: '^' });
            dispatch({ type: 'NUMBER_INPUT', payload: '2' });
            dispatch({ type: 'EQUALS' });
          }} 
          variant="function" 
        />
        <CalculatorButton 
          label="x^y" 
          onClick={() => dispatch({ type: 'OPERATOR', payload: '^' })} 
          variant="function" 
        />
      </div>
    </div>
  );
};

export default Calculator;