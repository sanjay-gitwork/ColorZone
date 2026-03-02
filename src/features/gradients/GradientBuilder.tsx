import { RotateCw, Trash2, Plus } from 'lucide-react';
import { useGradients } from './hooks/useGradients';
import { Button } from '../../components/ui/base/Button';
import { Card, SectionHeader } from '../../components/ui/base/Card';
import { LabelledSlider } from '../../components/ui/shared/LabelledSlider';
import { CopyButton } from '../../components/ui/base/CopyButton';

interface GradientBuilderProps {
  currentColor: string;
}

const GradientBuilder = ({ currentColor }: GradientBuilderProps) => {
  const { 
    stops, type, setType, gradientString, addStop, removeStop, updateStop 
  } = useGradients(currentColor);

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7 space-y-6">
        <Card>
          <div className="flex justify-between items-center mb-8">
            <SectionHeader title="Gradient Designer" />
            <Button variant="ghost" size="sm" onClick={() => updateStop(stops[0].id, { color: currentColor })}>
              <RotateCw className="w-3.5 h-3.5" /> Sync Main
            </Button>
          </div>

          <div className="flex p-1 bg-slate-50 dark:bg-slate-950 rounded-xl gap-1 mb-8">
            {(['linear', 'radial', 'conic'] as const).map((t) => (
              <button
                key={t} onClick={() => setType(t)}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all capitalize ${
                  type === t ? 'bg-white dark:bg-slate-800 shadow-sm text-blue-600' : 'text-slate-500'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="space-y-6">
            {stops.map((stop) => (
              <div key={stop.id} className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/30 p-3 rounded-xl border border-slate-100 dark:border-slate-800/50">
                <input 
                  type="color" value={stop.color}
                  onChange={(e) => updateStop(stop.id, { color: e.target.value })}
                  className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-none p-0"
                />
                <LabelledSlider 
                  label="Position" value={`${stop.position}%`} className="flex-1"
                  onChange={(val) => updateStop(stop.id, { position: val })}
                />
                <button 
                  onClick={() => removeStop(stop.id)}
                  className="p-2 text-slate-400 hover:text-red-500 transition-colors disabled:opacity-30"
                  disabled={stops.length <= 2}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            
            <Button variant="secondary" className="w-full border-2 border-dashed border-slate-200 dark:border-slate-800 bg-transparent" onClick={addStop}>
              <Plus className="w-4 h-4" /> Add Stop
            </Button>
          </div>
        </Card>
      </div>

      <div className="lg:col-span-5 space-y-8">
        <Card className="sticky top-24">
          <div 
            className="w-full aspect-square rounded-3xl shadow-2xl border-8 border-white dark:border-slate-800 mb-8"
            style={{ background: gradientString }}
          />
          
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800/50 relative">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase">CSS Output</span>
                <CopyButton text={gradientString} />
              </div>
              <code className="text-[10px] font-mono text-slate-600 dark:text-slate-400 break-all">{gradientString}</code>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default GradientBuilder;