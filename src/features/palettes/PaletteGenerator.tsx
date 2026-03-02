import { usePalettes } from './hooks/usePalettes';
import ColorWheel from './components/ColorWheel';
import PalettePreview from './components/PalettePreview';
import { Card, SectionHeader } from '../../components/ui/base/Card';
import { CopyButton } from '../../components/ui/base/CopyButton';

interface PaletteGeneratorProps {
  color: string;
  onColorChange: (color: string) => void;
}

const PaletteGenerator = ({ color, onColorChange }: PaletteGeneratorProps) => {
  const { activePaletteIndex, setActivePaletteIndex, paletteGroups } = usePalettes(color);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
      <div className="xl:col-span-8">
        <Card>
          <SectionHeader title="Color Harmonies" subtitle="Click a color to select or use preview" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {paletteGroups.map((group, index) => (
              <div 
                key={group.label}
                onMouseEnter={() => setActivePaletteIndex(index)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  activePaletteIndex === index ? 'border-blue-500 bg-blue-50/30' : 'border-transparent'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-black text-slate-500 uppercase">{group.label}</span>
                  <CopyButton text={group.colors.join(', ')} size="sm" />
                </div>
                <div className="flex gap-1.5">
                  {group.colors.map((c, i) => (
                    <div 
                      key={i} onClick={() => onColorChange(c)}
                      className="flex-1 h-12 rounded-lg shadow-sm border border-black/5 cursor-pointer hover:scale-110 transition-transform"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="xl:col-span-4 space-y-8">
        <Card className="sticky top-24">
          <SectionHeader title="Visualization" />
          <ColorWheel harmonies={paletteGroups[activePaletteIndex].colors} />
          <PalettePreview colors={paletteGroups[activePaletteIndex].colors} />
        </Card>
      </div>
    </div>
  );
};

export default PaletteGenerator;