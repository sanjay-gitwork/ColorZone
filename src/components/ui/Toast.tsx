import { CheckCircle } from 'lucide-react';

interface ToastProps {
  message: string | null;
}

const Toast = ({ message }: ToastProps) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-5">
      <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-full shadow-lg flex items-center gap-3 font-medium text-sm">
        <CheckCircle className="w-5 h-5 text-green-400 dark:text-green-500" />
        {message}
      </div>
    </div>
  );
};

export default Toast;