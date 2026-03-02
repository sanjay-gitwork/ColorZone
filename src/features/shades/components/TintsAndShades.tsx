import { CopyButton } from '../../../components/ui/base/CopyButton';

interface ColorRowProps {
  label: string;
  colors: string[];
}

const ColorRow = ({ label, colors }: ColorRowProps) => (
  <div className="space-y-3">
    <div className="flex justify-between items-end">
      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">{label}</label>
      <span className="text-[10px] text-slate-400 font-medium">{Math.round(100 / (colors.length - 1))}% Steps</span>
    </div>
    <div className="flex h-12 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
      {colors.map((c, i) => (
        <div 
          key={`${label}-${i}`}
          className="flex-1 relative group cursor-pointer"
          style={{ backgroundColor: c }}
        >
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/10 transition-opacity">
            <CopyButton text={c} size="sm" className="bg-white/20 text-white" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

interface TintsAndShadesProps {
  color: string;
  steps: number;
  setSteps: (s: number) => void;
  generateMix: (c: string, target: string, s: number) => string[];
}

const TintsAndShades = ({ color, steps, setSteps, generateMix }: TintsAndShadesProps) => {
  const [customTarget, setCustomTarget] = useState('#ff0000');

  const tints = generateMix(color, '#ffffff', steps).reverse(); 
  const shades = generateMix(color, '#000000', steps); 
  const custom = generateMix(color, customTarget, steps); 

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Tints & Shades</h3>
        <select 
          value={steps} 
          onChange={(e) => setSteps(parseInt(e.target.value))}
          className="bg-slate-50 dark:bg-slate-800 text-xs font-bold px-3 py-1 rounded-lg focus:outline-none border-none text-slate-700 dark:text-slate-200"
        >
          {[5, 10, 15, 20].map(s => <option key={s} value={s}>{s} Steps</option>)}
        </select>
      </div>
      
      <div className="space-y-6">
        <ColorRow label="Tints (White)" colors={tints} />
        <ColorRow label="Shades (Black)" colors={shades} />
        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Custom Mix</label>
              <input 
                type="color" value={customTarget}
                onChange={(e) => setCustomTarget(e.target.value)}
                className="w-4 h-4 rounded cursor-pointer border-none p-0 bg-transparent"
              />
            </div>
            <span className="text-[10px] text-slate-400 font-medium uppercase font-mono">{customTarget}</span>
          </div>
          <ColorRow label="" colors={custom} />
        </div>
      </div>
    </div>
  );
};

import { useState } from 'react';
export default TintsAndShades;