import { RefreshCcw } from 'lucide-react';
import { useShades } from './hooks/useShades';
import ColorScale from './components/ColorScale';
import TintsAndShades from './components/TintsAndShades';
import { Button } from '../../components/ui/base/Button';
import { Card } from '../../components/ui/base/Card';
import { useState } from 'react';

interface ShadesGeneratorProps {
  globalColor: string;
  onColorChange: (color: string) => void;
}

const ShadesGenerator = ({ globalColor, onColorChange }: ShadesGeneratorProps) => {
  const [localColor, setLocalColor] = useState(globalColor);
  const { mode, setMode, steps, setSteps, scale, generateMix } = useShades(localColor);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Shade Workspace</h2>
            <p className="text-sm text-slate-500">Generate professional scales independently.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <input 
              type="color" value={localColor}
              onChange={(e) => setLocalColor(e.target.value)}
              className="w-12 h-12 rounded-xl cursor-pointer border-none p-0"
            />
            <Button variant="icon" onClick={() => setLocalColor(globalColor)}><RefreshCcw className="w-5 h-5" /></Button>
            <Button size="sm" onClick={() => onColorChange(localColor)}>Set as Main</Button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ColorScale scale={scale} mode={mode} setMode={setMode} />
        <TintsAndShades color={localColor} steps={steps} setSteps={setSteps} generateMix={generateMix} />
      </div>
    </div>
  );
};

export default ShadesGenerator;