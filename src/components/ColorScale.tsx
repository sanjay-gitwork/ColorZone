import { Copy, Check, Info, ClipboardCheck } from 'lucide-react';
import { useState } from 'react';
import { colord } from 'colord';

interface ColorScaleProps {
  color: string;
}

type ScaleMode = 'natural' | 'perceptual' | 'linear';

const ColorScale = ({ color }: ColorScaleProps) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [mode, setMode] = useState<ScaleMode>('natural');
  const [showExport, setShowExport] = useState(false);

  const generateScale = (baseColor: string, scaleMode: ScaleMode) => {
    const base = colord(baseColor);
    const hsv = base.toHsv();
    const lch = base.toLch();
    
    return [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((step) => {
      const lightness = 1 - (step / 1000);
      let hex: string;

      if (scaleMode === 'natural') {
        const hueShift = (500 - step) / 50; 
        const satShift = (step - 500) / 20; 
        hex = colord({
          h: (hsv.h + hueShift + 360) % 360,
          s: Math.max(0, Math.min(100, hsv.s + satShift)),
          v: lightness * 100,
          a: hsv.a
        }).toHex();
      } else if (scaleMode === 'perceptual') {
        // LCH Perceptual: Uniform brightness steps
        hex = colord({
          l: lightness * 100,
          c: lch.c,
          h: lch.h,
          a: lch.a
        }).toHex();
      } else {
        hex = base.mix(step < 500 ? '#ffffff' : '#000000', Math.abs(500 - step) / 500).toHex();
      }

      return { label: step.toString(), hex };
    });
  };

  const scale = generateScale(color, mode);

  const handleCopy = (hex: string, index: number) => {
    navigator.clipboard.writeText(hex);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleBulkExport = () => {
    const exportText = scale.reduce((acc, shade) => {
      return acc + `  '${shade.label}': '${shade.hex}',\n`;
    }, `// Tailwind CSS Color Object\n'primary': {\n`) + `}`;
    navigator.clipboard.writeText(exportText);
    setShowExport(true);
    setTimeout(() => setShowExport(false), 3000);
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Tailwind-Style Scale</h3>
        <div className="flex gap-2">
          <div className="flex p-1 bg-slate-50 dark:bg-slate-800 rounded-xl gap-1">
            {(['natural', 'perceptual', 'linear'] as ScaleMode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all capitalize ${
                  mode === m 
                    ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600 shadow-blue-500/10' 
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
          <button
            onClick={handleBulkExport}
            className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all text-slate-600 dark:text-slate-400"
            title="Bulk Export to Clipboard"
          >
            {showExport ? <ClipboardCheck className="w-4 h-4 text-green-500" /> : <Info className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto pr-1 custom-scrollbar">
        {scale.map((shade, index) => {
          const c = colord(shade.hex);
          const isLight = c.isLight();
          const textColor = isLight ? 'text-slate-900' : 'text-white';
          const contrastOnWhite = c.contrast('#ffffff');
          const contrastOnBlack = c.contrast('#000000');
          
          return (
            <div 
              key={shade.label} 
              className={`group flex items-center justify-between p-3 rounded-xl transition-transform hover:scale-[1.01] cursor-pointer`}
              style={{ backgroundColor: shade.hex }}
              onClick={() => handleCopy(shade.hex, index)}
            >
              <div className="flex items-center gap-4">
                <span className={`font-bold text-xs w-8 ${textColor}`}>{shade.label}</span>
                <div className="flex gap-1">
                   <span className={`text-[8px] font-bold px-1 rounded bg-black/10 dark:bg-white/10 ${textColor}`}>
                     W: {contrastOnWhite.toFixed(1)}
                   </span>
                   <span className={`text-[8px] font-bold px-1 rounded bg-black/10 dark:bg-white/10 ${textColor}`}>
                     B: {contrastOnBlack.toFixed(1)}
                   </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-[10px] font-mono opacity-80 uppercase ${textColor}`}>{shade.hex}</span>
                <div className={`p-1 rounded-lg ${textColor}`}>
                  {copiedIndex === index ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {showExport && (
        <div className="mt-4 p-2 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-lg text-center animate-in fade-in slide-in-from-top-2">
           <p className="text-[10px] text-green-700 dark:text-green-400 font-bold">Full palette copied to clipboard!</p>
        </div>
      )}
    </div>
  );
};

export default ColorScale;