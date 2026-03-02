import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import type { ColorData } from '../utils/colors';

interface FormatPanelProps {
  colorData: ColorData;
  onColorChange: (color: string) => void;
}

const FormatPanel = ({ colorData, onColorChange }: FormatPanelProps) => {
  const [copied, setCopied] = useState<string | null>(null);

  const formats = [
    { label: 'HEX', value: colorData.hex },
    { label: 'RGB', value: colorData.rgb },
    { label: 'HSL', value: colorData.hsl },
    { label: 'CMYK', value: colorData.cmyk },
  ];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          Color Formats
        </h3>
        <span className="text-sm px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full font-medium">
          {colorData.name}
        </span>
      </div>
      <div className="space-y-4">
        {formats.map((format) => (
          <div key={format.label} className="relative">
            <label className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1 block">
              {format.label}
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={format.value}
                onChange={(e) => onColorChange(e.target.value)}
                className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <button
                onClick={() => handleCopy(format.value)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-600 dark:text-slate-400"
                title="Copy to clipboard"
              >
                {copied === format.value ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormatPanel;
