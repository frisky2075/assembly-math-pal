
import { Calculator } from '@/components/Calculator';

const Index = () => {
  return (
    <div className="min-h-screen bg-terminal-bg text-terminal-green">
      {/* Header */}
      <div className="border-b border-terminal-green/30 bg-terminal-bg/90 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-terminal-green rounded-full animate-pulse"></div>
              <h1 className="text-2xl font-mono font-bold text-terminal-green">
                Assembly Math Pal
              </h1>
            </div>
            <div className="text-terminal-green/70 font-mono text-sm">
              v1.0 | x86 Assembly Calculator
            </div>
          </div>
          <div className="text-terminal-green/50 font-mono text-xs mt-1">
            {'>'} Performing mathematical operations with assembly-style precision
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="py-8">
        <Calculator />
      </main>

      {/* Footer */}
      <footer className="border-t border-terminal-green/30 bg-terminal-bg/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="text-center text-terminal-green/50 font-mono text-xs">
            <div>Assembly Math Pal - Multiple calculations with assembly language styling</div>
            <div className="mt-1">Built with React + TypeScript | Terminal Interface</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
