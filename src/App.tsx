import { useState, useCallback, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Palette, Zap, Layout, Save, Share2, Layers, 
  MoveRight, Image as ImageIcon, ArrowLeftRight, Blend, Shuffle 
} from 'lucide-react';

// Types
import type { TabType, TabConfig, SavedColor } from './types';

// Utils & Hooks
import { getColorData } from './utils/colors';
import { useLocalStorage } from './hooks/useLocalStorage';

// Layout Components
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import Toast from './components/ui/Toast';

// Tab View Components
import ColorZone from './components/ColorZone';
import FormatPanel from './components/FormatPanel';
import ShadesGenerator from './features/shades/ShadesGenerator';
import PaletteGenerator from './features/palettes/PaletteGenerator';
import GradientBuilder from './features/gradients/GradientBuilder';
import ImageExtractor from './features/extractor/ImageExtractor';
import ColorMixer from './features/mixer/ColorMixer';
import ColorConverter from './components/ColorConverter';
import RandomGenerator from './components/RandomGenerator';
import AccessibilityPanel from './components/AccessibilityPanel';
import ColorBlindnessSimulator from './components/ColorBlindnessSimulator';
import SavedColors from './components/SavedColors';
import ExportPanel from './components/ExportPanel';

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
    
    setHistory(prev => {
      const filtered = prev.filter(c => c !== newColor);
      return [newColor, ...filtered].slice(0, 14);
    });
  }, [setHistory]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash && hash.length === 7) setColor(hash);
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
    const EyeDropperConstructor = (window as unknown as { EyeDropper: new () => { open: () => Promise<{ sRGBHex: string }> } }).EyeDropper;
    const eyeDropper = new EyeDropperConstructor();
    try {
      const result = await eyeDropper.open();
      handleColorChange(result.sRGBHex);
    } catch {
      console.log('EyeDropper cancelled');
    }
  };

  const tabs: TabConfig[] = [
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
      <Toast message={toast} />
      <Header onEyedropper={handleEyedropper} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <Sidebar 
            tabs={tabs} 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            history={history} 
            onColorChange={handleColorChange} 
          />

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
                      <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                        <h3 className="text-blue-900 dark:text-blue-100 font-semibold mb-2 flex items-center gap-2">
                          <Layers className="w-4 h-4" /> Pro Tip
                        </h3>
                        <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
                          Check out the <button onClick={() => setActiveTab('shades')} className="underline font-bold">Shades tab</button> to generate a full 50-950 scale for your UI!
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'shades' && <ShadesGenerator globalColor={color} onColorChange={handleColorChange} />}
                {activeTab === 'palettes' && <PaletteGenerator color={color} onColorChange={handleColorChange} />}
                {activeTab === 'gradients' && <GradientBuilder currentColor={color} />}
                {activeTab === 'extractor' && <ImageExtractor onColorSelect={handleColorChange} />}
                {activeTab === 'mixer' && <ColorMixer currentColor={color} onColorChange={handleColorChange} />}
                {activeTab === 'converter' && <ColorConverter currentColor={color} onColorChange={handleColorChange} />}
                {activeTab === 'random' && <RandomGenerator onColorSelect={handleColorChange} />}

                {activeTab === 'tools' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    <AccessibilityPanel color={color} onColorChange={handleColorChange} />
                    <ColorBlindnessSimulator color={color} />
                  </div>
                )}

                {activeTab === 'saved' && (
                  <SavedColors 
                    colors={savedColors} onSave={handleSaveColor} 
                    onDelete={handleDeleteColor} onSelect={handleColorChange} 
                    currentColor={color}
                  />
                )}

                {activeTab === 'export' && <ExportPanel colorData={colorData} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>

      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;

declare global {
  interface Window {
    EyeDropper: unknown;
  }
}