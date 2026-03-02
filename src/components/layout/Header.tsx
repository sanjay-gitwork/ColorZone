import { Pipette } from 'lucide-react';
import ThemeToggle from '../ThemeToggle';

interface HeaderProps {
  onEyedropper: () => void;
}

const Header = ({ onEyedropper }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-10 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xl">C</div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">
            ColorZone
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onEyedropper}
            className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-slate-600 dark:text-slate-400"
            title="EyeDropper Tool"
          >
            <Pipette className="w-5 h-5" />
          </button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;