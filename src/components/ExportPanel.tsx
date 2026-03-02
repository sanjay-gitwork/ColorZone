import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import type { ColorData } from '../utils/colors';

interface ExportPanelProps {
  colorData: ColorData;
}

const ExportPanel = ({ colorData }: ExportPanelProps) => {
  const [copied, setCopied] = useState<string | null>(null);

  const exports = [
    {
      label: 'CSS Variables',
      code: `--color-primary: ${colorData.hex};
--color-primary-rgb: ${colorData.rgb.match(/\((.*?)\)/)?.[1] || ''};`,
    },
    {
      label: 'Tailwind Config',
      code: `theme: {
  extend: {
    colors: {
      'primary': '${colorData.hex}',
    }
  }
}`,
    },
    {
      label: 'SCSS',
      code: `$color-primary: ${colorData.hex};
$color-primary-rgb: rgba(${colorData.rgb.match(/\((.*?)\)/)?.[1] || ''}, 1);`,
    },
    {
      label: 'JSON',
      code: JSON.stringify(colorData, null, 2),
    },
  ];

  const handleCopy = (label: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
      <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
        Export
      </h3>
      <div className="space-y-6">
        {exports.map((exp) => (
          <div key={exp.label} className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-slate-500 uppercase">{exp.label}</label>
              <button
                onClick={() => handleCopy(exp.label, exp.code)}
                className="text-xs text-blue-500 hover:text-blue-600 font-medium flex items-center gap-1"
              >
                {copied === exp.label ? (
                  <>
                    <Check className="w-3 h-3" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" /> Copy
                  </>
                )}
              </button>
            </div>
            <pre className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl text-[10px] font-mono text-slate-700 dark:text-slate-300 overflow-x-auto border border-slate-100 dark:border-slate-800">
              {exp.code}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExportPanel;
