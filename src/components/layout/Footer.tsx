import type { TabType } from '../../types';

interface FooterProps {
  setActiveTab: (tab: TabType) => void;
}

const Footer = ({ setActiveTab }: FooterProps) => {
  return (
    <footer className="mt-12 border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xl">C</div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">
                ColorZone
              </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
              The ultimate companion for modern web designers and developers. Build accessible, harmonious, and professional color systems in seconds.
            </p>
            <div className="flex gap-4">
              {['Github', 'Twitter', 'Dribbble'].map((social) => (
                <button key={social} className="text-xs font-bold text-slate-400 hover:text-blue-500 transition-colors uppercase tracking-widest">
                  {social}
                </button>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Quick Links</h4>
            <ul className="space-y-2">
              {['Picker', 'Shades', 'Palettes', 'Gradients'].map((link) => (
                <li key={link}>
                  <button 
                    onClick={() => setActiveTab(link.toLowerCase() as TabType)}
                    className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-500 transition-colors"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-[0.2em]">Technology</h4>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li>React 19 & TypeScript</li>
              <li>Tailwind CSS 3.4</li>
              <li>Colord & Lucide Icons</li>
              <li>Vite 7.3</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            © 2026 ColorZone Studio. Built with passion for the design community.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">System Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;