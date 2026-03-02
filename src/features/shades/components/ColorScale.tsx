import { useState } from 'react';
import { colord } from 'colord';
import { Info, ClipboardCheck } from 'lucide-react';
import { type ScaleMode } from '../hooks/useShades';
import { CopyButton } from '../../../components/ui/base/CopyButton';

interface ColorScaleProps {
  scale: { label: string; hex: string }[];
  mode: ScaleMode;
  setMode: (mode: ScaleMode) => void;
}

const ColorScale = ({ scale, mode, setMode }: ColorScaleProps) => {
  const [showExport, setShowExport] = useState(false);

  const handleBulkExport = () => {
    const exportText = scale.reduce((acc, shade) => {
      return acc + `  '${shade.label}': '${shade.hex}',\n`;
    }, `// Tailwind Color Object\n'primary': {\n`) + `}`;
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
                key={m} onClick={() => setMode(m)}
                className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all capitalize ${
                  mode === m ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600' : 'text-slate-500'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
          <button
            onClick={handleBulkExport}
            className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-blue-500 transition-colors"
          >
            {showExport ? <ClipboardCheck className="w-4 h-4 text-green-500" /> : <Info className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto pr-1">
        {scale.map((shade) => {
          const c = colord(shade.hex);
          const textColor = c.isLight() ? 'text-slate-900' : 'text-white';
          return (
            <div key={shade.label} className="group flex items-center justify-between p-3 rounded-xl transition-transform hover:scale-[1.01]" style={{ backgroundColor: shade.hex }}>
              <div className="flex items-center gap-4">
                <span className={`font-bold text-xs w-8 ${textColor}`}>{shade.label}</span>
                <div className="flex gap-1 text-[8px] font-bold">
                   <span className="px-1 rounded bg-black/10 dark:bg-white/10">W: {c.contrast('#ffffff').toFixed(1)}</span>
                   <span className="px-1 rounded bg-black/10 dark:bg-white/10">B: {c.contrast('#000000').toFixed(1)}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-[10px] font-mono opacity-80 uppercase ${textColor}`}>{shade.hex}</span>
                <CopyButton text={shade.hex} size="sm" className="bg-transparent opacity-0 group-hover:opacity-100" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ColorScale;