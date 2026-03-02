import { Upload, X } from 'lucide-react';
import { useImageExtractor } from './hooks/useImageExtractor';
import { Card, SectionHeader } from '../../components/ui/base/Card';
import { ColorSwatch } from '../../components/ui/shared/ColorSwatch';

interface ImageExtractorProps {
  onColorSelect: (color: string) => void;
}

const ImageExtractor = ({ onColorSelect }: ImageExtractorProps) => {
  const { image, setImage, palette, isDragging, setIsDragging, handleFile, canvasRef } = useImageExtractor();

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card>
        <SectionHeader title="Image Color Extractor" />
        
        {!image ? (
          <div 
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={onDrop}
            className={`aspect-video rounded-3xl border-4 border-dashed transition-all flex flex-col items-center justify-center cursor-pointer group ${
              isDragging ? 'border-blue-500 bg-blue-50/50' : 'border-slate-200 dark:border-slate-800'
            }`}
          >
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 group-hover:scale-110 transition-transform">
              <Upload className="w-10 h-10 text-slate-400 group-hover:text-blue-500" />
            </div>
            <p className="mt-6 font-bold text-slate-600 dark:text-slate-300">Drop image here</p>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="relative group">
              <img src={image} alt="Uploaded" className="w-full max-h-[400px] object-contain rounded-2xl bg-slate-50 border border-slate-200" />
              <button onClick={() => setImage(null)} className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full"><X className="w-5 h-5" /></button>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
              {palette.map((c, i) => (
                <ColorSwatch key={`${c}-${i}`} color={c} showLabel onClick={() => onColorSelect(c)} />
              ))}
            </div>
          </div>
        )}
        <canvas ref={canvasRef} className="hidden" />
      </Card>
    </div>
  );
};

export default ImageExtractor;