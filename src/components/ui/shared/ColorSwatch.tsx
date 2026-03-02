import { CopyButton } from '../base/CopyButton';

interface ColorSwatchProps {
  color: string;
  label?: string;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export const ColorSwatch = ({ color, label, onClick, size = 'md', showLabel = false, className }: ColorSwatchProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8 rounded-lg',
    md: 'w-full aspect-square rounded-xl',
    lg: 'w-24 h-24 rounded-2xl',
  };

  return (
    <div className={`group space-y-2 ${className}`}>
      <div 
        onClick={onClick}
        className={`${sizeClasses[size]} shadow-sm border border-black/5 dark:border-white/5 transition-all hover:scale-110 active:scale-95 cursor-pointer relative overflow-hidden`}
        style={{ backgroundColor: color }}
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/10 transition-opacity">
          <CopyButton text={color} size="sm" className="bg-white/20 hover:bg-white/40 text-white" />
        </div>
      </div>
      {showLabel && (
        <div className="flex items-center justify-between px-1">
          <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">{label || color}</span>
        </div>
      )}
    </div>
  );
};