import { useState } from 'react';
import { colord } from 'colord';
import { Copy, Check } from 'lucide-react';

interface TintsAndShadesProps {
  color: string;
}

interface ColorRowProps {
  label: string;
  colors: string[];
  onCopy: (hex: string) => void;
  copiedHex: string | null;
}

const ColorRow = ({ label, colors, onCopy, copiedHex }: ColorRowProps) => (
  <div className="space-y-3">
    <div className="flex justify-between items-end">
      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">{label}</label>
      <span className="text-[10px] text-slate-400 font-medium">{Math.round(100 / (colors.length - 1))}% Steps</span>
    </div>
    <div className="flex h-12 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
      {colors.map((c, i) => (
        <button
          key={`${label}-${i}`}
          onClick={() => onCopy(c)}
          className="flex-1 transition-transform hover:scale-110 relative group"
          style={{ backgroundColor: c }}
          title={c}
        >
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/10 transition-opacity">
            {copiedHex === c ? (
              <Check className="w-4 h-4 text-white drop-shadow-md" />
            ) : (
              <Copy className="w-4 h-4 text-white drop-shadow-md" />
            )}
          </div>
        </button>
      ))}
    </div>
  </div>
);

const TintsAndShades = ({ color }: TintsAndShadesProps) => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [customTarget, setCustomTarget] = useState('#ff0000');
  const [steps, setSteps] = useState(10);

  const generateMix = (targetColor: string) => {
    return Array.from({ length: steps + 1 }, (_, i) => {
      const weight = i * (1 / steps);
      return colord(color).mix(targetColor, weight).toHex();
    });
  };

  const tints = generateMix('#ffffff').reverse(); 
  const shades = generateMix('#000000'); 
  const custom = generateMix(customTarget); 

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          Tints, Shades & Custom Mix
        </h3>
        <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 px-3 py-1 rounded-lg">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Steps</span>
          <select 
            value={steps} 
            onChange={(e) => setSteps(parseInt(e.target.value))}
            className="bg-transparent text-xs font-bold focus:outline-none"
          >
            {[5, 10, 15, 20].map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>
      
      <div className="space-y-6">
        <ColorRow label="Tints (Mix with White)" colors={tints} onCopy={handleCopy} copiedHex={copiedHex} />
        <ColorRow label="Shades (Mix with Black)" colors={shades} onCopy={handleCopy} copiedHex={copiedHex} />
        
        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Custom Mix</label>
              <input 
                type="color" 
                value={customTarget}
                onChange={(e) => setCustomTarget(e.target.value)}
                className="w-4 h-4 rounded cursor-pointer border-none p-0 bg-transparent"
              />
            </div>
            <span className="text-[10px] text-slate-400 font-medium uppercase font-mono">{customTarget}</span>
          </div>
          <div className="flex h-12 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
            {custom.map((c, i) => (
              <button
                key={`custom-${i}`}
                onClick={() => handleCopy(c)}
                className="flex-1 transition-transform hover:scale-110 relative group"
                style={{ backgroundColor: c }}
                title={c}
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/10 transition-opacity">
                  <Copy className="w-4 h-4 text-white drop-shadow-md" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed italic">
          Tip: Increasing "Steps" gives you more granular control over your color ramps.
        </p>
      </div>
    </div>
  );
};

export default TintsAndShades;