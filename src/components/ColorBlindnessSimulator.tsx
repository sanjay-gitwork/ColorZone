import { Eye } from 'lucide-react';

interface ColorBlindnessSimulatorProps {
  color: string;
}

const ColorBlindnessSimulator = ({ color }: ColorBlindnessSimulatorProps) => {
  const types = [
    { id: 'protanopia', label: 'Protanopia', desc: 'No Red', matrix: '0.567, 0.433, 0, 0, 0  0.558, 0.442, 0, 0, 0  0, 0.242, 0.758, 0, 0  0, 0, 0, 1, 0' },
    { id: 'deuteranopia', label: 'Deuteranopia', desc: 'No Green', matrix: '0.625, 0.375, 0, 0, 0  0.7, 0.3, 0, 0, 0  0, 0.3, 0.7, 0, 0  0, 0, 0, 1, 0' },
    { id: 'tritanopia', label: 'Tritanopia', desc: 'No Blue', matrix: '0.95, 0.05, 0, 0, 0  0, 0.433, 0.567, 0, 0  0, 0.475, 0.525, 0, 0  0, 0, 0, 1, 0' },
    { id: 'achromatopsia', label: 'Achromatopsia', desc: 'No Color', matrix: '0.299, 0.587, 0.114, 0, 0  0.299, 0.587, 0.114, 0, 0  0.299, 0.587, 0.114, 0, 0  0, 0, 0, 1, 0' },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-6">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Eye className="w-5 h-5 text-blue-500" />
        Color Blindness Simulator
      </h3>

      <div className="grid grid-cols-2 gap-4">
        {types.map((type) => (
          <div key={type.id} className="space-y-2">
            <div className="flex justify-between items-end">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{type.label}</span>
              <span className="text-[10px] text-slate-400">{type.desc}</span>
            </div>
            <div 
              className="h-16 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800"
              style={{ backgroundColor: color, filter: `url(#${type.id})` }}
            />
          </div>
        ))}
      </div>

      <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed italic">
          Simulates how this specific color appears to users with different types of color vision deficiencies.
        </p>
      </div>

      {/* SVG Filters for Color Blindness */}
      <svg className="hidden">
        <defs>
          {types.map(t => (
            <filter key={t.id} id={t.id}>
              <feColorMatrix type="matrix" values={t.matrix} />
            </filter>
          ))}
        </defs>
      </svg>
    </div>
  );
};

export default ColorBlindnessSimulator;