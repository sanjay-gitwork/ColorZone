import { useState } from 'react';
import { colord } from 'colord';
import { RefreshCcw, ArrowRightLeft, Zap, Info } from 'lucide-react';
import ColorScale from './ColorScale';
import TintsAndShades from './TintsAndShades';

interface ShadesGeneratorProps {
  globalColor: string;
  onColorChange: (color: string) => void;
}

const ShadesGenerator = ({ globalColor, onColorChange }: ShadesGeneratorProps) => {
  const [localColor, setLocalColor] = useState(globalColor);

  const handleSyncFromGlobal = () => {
    setLocalColor(globalColor);
  };

  const handleSyncToGlobal = () => {
    onColorChange(localColor);
  };

  const handleLocalColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalColor(value);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4">
      {/* Local Controls */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold">Shade Workspace</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Generate scales independently or sync with your main color.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative flex items-center">
              <input 
                type="color" 
                value={colord(localColor).toHex()}
                onChange={handleLocalColorChange}
                className="w-12 h-12 rounded-xl cursor-pointer bg-transparent border-none p-0 overflow-hidden"
              />
              <input 
                type="text"
                value={localColor}
                onChange={handleLocalColorChange}
                className="ml-3 w-28 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm font-mono uppercase focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={handleSyncFromGlobal}
                className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all text-slate-600 dark:text-slate-400"
                title="Sync from Main Color"
              >
                <RefreshCcw className="w-5 h-5" />
              </button>
              <button
                onClick={handleSyncToGlobal}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 text-sm font-semibold"
                title="Set as Main Color"
              >
                <ArrowRightLeft className="w-4 h-4" />
                Set as Main
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ColorScale color={localColor} />
        <TintsAndShades color={localColor} />
      </div>

      {/* UI Sandbox */}
      <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-6">
        <h3 className="text-lg font-semibold mb-4">UI Sandbox Preview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card Preview */}
          <div className="space-y-4">
            <div 
              className="p-6 rounded-2xl border transition-colors"
              style={{ 
                backgroundColor: colord(localColor).mix('#ffffff', 0.95).toHex(),
                borderColor: colord(localColor).mix('#ffffff', 0.8).toHex()
              }}
            >
              <div 
                className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center text-white shadow-lg"
                style={{ backgroundColor: localColor }}
              >
                <Zap className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">Feature Card</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                This is how your color scale looks when applied to a modern UI card component.
              </p>
              <button 
                className="w-full py-2.5 rounded-xl font-bold text-sm transition-all shadow-md"
                style={{ 
                  backgroundColor: localColor,
                  color: colord(localColor).isLight() ? '#000' : '#fff'
                }}
              >
                Primary Action
              </button>
            </div>
          </div>

          {/* Alert/Info Preview */}
          <div className="space-y-4">
            <div 
              className="p-4 rounded-xl border flex gap-3"
              style={{ 
                backgroundColor: colord(localColor).mix('#ffffff', 0.9).toHex(),
                borderColor: colord(localColor).mix('#ffffff', 0.7).toHex(),
                color: colord(localColor).darken(0.3).toHex()
              }}
            >
              <Info className="w-5 h-5 shrink-0" />
              <div className="text-sm">
                <p className="font-bold mb-1">Status Notification</p>
                <p className="opacity-80">This alert uses a tinted background from your primary color.</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <div className="flex-1 h-2 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                <div className="h-full" style={{ width: '70%', backgroundColor: localColor }} />
              </div>
            </div>

            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div 
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ backgroundColor: colord(localColor).darken(i * 0.1).toHex() }}
                >
                  {i}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShadesGenerator;