import { useState, useMemo } from 'react';
import { colord } from 'colord';

export type ScaleMode = 'natural' | 'perceptual' | 'linear';

export const useShades = (baseColor: string) => {
  const [mode, setMode] = useState<ScaleMode>('natural');
  const [steps, setSteps] = useState(10);

  const scale = useMemo(() => {
    const base = colord(baseColor);
    const hsv = base.toHsv();
    const lch = base.toLch();
    
    return [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((step) => {
      const lightness = 1 - (step / 1000);
      let hex: string;

      if (mode === 'natural') {
        const hueShift = (500 - step) / 50; 
        const satShift = (step - 500) / 20; 
        hex = colord({
          h: (hsv.h + hueShift + 360) % 360,
          s: Math.max(0, Math.min(100, hsv.s + satShift)),
          v: lightness * 100,
          a: hsv.a
        }).toHex();
      } else if (mode === 'perceptual') {
        hex = colord({ l: lightness * 100, c: lch.c, h: lch.h, a: lch.a }).toHex();
      } else {
        hex = base.mix(step < 500 ? '#ffffff' : '#000000', Math.abs(500 - step) / 500).toHex();
      }
      return { label: step.toString(), hex };
    });
  }, [baseColor, mode]);

  const generateMix = (color: string, targetColor: string, currentSteps: number) => {
    return Array.from({ length: currentSteps + 1 }, (_, i) => {
      const weight = i * (1 / currentSteps);
      return colord(color).mix(targetColor, weight).toHex();
    });
  };

  return { mode, setMode, steps, setSteps, scale, generateMix };
};