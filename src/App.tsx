import React from 'react';
import Calculator from './components/Calculator';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
      </div>
      <Calculator />
      <footer className="mt-8 text-center text-gray-500 text-sm">
      </footer>
    </div>
  );
}

export default App;