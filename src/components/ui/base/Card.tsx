import type { LucideIcon } from 'lucide-react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardProps) => (
  <div className={`bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-200 dark:border-slate-800 ${className}`}>
    {children}
  </div>
);

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
}

export const SectionHeader = ({ title, subtitle, icon: Icon }: SectionHeaderProps) => (
  <div className="space-y-1 mb-6">
    <h3 className="text-xl font-bold flex items-center gap-2 text-slate-900 dark:text-white">
      {Icon && <Icon className="w-5 h-5 text-blue-500" />}
      {title}
    </h3>
    {subtitle && <p className="text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>}
  </div>
);