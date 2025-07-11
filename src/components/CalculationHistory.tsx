
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Trash2, Clock } from 'lucide-react';
import { Calculation } from './Calculator';

interface CalculationHistoryProps {
  calculations: Calculation[];
  onClear: () => void;
}

export const CalculationHistory = ({ calculations, onClear }: CalculationHistoryProps) => {
  return (
    <Card className="bg-terminal-bg border-terminal-green/30 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-terminal-green" />
          <h2 className="text-terminal-green font-mono text-lg">HISTORY LOG</h2>
        </div>
        {calculations.length > 0 && (
          <Button
            onClick={onClear}
            size="sm"
            className="bg-terminal-red/20 hover:bg-terminal-red text-terminal-red border border-terminal-red/50"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </div>

      <ScrollArea className="h-96 w-full">
        {calculations.length === 0 ? (
          <div className="text-terminal-green/50 font-mono text-sm">
            <div>; No calculations yet</div>
            <div>; Start computing to see history</div>
          </div>
        ) : (
          <div className="space-y-3">
            {calculations.map((calc, index) => (
              <div
                key={calc.id}
                className="p-3 border border-terminal-green/30 rounded bg-terminal-bg/50 hover:bg-terminal-green/5 transition-colors"
              >
                <div className="font-mono text-sm">
                  <div className="text-terminal-amber text-xs mb-1">
                    ; Operation #{calculations.length - index}
                  </div>
                  <div className="text-terminal-green">
                    {calc.operation}
                  </div>
                  <div className="text-terminal-green/70 text-xs mt-2">
                    {calc.timestamp.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>

      {calculations.length > 0 && (
        <div className="mt-4 pt-4 border-t border-terminal-green/30">
          <div className="text-terminal-green font-mono text-xs">
            Total Operations: {calculations.length}
          </div>
        </div>
      )}
    </Card>
  );
};
