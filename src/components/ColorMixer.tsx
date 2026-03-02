import { useState } from 'react';
import { Blend, Copy, Check, ArrowRightLeft, Sparkles } from 'lucide-react';
import { colord } from 'colord';

interface ColorMixerProps {
  currentColor: string;
  onColorChange: (color: string) => void;
}

const ColorMixer = ({ currentColor, onColorChange }: ColorMixerProps) => {
  const [mixColor, setMixColor] = useState('#ffffff');
  const [weight, setWeight] = useState(50);
  const [copied, setCopied] = useState<string | null>(null);

  const mixedHex = colord(currentColor).mix(mixColor, weight / 100).toHex();

  // Generate 5 steps of the mix
  const mixSteps = [0, 0.25, 0.5, 0.75, 1].map(w => 
    colord(currentColor).mix(mixColor, w).toHex()
  );

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopied(hex);
    setTimeout(() => setCopied(null), 2000);
  };

  const presets = [
    { label: 'White', color: '#ffffff' },
    { label: 'Black', color: '#000000' },
    { label: 'Gray', color: '#808080' },
    { label: 'Complement', color: colord(currentColor).rotate(180).toHex() },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-8">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Blend className="w-6 h-6 text-blue-500" />
            Advanced Color Mixer
          </h3>
          <button
            onClick={() => onColorChange(mixedHex)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 text-xs font-bold"
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            Use Result as Main
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Controls Side */}
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Base Color</label>
                <div className="h-20 rounded-2xl border-4 border-white dark:border-slate-800 shadow-md transition-colors" style={{ backgroundColor: currentColor }} />
                <p className="text-[10px] font-mono font-bold text-center uppercase text-slate-400">{currentColor}</p>
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Mix Target</label>
                <div className="relative h-20 rounded-2xl border-4 border-white dark:border-slate-800 shadow-md overflow-hidden group">
                  <input 
                    type="color" 
                    value={mixColor}
                    onChange={(e) => setMixColor(e.target.value)}
                    className="absolute -inset-4 w-[150%] h-[150%] cursor-pointer border-none p-0 bg-transparent"
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 bg-black/10 transition-opacity">
                    <Sparkles className="w-6 h-6 text-white drop-shadow-md" />
                  </div>
                </div>
                <p className="text-[10px] font-mono font-bold text-center uppercase text-slate-400">{mixColor}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Mix Ratio</label>
                <div className="flex gap-4 text-[10px] font-bold">
                  <span className="text-blue-500">BASE: {100 - weight}%</span>
                  <span className="text-indigo-500">MIX: {weight}%</span>
                </div>
              </div>
              <input 
                type="range" min="0" max="100" 
                value={weight}
                onChange={(e) => setWeight(parseInt(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none bg-slate-100 dark:bg-slate-800 cursor-pointer accent-blue-500"
              />
            </div>

            <div className="space-y-3">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Quick Presets</label>
              <div className="flex flex-wrap gap-2">
                {presets.map((p) => (
                  <button
                    key={p.label}
                    onClick={() => setMixColor(p.color)}
                    className="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-[10px] font-bold hover:border-blue-500/50 transition-all flex items-center gap-2"
                  >
                    <div className="w-2.5 h-2.5 rounded-full border border-black/5" style={{ backgroundColor: p.color }} />
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Side */}
          <div className="space-y-8">
            <div className="space-y-4">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Blending Steps</label>
              <div className="flex h-24 rounded-2xl overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl">
                {mixSteps.map((step, i) => (
                  <button
                    key={i}
                    onClick={() => handleCopy(step)}
                    className="flex-1 transition-all hover:flex-[1.5] relative group"
                    style={{ backgroundColor: step }}
                    title={`Copy ${step}`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/10 transition-opacity">
                      {copied === step ? <Check className="w-5 h-5 text-white" /> : <Copy className="w-5 h-5 text-white" />}
                    </div>
                    {i === 2 && (
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-2 bg-white rounded-full" />
                    )}
                  </button>
                ))}
              </div>
              <div className="flex justify-between px-1">
                <span className="text-[8px] font-black text-slate-400 uppercase">Pure Base</span>
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Balanced (50/50)</span>
                <span className="text-[8px] font-black text-slate-400 uppercase">Pure Mix</span>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Final Result</label>
              <div 
                className="p-6 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-between group cursor-pointer"
                onClick={() => handleCopy(mixedHex)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl shadow-lg ring-4 ring-white dark:ring-slate-800" style={{ backgroundColor: mixedHex }} />
                  <div>
                    <p className="text-2xl font-mono font-black uppercase text-slate-800 dark:text-white">{mixedHex}</p>
                    <p className="text-[10px] font-bold text-slate-400">Click to copy result</p>
                  </div>
                </div>
                <div className={`p-3 rounded-xl transition-all ${copied === mixedHex ? 'bg-green-50 text-green-500' : 'bg-slate-50 dark:bg-slate-800 text-slate-400 group-hover:text-blue-500'}`}>
                  {copied === mixedHex ? <Check className="w-6 h-6" /> : <Copy className="w-6 h-6" />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-900/30">
        <p className="text-xs text-indigo-700 dark:text-indigo-300 leading-relaxed font-medium">
          <strong>Pro Tip:</strong> Mixing with the <strong>Complement</strong> preset is a great way to find muted, neutral "shadow" colors that feel more organic than just mixing with gray or black.
        </p>
      </div>
    </div>
  );
};

export default ColorMixer;