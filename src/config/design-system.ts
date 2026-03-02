export const DESIGN_SYSTEM = {
  animations: {
    tabTransition: {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -10 },
      transition: { duration: 0.2, ease: "easeOut" }
    },
    hoverScale: 1.05,
    activeScale: 0.95,
  },
  borderRadius: {
    card: '2rem',
    inner: '1.5rem',
    button: '1rem',
  },
  colors: {
    primary: 'blue-600',
    primaryHover: 'blue-700',
    border: 'slate-200 dark:border-slate-800',
    bg: 'slate-50 dark:bg-slate-950',
    card: 'white dark:bg-slate-900',
  }
} as const;