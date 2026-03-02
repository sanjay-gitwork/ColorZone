import { useState } from 'react';
import { generatePalette } from '../utils/colors';
import ColorWheel from './ColorWheel';
import PalettePreview from './PalettePreview';
import { Copy, Check } from 'lucide-react';

interface PaletteGeneratorProps {
  color: string;
  onColorChange: (color: string) => void;
}

const PaletteGenerator = ({ color, onColorChange }: PaletteGeneratorProps) => {
  const [activePaletteIndex, setActivePaletteIndex] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  
  const palettes = generatePalette(color);

  const paletteGroups = [
    { label: 'Complementary', colors: palettes.complementary, description: 'Opposite on wheel. High contrast.' },
    { label: 'Analogous', colors: palettes.analogous, description: 'Adjacent on wheel. Smooth & harmonious.' },
    { label: 'Triadic', colors: palettes.triadic, description: 'Evenly spaced. Balanced & vibrant.' },
    { label: 'Split Complementary', colors: palettes.splitComplementary, description: 'Base plus two adjacent to complement.' },
    { label: 'Square', colors: palettes.square, description: 'Four colors evenly spaced.' },
    { label: 'Tetradic', colors: palettes.tetradic, description: 'Two pairs of complements.' },
    { label: 'Accented Analogous', colors: palettes.accentedAnalogous, description: 'Analogous plus a complementary accent.' },
    { label: 'Monochromatic', colors: palettes.monochromatic, description: 'Shades, tints, and tones of one hue.' },
  ];

  const handleCopyPalette = (colors: string[], index: number) => {
    const text = colors.join(', ');
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
      {/* List of Harmonies */}
      <div className="xl:col-span-8 space-y-6">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
          <h3 className="text-xl font-bold mb-8 flex items-center justify-between">
            Color Harmonies
            <span className="text-xs font-medium text-slate-400">Click a color to select or use preview</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {paletteGroups.map((group, index) => (
              <div 
                key={group.label}
                className={`group relative space-y-4 p-4 rounded-2xl transition-all cursor-pointer border ${
                  activePaletteIndex === index 
                    ? 'border-blue-500/50 bg-blue-50/30 dark:bg-blue-900/10' 
                    : 'border-transparent hover:border-slate-100 dark:hover:border-slate-800'
                }`}
                onMouseEnter={() => setActivePaletteIndex(index)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest block mb-1">
                      {group.label}
                    </label>
                    <p className="text-[10px] text-slate-400 font-medium leading-relaxed max-w-[180px]">
                      {group.description}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopyPalette(group.colors, index);
                    }}
                    className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-blue-500 transition-colors"
                    title="Copy all colors"
                  >
                    {copiedIndex === index ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                
                <div className="flex gap-1.5">
                  {group.colors.map((c, i) => (
                    <button
                      key={`${group.label}-${i}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onColorChange(c);
                      }}
                      className="flex-1 h-12 rounded-lg shadow-sm border border-black/5 dark:border-white/5 transition-transform hover:scale-110 active:scale-95"
                      style={{ backgroundColor: c }}
                      title={c}
                    />
                  ))}
                </div>
                
                {activePaletteIndex === index && (
                  <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-full animate-in fade-in" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Visualization and Preview */}
      <div className="xl:col-span-4 space-y-8">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 sticky top-24">
          <h3 className="text-lg font-bold mb-8 text-center">Harmony Visualization</h3>
          <ColorWheel 
            harmonies={paletteGroups[activePaletteIndex].colors} 
          />
          <div className="mt-8 text-center">
            <span className="text-xs font-black text-slate-500 uppercase tracking-[0.2em]">
              {paletteGroups[activePaletteIndex].label}
            </span>
          </div>
          
          <PalettePreview colors={paletteGroups[activePaletteIndex].colors} />
        </div>
      </div>
    </div>
  );
};

export default PaletteGenerator;
