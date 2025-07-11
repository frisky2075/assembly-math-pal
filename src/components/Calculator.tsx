
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { AssemblyDisplay } from './AssemblyDisplay';
import { CalculationHistory } from './CalculationHistory';
import { toast } from 'sonner';

export interface Calculation {
  id: string;
  operation: string;
  result: number;
  assemblyCode: string;
  timestamp: Date;
}

export const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [calculations, setCalculations] = useState<Calculation[]>([]);
  const [registers, setRegisters] = useState({
    AX: 0,
    BX: 0,
    CX: 0,
    DX: 0
  });

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);
      
      const assemblyCode = generateAssemblyCode(currentValue, inputValue, operation);
      const calculation: Calculation = {
        id: Date.now().toString(),
        operation: `${currentValue} ${operation} ${inputValue} = ${newValue}`,
        result: newValue,
        assemblyCode,
        timestamp: new Date()
      };

      setCalculations(prev => [calculation, ...prev]);
      setDisplay(String(newValue));
      setPreviousValue(newValue);
      
      // Update registers
      setRegisters(prev => ({
        ...prev,
        AX: newValue,
        BX: currentValue,
        CX: inputValue,
        DX: prev.DX + 1 // Increment operation counter
      }));

      toast.success('Calculation completed!', {
        description: `Result: ${newValue}`
      });
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        return secondValue !== 0 ? firstValue / secondValue : 0;
      default:
        return secondValue;
    }
  };

  const generateAssemblyCode = (val1: number, val2: number, op: string): string => {
    const opcodes = {
      '+': 'ADD',
      '-': 'SUB',
      '*': 'MUL',
      '/': 'DIV'
    };
    
    return `MOV AX, ${val1}
MOV BX, ${val2}
${opcodes[op as keyof typeof opcodes]} AX, BX
MOV [RESULT], AX`;
  };

  const buttonClass = "h-16 text-xl font-mono bg-terminal-gray hover:bg-terminal-green hover:text-terminal-bg transition-all duration-200 border border-terminal-green/30";
  const operatorClass = "h-16 text-xl font-mono bg-terminal-green/20 hover:bg-terminal-green hover:text-terminal-bg text-terminal-green transition-all duration-200 border border-terminal-green";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto p-6">
      {/* Calculator */}
      <Card className="bg-terminal-bg border-terminal-green/30 p-6">
        <div className="mb-4">
          <Input
            value={display}
            readOnly
            className="h-16 text-3xl font-mono text-terminal-green bg-terminal-bg border-terminal-green/50 text-right"
          />
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          <Button onClick={clear} className={`${buttonClass} col-span-2 bg-terminal-red/20 hover:bg-terminal-red text-terminal-red`}>
            CLEAR
          </Button>
          <Button onClick={() => performOperation('/')} className={operatorClass}>
            ÷
          </Button>
          <Button onClick={() => performOperation('*')} className={operatorClass}>
            ×
          </Button>
          
          <Button onClick={() => inputDigit('7')} className={buttonClass}>7</Button>
          <Button onClick={() => inputDigit('8')} className={buttonClass}>8</Button>
          <Button onClick={() => inputDigit('9')} className={buttonClass}>9</Button>
          <Button onClick={() => performOperation('-')} className={operatorClass}>-</Button>
          
          <Button onClick={() => inputDigit('4')} className={buttonClass}>4</Button>
          <Button onClick={() => inputDigit('5')} className={buttonClass}>5</Button>
          <Button onClick={() => inputDigit('6')} className={buttonClass}>6</Button>
          <Button onClick={() => performOperation('+')} className={operatorClass}>+</Button>
          
          <Button onClick={() => inputDigit('1')} className={buttonClass}>1</Button>
          <Button onClick={() => inputDigit('2')} className={buttonClass}>2</Button>
          <Button onClick={() => inputDigit('3')} className={buttonClass}>3</Button>
          <Button onClick={() => performOperation('=')} className={`${operatorClass} row-span-2`}>
            =
          </Button>
          
          <Button onClick={() => inputDigit('0')} className={`${buttonClass} col-span-2`}>0</Button>
          <Button onClick={inputDecimal} className={buttonClass}>.</Button>
        </div>

        {/* Register Display */}
        <div className="mt-6 p-4 bg-terminal-bg border border-terminal-green/30 rounded">
          <h3 className="text-terminal-green font-mono text-sm mb-2">REGISTERS</h3>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            {Object.entries(registers).map(([reg, val]) => (
              <div key={reg} className="flex justify-between text-terminal-green">
                <span>{reg}:</span>
                <span>{val.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Assembly Display */}
      <AssemblyDisplay calculations={calculations} />

      {/* Calculation History */}
      <CalculationHistory 
        calculations={calculations} 
        onClear={() => setCalculations([])}
      />
    </div>
  );
};
