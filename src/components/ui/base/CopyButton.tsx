import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface CopyButtonProps {
  text: string;
  size?: 'sm' | 'md';
  className?: string;
}

export const CopyButton = ({ text, size = 'md', className }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const iconSize = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4';

  return (
    <button
      onClick={handleCopy}
      className={`p-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-blue-500 transition-colors ${className}`}
      title="Copy to clipboard"
    >
      {copied ? <Check className={`${iconSize} text-green-500`} /> : <Copy className={iconSize} />}
    </button>
  );
};