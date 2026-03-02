import { Blend, ArrowRightLeft } from 'lucide-react';
import { useMixer } from './hooks/useMixer';
import { Card, SectionHeader } from '../../components/ui/base/Card';
import { Button } from '../../components/ui/base/Button';
import { LabelledSlider } from '../../components/ui/shared/LabelledSlider';
import { CopyButton } from '../../components/ui/base/CopyButton';

interface ColorMixerProps {
  currentColor: string;
  onColorChange: (color: string) => void;
}

const ColorMixer = ({ currentColor, onColorChange }: ColorMixerProps) => {
  const { mixColor, setMixColor, weight, setWeight, mixedHex, mixSteps } = useMixer(currentColor);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card>
        <div className="flex justify-between items-center mb-8">
          <SectionHeader title="Advanced Color Mixer" icon={Blend} />
          <Button size="sm" onClick={() => onColorChange(mixedHex)}>
            <ArrowRightLeft className="w-3.5 h-3.5" /> Set as Main
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Base</label>
                <div className="h-20 rounded-2xl border-4 border-white dark:border-slate-800 shadow-md" style={{ backgroundColor: currentColor }} />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Mix</label>
                <div className="relative h-20 rounded-2xl border-4 border-white dark:border-slate-800 overflow-hidden">
                  <input type="color" value={mixColor} onChange={(e) => setMixColor(e.target.value)} className="absolute -inset-4 w-[150%] h-[150%] cursor-pointer" />
                </div>
              </div>
            </div>
            <LabelledSlider label="Mix Ratio" value={`${weight}%`} onChange={setWeight} />
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Blending Steps</label>
              <div className="flex h-24 rounded-2xl overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl">
                {mixSteps.map((step, i) => (
                  <div key={i} className="flex-1 relative group" style={{ backgroundColor: step }}>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/10">
                      <CopyButton text={step} size="sm" className="text-white" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl shadow-lg" style={{ backgroundColor: mixedHex }} />
                  <p className="text-2xl font-mono font-black uppercase text-slate-800 dark:text-white">{mixedHex}</p>
                </div>
                <CopyButton text={mixedHex} />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ColorMixer;