import { useState, useCallback, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ColorZone from './components/ColorZone';
import FormatPanel from './components/FormatPanel';
import PaletteGenerator from './components/PaletteGenerator';
import AccessibilityPanel from './components/AccessibilityPanel';
import ColorMixer from './components/ColorMixer';
import ColorBlindnessSimulator from './components/ColorBlindnessSimulator';
import SavedColors from './components/SavedColors';
import GradientBuilder from './components/GradientBuilder';
import ExportPanel from './components/ExportPanel';
import ThemeToggle from './components/ThemeToggle';
import ShadesGenerator from './components/ShadesGenerator';
import ImageExtractor from './components/ImageExtractor';
import ColorConverter from './components/ColorConverter';
import RandomGenerator from './components/RandomGenerator';
import ColorHistory from './components/ColorHistory';
import { getColorData } from './utils/colors';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Pipette, CheckCircle, Palette, Zap, Layout, Save, Share2, Layers, MoveRight, Image as ImageIcon, ArrowLeftRight, Blend, Shuffle } from 'lucide-react';

interface SavedColor {
  id: string;
  name: string;
  hex: string;
}

type TabType = 'picker' | 'shades' | 'palettes' | 'gradients' | 'extractor' | 'mixer' | 'converter' | 'random' | 'tools' | 'export' | 'saved';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('picker');
  const [color, setColor] = useState(() => {
    const hash = window.location.hash;
    return hash && hash.length === 7 ? hash : '#6366f1';
  });
  const [savedColors, setSavedColors] = useLocalStorage<SavedColor[]>('saved-colors', []);
  const [history, setHistory] = useLocalStorage<string[]>('color-history', []);
  const [toast, setToast] = useState<string | null>(null);

  const colorData = useMemo(() => getColorData(color), [color]);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }, []);

  const handleColorChange = useCallback((newColor: string) => {
    setColor(newColor);
    window.history.replaceState(null, '', newColor);
    
    // Update history
    setHistory(prev => {
      const filtered = prev.filter(c => c !== newColor);
      return [newColor, ...filtered].slice(0, 14);
    });
  }, [setHistory]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash && hash.length === 7) {
        setColor(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSaveColor = (hex: string) => {
    const newSavedColor: SavedColor = {
      id: Date.now().toString(),
      name: `Color ${savedColors.length + 1}`,
      hex: hex,
    };
    setSavedColors([...savedColors, newSavedColor]);
    showToast(`Saved ${hex} to your colors!`);
  };

  const handleDeleteColor = (id: string) => {
    setSavedColors(savedColors.filter((c) => c.id !== id));
  };

  const handleEyedropper = async () => {
    if (!('EyeDropper' in window)) {
      alert('Your browser does not support the EyeDropper API');
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const EyeDropperConstructor = (window as any).EyeDropper;
    const eyeDropper = new EyeDropperConstructor();
    try {
      const result = await eyeDropper.open();
      handleColorChange(result.sRGBHex);
    } catch {
      console.log('EyeDropper cancelled');
    }
  };

  const tabs = [
    { id: 'picker', label: 'Picker', icon: Palette },
    { id: 'shades', label: 'Shades', icon: Layers },
    { id: 'palettes', label: 'Palettes', icon: Layout },
    { id: 'gradients', label: 'Gradients', icon: MoveRight },
    { id: 'extractor', label: 'Extractor', icon: ImageIcon },
    { id: 'mixer', label: 'Mixer', icon: Blend },
    { id: 'converter', label: 'Converter', icon: ArrowLeftRight },
    { id: 'random', label: 'Random', icon: Shuffle },
    { id: 'tools', label: 'Tools', icon: Zap },
    { id: 'saved', label: 'Saved', icon: Save },
    { id: 'export', label: 'Export', icon: Share2 },
  ];

  return (
    <div className="min-h-screen transition-colors pb-0 bg-slate-50 dark:bg-slate-950">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-5">
          <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-full shadow-lg flex items-center gap-3 font-medium text-sm">
            <CheckCircle className="w-5 h-5 text-green-400 dark:text-green-500" />
            {toast}
          </div>
        </div>
      )}

      {/* Header */}
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
              onClick={handleEyedropper}
              className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-slate-600 dark:text-slate-400"
              title="EyeDropper Tool"
            >
              <Pipette className="w-5 h-5" />
            </button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Navigation */}
          <aside className="lg:w-64 shrink-0">
            <nav className="flex lg:flex-col gap-2 p-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-x-auto lg:overflow-x-visible">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as TabType)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                        : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 dark:text-slate-400'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>

            <div className="mt-8 hidden lg:block">
              <ColorHistory history={history} onSelect={handleColorChange} />
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0 space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                {activeTab === 'picker' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    <div className="space-y-8">
                      <ColorZone color={color} onChange={handleColorChange} />
                      <FormatPanel colorData={colorData} onColorChange={handleColorChange} />
                    </div>
                    <div className="space-y-8">
                      <div className="hidden md:block">
                        <ColorHistory history={history} onSelect={handleColorChange} />
                      </div>
                      <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                        <h3 className="text-blue-900 dark:text-blue-100 font-semibold mb-2 flex items-center gap-2">
                          <Layers className="w-4 h-4" />
                          Pro Tip
                        </h3>
                        <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
                          Check out the new <button onClick={() => setActiveTab('shades')} className="underline font-bold">Shades tab</button> to generate a full 50-950 scale for your UI design system!
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'shades' && (
                  <ShadesGenerator globalColor={color} onColorChange={handleColorChange} />
                )}

                {activeTab === 'palettes' && (
                  <PaletteGenerator color={color} onColorChange={handleColorChange} />
                )}

                {activeTab === 'gradients' && (
                  <GradientBuilder currentColor={color} />
                )}

                {activeTab === 'extractor' && (
                  <ImageExtractor onColorSelect={handleColorChange} />
                )}

                {activeTab === 'mixer' && (
                  <ColorMixer currentColor={color} onColorChange={handleColorChange} />
                )}

                {activeTab === 'converter' && (
                  <ColorConverter currentColor={color} onColorChange={handleColorChange} />
                )}

                {activeTab === 'random' && (
                  <RandomGenerator onColorSelect={handleColorChange} />
                )}

                {activeTab === 'tools' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    <div className="space-y-8">
                      <AccessibilityPanel color={color} onColorChange={handleColorChange} />
                    </div>
                    <div className="space-y-8">
                      <ColorBlindnessSimulator color={color} />
                    </div>
                  </div>
                )}

                {activeTab === 'saved' && (
                  <SavedColors 
                    colors={savedColors} 
                    onSave={handleSaveColor} 
                    onDelete={handleDeleteColor} 
                    onSelect={handleColorChange} 
                    currentColor={color}
                  />
                )}

                {activeTab === 'export' && (
                  <ExportPanel colorData={colorData} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Footer */}
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
    </div>
  );
}

export default App;

// Add EyeDropper type to global window
declare global {
  interface Window {
    EyeDropper: unknown;
  }
}
