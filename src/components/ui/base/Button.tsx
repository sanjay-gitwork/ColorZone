import { motion, type HTMLMotionProps } from 'framer-motion';
import { DESIGN_SYSTEM } from '../../../config/design-system';

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button = ({ variant = 'primary', size = 'md', children, className, ...props }: ButtonProps) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 font-bold transition-all disabled:opacity-50";
  
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20",
    secondary: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200",
    ghost: "bg-transparent text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800",
    icon: "p-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-100",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs rounded-lg",
    md: "px-6 py-3 text-sm rounded-2xl",
    lg: "px-10 py-5 text-lg rounded-full",
  };

  return (
    <motion.button
      whileHover={{ scale: DESIGN_SYSTEM.animations.hoverScale }}
      whileTap={{ scale: DESIGN_SYSTEM.animations.activeScale }}
      className={`${baseStyles} ${variants[variant]} ${variant !== 'icon' ? sizes[size] : 'rounded-xl'} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};