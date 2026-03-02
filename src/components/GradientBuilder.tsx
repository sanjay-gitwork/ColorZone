import { useState, useMemo } from 'react';
import { Copy, Check, Plus, Trash2, MoveHorizontal, RotateCw, Maximize, Sun } from 'lucide-react';
import { colord } from 'colord';

interface GradientStop {
  id: string;
  color: string;
  position: number;
}

interface GradientBuilderProps {
  currentColor: string;
}

type GradientType = 'linear' | 'radial' | 'conic';

const GradientBuilder = ({ currentColor }: GradientBuilderProps) => {
  const [stops, setStops] = useState<GradientStop[]>([
    { id: '1', color: currentColor, position: 0 },
    { id: '2', color: colord(currentColor).rotate(30).toHex(), position: 100 },
  ]);
  const [type, setType] = useState<GradientType>('linear');
  const [angle, setAngle] = useState(90);
  const [copied, setCopied] = useState<string | null>(null);

  const sortedStops = useMemo(() => [...stops].sort((a, b) => a.position - b.position), [stops]);

  const gradientString = useMemo(() => {
    const stopsStr = sortedStops.map(s => `${s.color} ${s.position}%`).join(', ');
    if (type === 'linear') return `linear-gradient(${angle}deg, ${stopsStr})`;
    if (type === 'radial') return `radial-gradient(circle, ${stopsStr})`;
    return `conic-gradient(from ${angle}deg, ${stopsStr})`;
  }, [sortedStops, type, angle]);

  const handleAddStop = () => {
    if (stops.length >= 5) return;
    const newStop: GradientStop = {
      id: Date.now().toString(),
      color: '#ffffff',
      position: 50,
    };
    setStops([...stops, newStop]);
  };

  const handleRemoveStop = (id: string) => {
    if (stops.length <= 2) return;
    setStops(stops.filter(s => s.id !== id));
  };

  const updateStop = (id: string, updates: Partial<GradientStop>) => {
    setStops(stops.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const handleCopy = (format: 'css' | 'tailwind' | 'react') => {
    let text = '';
    if (format === 'css') text = `background: ${gradientString};`;
    if (format === 'tailwind') text = `bg-[${gradientString}]`;
    if (format === 'react') text = `style={{ background: '${gradientString}' }}`;
    
    navigator.clipboard.writeText(text);
    setCopied(format);
    setTimeout(() => setCopied(null), 2000);
  };

  const syncFirstStop = () => {
    updateStop(stops[0].id, { color: currentColor });
  };

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Controls */}
      <div className="lg:col-span-7 space-y-6">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-8">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Gradient Designer</h3>
            <button 
              onClick={syncFirstStop}
              className="text-xs font-bold text-blue-500 hover:text-blue-600 flex items-center gap-1.5"
            >
              <RotateCw className="w-3.5 h-3.5" />
              Sync Main Color
            </button>
          </div>

          {/* Type Selector */}
          <div className="flex p-1 bg-slate-50 dark:bg-slate-950 rounded-xl gap-1">
            {(['linear', 'radial', 'conic'] as GradientType[]).map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all capitalize ${
                  type === t 
                    ? 'bg-white dark:bg-slate-800 shadow-sm text-blue-600' 
                    : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Visual Stop Editor */}
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Color Stops</label>
              <span className="text-[10px] text-slate-400 font-medium">{stops.length}/5 Max</span>
            </div>
            
            <div className="relative h-12 rounded-xl border border-slate-200 dark:border-slate-800 p-1 bg-slate-50 dark:bg-slate-950">
               <div className="absolute inset-2 rounded-lg opacity-50" style={{ background: `linear-gradient(to right, ${sortedStops.map(s => s.color).join(', ')})` }} />
               <div className="relative h-full">
                 {stops.map((stop) => (
                   <div 
                    key={stop.id}
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all group"
                    style={{ left: `${stop.position}%` }}
                   >
                     <div className="w-4 h-4 rounded-full border-2 border-white shadow-md cursor-grab active:cursor-grabbing hover:scale-125 transition-transform" style={{ backgroundColor: stop.color }} />
                     <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-bold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                       {stop.position}%
                     </div>
                   </div>
                 ))}
               </div>
            </div>

            <div className="space-y-4 pt-4">
              {stops.map((stop) => (
                <div key={stop.id} className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/30 p-3 rounded-xl border border-slate-100 dark:border-slate-800/50 animate-in fade-in slide-in-from-left-2">
                  <input 
                    type="color" 
                    value={stop.color}
                    onChange={(e) => updateStop(stop.id, { color: e.target.value })}
                    className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-none p-0 overflow-hidden"
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase">
                      <span>Position</span>
                      <span>{stop.position}%</span>
                    </div>
                    <input 
                      type="range" min="0" max="100" 
                      value={stop.position}
                      onChange={(e) => updateStop(stop.id, { position: parseInt(e.target.value) })}
                      className="w-full h-1.5 rounded-full appearance-none bg-slate-200 dark:bg-slate-700 cursor-pointer"
                    />
                  </div>
                  <button 
                    onClick={() => handleRemoveStop(stop.id)}
                    className="p-2 text-slate-400 hover:text-red-500 transition-colors disabled:opacity-30"
                    disabled={stops.length <= 2}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              
              {stops.length < 5 && (
                <button 
                  onClick={handleAddStop}
                  className="w-full py-3 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-slate-400 hover:text-blue-500 hover:border-blue-500/50 transition-all flex items-center justify-center gap-2 text-sm font-bold"
                >
                  <Plus className="w-4 h-4" /> Add Stop
                </button>
              )}
            </div>
          </div>

          {type !== 'radial' && (
            <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
               <div className="flex justify-between">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Rotation ({angle}°)</label>
                <div className="flex gap-2">
                   {[0, 90, 180, 270].map(deg => (
                     <button key={deg} onClick={() => setAngle(deg)} className="px-2 py-1 text-[10px] font-bold bg-slate-100 dark:bg-slate-800 rounded hover:bg-slate-200">{deg}°</button>
                   ))}
                </div>
               </div>
               <input 
                type="range" min="0" max="360" 
                value={angle} 
                onChange={(e) => setAngle(parseInt(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none bg-slate-200 dark:bg-slate-700 cursor-pointer"
              />
            </div>
          )}
        </div>
      </div>

      {/* Preview and Export */}
      <div className="lg:col-span-5 space-y-8">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 sticky top-24 space-y-8">
          <div 
            className="w-full aspect-square rounded-3xl shadow-2xl shadow-blue-500/10 border-8 border-white dark:border-slate-800 relative overflow-hidden group"
            style={{ background: gradientString }}
          >
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10 backdrop-blur-[2px]">
               <button className="p-4 bg-white dark:bg-slate-900 rounded-full shadow-xl">
                 <Maximize className="w-6 h-6 text-slate-600" />
               </button>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest">Exports</h4>
            
            <div className="space-y-3">
              {[
                { id: 'css', label: 'CSS background', icon: MoveHorizontal },
                { id: 'tailwind', label: 'Tailwind Class', icon: Maximize },
                { id: 'react', label: 'React Inline', icon: RotateCw },
              ].map((fmt) => (
                <div key={fmt.id} className="relative group">
                  <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-800/50">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{fmt.label}</span>
                      <button 
                        onClick={() => handleCopy(fmt.id as 'css' | 'tailwind' | 'react')}
                        className="text-[10px] font-black text-blue-500 hover:text-blue-600 transition-colors flex items-center gap-1"
                      >
                        {copied === fmt.id ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}
                      </button>
                    </div>
                    <code className="text-[10px] font-mono text-slate-600 dark:text-slate-400 break-all line-clamp-2">
                      {fmt.id === 'css' ? gradientString : fmt.id === 'tailwind' ? `bg-[${gradientString}]` : `background: '${gradientString}'`}
                    </code>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex gap-3">
            <Sun className="w-5 h-5 text-blue-500 shrink-0" />
            <p className="text-[10px] text-blue-700 dark:text-blue-300 leading-relaxed font-medium">
              Try using <strong>Conic Gradients</strong> for modern button hover effects or <strong>Radial Gradients</strong> for subtle glow spotlights behind your content.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradientBuilder;