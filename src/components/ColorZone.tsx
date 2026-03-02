import { useCallback, useState, type ChangeEvent } from 'react';
import { colord } from 'colord';

interface ColorZoneProps {
  color: string;
  onChange: (color: string) => void;
}

const ColorZone = ({ color, onChange }: ColorZoneProps) => {
  const hsv = colord(color).toHsv();
  const [hue, setHue] = useState(hsv.h);
  const [saturation, setSaturation] = useState(hsv.s);
  const [value, setValue] = useState(hsv.v);
  const [alpha, setAlpha] = useState(hsv.a || 1);
  const [prevColor, setPrevColor] = useState(color);

  if (color !== prevColor) {
    const currentHsv = colord(color).toHsv();
    setPrevColor(color);
    setHue(currentHsv.h);
    setSaturation(currentHsv.s);
    setValue(currentHsv.v);
    setAlpha(currentHsv.a || 1);
  }

  const updateColor = useCallback((h: number, s: number, v: number, a: number) => {
    const newColor = colord({ h, s, v, a }).toHex();
    onChange(newColor);
  }, [onChange]);

  const handleHueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const h = parseInt(e.target.value);
    setHue(h);
    updateColor(h, saturation, value, alpha);
  };

  const handleSaturationChange = (e: ChangeEvent<HTMLInputElement>) => {
    const s = parseInt(e.target.value);
    setSaturation(s);
    updateColor(hue, s, value, alpha);
  };

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const v = parseInt(e.target.value);
    setValue(v);
    updateColor(hue, saturation, v, alpha);
  };

  const handleAlphaChange = (e: ChangeEvent<HTMLInputElement>) => {
    const a = parseFloat(e.target.value);
    setAlpha(a);
    updateColor(hue, saturation, value, a);
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
      <div className="space-y-6">
        {/* Preview and basic sliders */}
        <div className="flex gap-6 items-start">
          <div className="relative w-24 h-24 rounded-2xl border-4 border-white dark:border-slate-800 shadow-lg alpha-slider overflow-hidden">
            <div 
              className="absolute inset-0"
              style={{ backgroundColor: color }}
            />
          </div>
          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Hue ({hue}°)</label>
              <input 
                type="range" 
                min="0" max="360" 
                value={hue} 
                onChange={handleHueChange}
                className="w-full h-3 rounded-lg appearance-none cursor-pointer hue-slider"
                style={{ background: 'linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)' }}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Saturation ({saturation}%)</label>
              <input 
                type="range" 
                min="0" max="100" 
                value={saturation} 
                onChange={handleSaturationChange}
                className="w-full h-3 rounded-lg appearance-none cursor-pointer"
                style={{ background: `linear-gradient(to right, #ccc, ${colord({ h: hue, s: 100, v: 100 }).toHex()})` }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Brightness ({value}%)</label>
            <input 
              type="range" 
              min="0" max="100" 
              value={value} 
              onChange={handleValueChange}
              className="w-full h-3 rounded-lg appearance-none cursor-pointer"
              style={{ background: `linear-gradient(to right, #000, ${colord({ h: hue, s: saturation, v: 100 }).toHex()})` }}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Opacity ({Math.round(alpha * 100)}%)</label>
            <div className="relative h-2 rounded-lg alpha-slider overflow-hidden">
              <input 
                type="range" 
                min="0" max="1" step="0.01"
                value={alpha} 
                onChange={handleAlphaChange}
                className="absolute inset-0 w-full h-full appearance-none cursor-pointer bg-transparent z-10"
                style={{ 
                  background: `linear-gradient(to right, transparent, ${colord({ h: hue, s: saturation, v: value }).toHex()})` 
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorZone;
