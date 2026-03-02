import { useState } from 'react';
import { Copy, Check, Hash, ArrowLeftRight, RefreshCcw } from 'lucide-react';
import { colord } from 'colord';
import { calculateCmyk } from '../utils/colors';

interface ColorConverterProps {
  currentColor: string;
  onColorChange: (color: string) => void;
}

const ColorConverter = ({ currentColor, onColorChange }: ColorConverterProps) => {
  const [inputValue, setInputValue] = useState(currentColor);
  const [copied, setCopied] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(true);
  const [prevColor, setPrevColor] = useState(currentColor);

  if (currentColor !== prevColor) {
    setPrevColor(currentColor);
    setInputValue(currentColor);
    setIsValid(true);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    if (colord(val).isValid()) {
      onColorChange(colord(val).toHex());
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  const c = colord(inputValue.length > 0 && isValid ? inputValue : currentColor);
  
  const formats = [
    { label: 'HEX', value: c.toHex() },
    { label: 'RGB', value: c.toRgbString() },
    { label: 'HSL', value: c.toHslString() },
    { label: 'HSV', value: JSON.stringify(c.toHsv()).replace(/"/g, '').replace(/,/g, ', ') },
    { label: 'CMYK', value: calculateCmyk(c.toHex()) },
    { label: 'CSS Name', value: c.toName({ closest: true }) || 'Unknown' },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4">
      {/* Input Section */}
      <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold flex items-center gap-3">
            <ArrowLeftRight className="w-6 h-6 text-blue-500" />
            Universal Converter
          </h3>
          <div 
            className="w-12 h-12 rounded-xl border-4 border-white dark:border-slate-800 shadow-lg transition-colors"
            style={{ backgroundColor: c.toHex() }}
          />
        </div>

        <div className="relative">
          <label className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2 block">
            Enter Any Color Format
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Hash className={`w-5 h-5 transition-colors ${isValid ? 'text-slate-400' : 'text-red-500'}`} />
            </div>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="e.g. #6366f1, rgb(99, 102, 241), hsl(239, 84%, 67%)"
              className={`w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-950 border-2 rounded-2xl text-lg font-mono focus:outline-none transition-all ${
                isValid 
                  ? 'border-slate-100 dark:border-slate-800 focus:border-blue-500' 
                  : 'border-red-500/50 focus:border-red-500 bg-red-50/30 dark:bg-red-900/10'
              }`}
            />
            {!isValid && (
              <p className="absolute -bottom-6 left-0 text-[10px] font-bold text-red-500 uppercase">Invalid color format</p>
            )}
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {formats.map((f) => (
          <div 
            key={f.label}
            className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 group hover:border-blue-500/30 transition-colors"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-black text-slate-400 uppercase tracking-tighter">{f.label}</span>
              <button
                onClick={() => handleCopy(f.value)}
                className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-blue-500 transition-colors"
              >
                {copied === f.value ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-sm font-mono font-bold text-slate-700 dark:text-slate-200 break-all">
              {f.value}
            </p>
          </div>
        ))}
      </div>

      {/* Pro Tip */}
      <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-900/30 flex gap-4 items-start">
        <div className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
          <RefreshCcw className="w-5 h-5 text-blue-500" />
        </div>
        <div>
          <h4 className="font-bold text-blue-900 dark:text-blue-100 text-sm mb-1">Did you know?</h4>
          <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
            You can paste CSS variables, named colors like <code>rebeccapurple</code>, or even transparent values. 
            The converter will automatically normalize them into standardized formats for your code.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ColorConverter;