import { useState, useRef, useCallback } from 'react';
import { Upload, X, Copy, Check, MousePointer2, Image as ImageIcon } from 'lucide-react';
import { colord } from 'colord';

interface ImageExtractorProps {
  onColorSelect: (color: string) => void;
}

const ImageExtractor = ({ onColorSelect }: ImageExtractorProps) => {
  const [image, setImage] = useState<string | null>(null);
  const [palette, setPalette] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const extractColors = useCallback((imgElement: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resize canvas to a small size for performance
    canvas.width = 50;
    canvas.height = 50;
    ctx.drawImage(imgElement, 0, 0, 50, 50);

    const imageData = ctx.getImageData(0, 0, 50, 50).data;
    const colorMap: Record<string, number> = {};

    for (let i = 0; i < imageData.length; i += 4) {
      const r = imageData[i];
      const g = imageData[i+1];
      const b = imageData[i+2];
      const hex = colord({ r, g, b }).toHex();
      colorMap[hex] = (colorMap[hex] || 0) + 1;
    }

    // Sort by frequency and take top 12 unique-ish colors
    const sortedColors = Object.entries(colorMap)
      .sort((a, b) => b[1] - a[1])
      .map(entry => entry[0])
      .slice(0, 12);

    setPalette(sortedColors);
  }, []);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      setImage(url);
      const img = new Image();
      img.onload = () => extractColors(img);
      img.src = url;
    };
    reader.readAsDataURL(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
  };

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
        <h3 className="text-xl font-bold mb-6">Image Color Extractor</h3>
        
        {!image ? (
          <div 
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={onDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`aspect-video rounded-3xl border-4 border-dashed transition-all flex flex-col items-center justify-center cursor-pointer group ${
              isDragging 
                ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/20' 
                : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 group-hover:scale-110 transition-transform">
              <Upload className="w-10 h-10 text-slate-400 group-hover:text-blue-500 transition-colors" />
            </div>
            <p className="mt-6 font-bold text-slate-600 dark:text-slate-300 text-center">
              Drop your image here or <span className="text-blue-500">browse</span>
            </p>
            <p className="mt-2 text-xs text-slate-400">PNG, JPG or WebP (Max 10MB)</p>
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              className="hidden" 
              accept="image/*"
            />
          </div>
        ) : (
          <div className="space-y-8">
            <div className="relative group">
              <img 
                src={image} 
                alt="Uploaded" 
                className="w-full max-h-[400px] object-contain rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-inner"
              />
              <button 
                onClick={() => setImage(null)}
                className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Extracted Palette</h4>
                  <p className="text-xs text-slate-400">Click a color to select or copy its code</p>
                </div>
                <div className="flex gap-2">
                   <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 dark:bg-slate-800 rounded-lg text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
                     <MousePointer2 className="w-3 h-3" /> Select
                   </div>
                </div>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                {palette.map((c, i) => (
                  <div key={`${c}-${i}`} className="space-y-2 group">
                    <button
                      onClick={() => onColorSelect(c)}
                      className="w-full aspect-square rounded-xl shadow-sm border border-black/5 dark:border-white/5 transition-transform hover:scale-110 active:scale-95"
                      style={{ backgroundColor: c }}
                    />
                    <div className="flex items-center justify-between px-1">
                      <span className="text-[10px] font-mono text-slate-400 uppercase">{c}</span>
                      <button 
                        onClick={() => handleCopy(c)}
                        className="text-slate-300 hover:text-blue-500 transition-colors"
                      >
                        {copiedHex === c ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        <canvas ref={canvasRef} className="hidden" />
      </div>

      <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-900/30 flex gap-4 items-start">
        <div className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
          <ImageIcon className="w-5 h-5 text-blue-500" />
        </div>
        <div>
          <h4 className="font-bold text-blue-900 dark:text-blue-100 text-sm mb-1">How it works</h4>
          <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
            The extractor analyzes your image pixels using a frequency-based algorithm to find the most dominant hues. 
            Perfect for matching your UI to a specific photograph or brand asset.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageExtractor;