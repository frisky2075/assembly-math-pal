
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Calculation } from './Calculator';

interface AssemblyDisplayProps {
  calculations: Calculation[];
}

export const AssemblyDisplay = ({ calculations }: AssemblyDisplayProps) => {
  const latestCalculation = calculations[0];

  return (
    <Card className="bg-terminal-bg border-terminal-green/30 p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 bg-terminal-green rounded-full animate-pulse"></div>
        <h2 className="text-terminal-green font-mono text-lg">ASSEMBLY DEBUGGER</h2>
      </div>
      
      <ScrollArea className="h-96 w-full">
        <div className="font-mono text-sm space-y-2">
          {latestCalculation ? (
            <>
              <div className="text-terminal-amber mb-2">; Latest Operation:</div>
              <div className="text-terminal-green/70 mb-4">; {latestCalculation.operation}</div>
              
              <div className="space-y-1">
                {latestCalculation.assemblyCode.split('\n').map((line, index) => (
                  <div key={index} className="flex">
                    <span className="text-terminal-amber w-8 text-xs">{String(index + 1).padStart(2, '0')}:</span>
                    <span className="text-terminal-green pl-2">{line}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-terminal-green/30">
                <div className="text-terminal-amber text-xs">; Program Status:</div>
                <div className="text-terminal-green text-xs">
                  STATUS: OPERATION_COMPLETE<br/>
                  RESULT: {latestCalculation.result}<br/>
                  TIME: {latestCalculation.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </>
          ) : (
            <div className="text-terminal-green/50">
              <div className="text-terminal-amber">; Assembly Math Pal v1.0</div>
              <div>; Waiting for calculations...</div>
              <div className="mt-4">
                <div>; Available Instructions:</div>
                <div>; ADD - Addition</div>
                <div>; SUB - Subtraction</div>
                <div>; MUL - Multiplication</div>
                <div>; DIV - Division</div>
              </div>
              <div className="mt-4 flex items-center">
                <span>></span>
                <span className="animate-blink ml-1">_</span>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </Card>
  );
};
