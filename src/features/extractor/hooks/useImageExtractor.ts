import { useState, useRef, useCallback } from 'react';
import { colord } from 'colord';

export const useImageExtractor = () => {
  const [image, setImage] = useState<string | null>(null);
  const [palette, setPalette] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const extractColors = useCallback((imgElement: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 50;
    canvas.height = 50;
    ctx.drawImage(imgElement, 0, 0, 50, 50);

    const imageData = ctx.getImageData(0, 0, 50, 50).data;
    const colorMap: Record<string, number> = {};

    for (let i = 0; i < imageData.length; i += 4) {
      const hex = colord({ r: imageData[i], g: imageData[i+1], b: imageData[i+2] }).toHex();
      colorMap[hex] = (colorMap[hex] || 0) + 1;
    }

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

  return { image, setImage, palette, isDragging, setIsDragging, handleFile, canvasRef };
};