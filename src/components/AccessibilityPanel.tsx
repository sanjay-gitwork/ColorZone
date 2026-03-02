import { getContrastRatio, isReadable, fixContrast } from '../utils/colors';
import { CheckCircle2, XCircle, Info, Wand2 } from 'lucide-react';

interface AccessibilityPanelProps {
  color: string;
  onColorChange: (color: string) => void;
}

interface TestRowProps {
  label: string;
  ratio: number;
  aa: boolean;
  aaa: boolean;
  color: string;
  bgColor: string;
  onFix: (newColor: string) => void;
}

const TestRow = ({ label, ratio, aa, aaa, color, bgColor, onFix }: TestRowProps) => (
  <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 space-y-3">
    <div className="flex justify-between items-center">
      <span className="font-medium text-sm">{label}</span>
      <div className="flex items-center gap-3">
        <span className="text-xl font-bold">{ratio.toFixed(2)}:1</span>
        {(!aa || !aaa) && (
          <button
            onClick={() => onFix(fixContrast(color, bgColor, !aa ? 'AA' : 'AAA'))}
            className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
            title="Auto-fix contrast"
          >
            <Wand2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
    <div className="flex gap-4">
      <div className="flex items-center gap-1.5">
        {aa ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <XCircle className="w-4 h-4 text-red-500" />}
        <span className="text-xs font-semibold">WCAG AA</span>
      </div>
      <div className="flex items-center gap-1.5">
        {aaa ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <XCircle className="w-4 h-4 text-red-500" />}
        <span className="text-xs font-semibold">WCAG AAA</span>
      </div>
    </div>
  </div>
);

const AccessibilityPanel = ({ color, onColorChange }: AccessibilityPanelProps) => {
  const contrastOnWhite = getContrastRatio(color, '#ffffff');
  const contrastOnBlack = getContrastRatio(color, '#000000');

  const aaWhite = isReadable(color, '#ffffff', 'AA');
  const aaaWhite = isReadable(color, '#ffffff', 'AAA');
  const aaBlack = isReadable(color, '#000000', 'AA');
  const aaaBlack = isReadable(color, '#000000', 'AAA');

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
      <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
        Accessibility Check
      </h3>
      <div className="space-y-4">
        <TestRow 
          label="On White Background" 
          ratio={contrastOnWhite} 
          aa={aaWhite} 
          aaa={aaaWhite} 
          color={color}
          bgColor="#ffffff"
          onFix={onColorChange}
        />
        <TestRow 
          label="On Black Background" 
          ratio={contrastOnBlack} 
          aa={aaBlack} 
          aaa={aaaBlack} 
          color={color}
          bgColor="#000000"
          onFix={onColorChange}
        />
        
        <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl flex gap-3">
          <Info className="w-5 h-5 text-blue-500 shrink-0" />
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            WCAG AA requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text. 
            WCAG AAA requires 7:1 for normal text and 4.5:1 for large text.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityPanel;
