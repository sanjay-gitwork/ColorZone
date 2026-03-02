import { useState, useCallback } from 'react';
import { Shuffle, Copy, Check, MousePointer2, RefreshCcw, History } from 'lucide-react';
import { colord } from 'colord';

interface RandomGeneratorProps {
  onColorSelect: (color: string) => void;
}

const RandomGenerator = ({ onColorSelect }: RandomGeneratorProps) => {
  const [currentColor, setCurrentColor] = useState(() => {
    return colord({
      h: Math.floor(Math.random() * 360),
      s: Math.floor(Math.random() * 80) + 10,
      v: Math.floor(Math.random() * 80) + 10,
    }).toHex();
  });

  const generateRandomHex = () => {
    return colord({
      h: Math.floor(Math.random() * 360),
      s: Math.floor(Math.random() * 80) + 10, // Avoid too desaturated
      v: Math.floor(Math.random() * 80) + 10, // Avoid too dark/light
    }).toHex();
  };

  const [history, setHistory] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  const handleShuffle = useCallback(() => {
    const newColor = generateRandomHex();
    setHistory(prev => [currentColor, ...prev].slice(0, 12));
    setCurrentColor(newColor);
  }, [currentColor]);

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopied(hex);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4">
      {/* Main Display */}
      <div className="bg-white dark:bg-slate-900 p-12 rounded-[2.5rem] shadow-sm border border-slate-200 dark:border-slate-800 text-center space-y-10">
        <div className="space-y-2">
          <h3 className="text-2xl font-black">Random Color Inspiration</h3>
          <p className="text-slate-500 dark:text-slate-400">Discover your next brand color with a single click</p>
        </div>

        <div className="flex flex-col items-center gap-8">
          <div 
            className="w-64 h-64 rounded-[3rem] shadow-2xl ring-8 ring-white dark:ring-slate-800 transition-all duration-500 ease-out transform hover:scale-105"
            style={{ backgroundColor: currentColor }}
          />
          
          <div className="space-y-4">
            <p className="text-4xl font-mono font-black uppercase tracking-tighter text-slate-800 dark:text-white">
              {currentColor}
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => handleCopy(currentColor)}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all font-bold text-sm"
              >
                {copied === currentColor ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                Copy Hex
              </button>
              <button
                onClick={() => onColorSelect(currentColor)}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 font-bold text-sm"
              >
                <MousePointer2 className="w-4 h-4" />
                Select Color
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={handleShuffle}
          className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black text-lg transition-all hover:scale-110 active:scale-95 shadow-xl"
        >
          <Shuffle className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
          SHUFFLE
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity" />
        </button>
      </div>

      {/* History Grid */}
      {history.length > 0 && (
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-sm border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-xl">
              <History className="w-5 h-5 text-slate-400" />
            </div>
            <h4 className="font-bold text-lg">Shuffle History</h4>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {history.map((hex, i) => (
              <div key={`${hex}-${i}`} className="space-y-2 group">
                <button
                  onClick={() => {
                    setCurrentColor(hex);
                    onColorSelect(hex);
                  }}
                  className="w-full aspect-square rounded-2xl shadow-sm border border-black/5 dark:border-white/5 transition-all hover:scale-110 active:scale-95"
                  style={{ backgroundColor: hex }}
                />
                <div className="flex items-center justify-between px-1">
                  <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">{hex}</span>
                  <button 
                    onClick={() => handleCopy(hex)}
                    className="text-slate-300 hover:text-blue-500 transition-colors"
                  >
                    {copied === hex ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="p-6 bg-amber-50 dark:bg-amber-900/20 rounded-[2rem] border border-amber-100 dark:border-amber-900/30 flex gap-4 items-start">
        <div className="p-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
          <RefreshCcw className="w-5 h-5 text-amber-500" />
        </div>
        <div>
          <h4 className="font-bold text-amber-900 dark:text-amber-100 text-sm mb-1">Randomness with Logic</h4>
          <p className="text-xs text-amber-700 dark:text-amber-300 leading-relaxed font-medium">
            Our shuffle algorithm doesn't just pick random numbers. It intelligently avoids pure whites, blacks, and muddy grays to ensure you always get colors that work for modern interface design.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RandomGenerator;