import { useState, useMemo } from 'react';
import { colord } from 'colord';

export interface GradientStop {
  id: string;
  color: string;
  position: number;
}

export type GradientType = 'linear' | 'radial' | 'conic';

export const useGradients = (initialColor: string) => {
  const [stops, setStops] = useState<GradientStop[]>([
    { id: '1', color: initialColor, position: 0 },
    { id: '2', color: colord(initialColor).rotate(30).toHex(), position: 100 },
  ]);
  const [type, setType] = useState<GradientType>('linear');
  const [angle, setAngle] = useState(90);

  const sortedStops = useMemo(() => [...stops].sort((a, b) => a.position - b.position), [stops]);

  const gradientString = useMemo(() => {
    const stopsStr = sortedStops.map(s => `${s.color} ${s.position}%`).join(', ');
    if (type === 'linear') return `linear-gradient(${angle}deg, ${stopsStr})`;
    if (type === 'radial') return `radial-gradient(circle, ${stopsStr})`;
    return `conic-gradient(from ${angle}deg, ${stopsStr})`;
  }, [sortedStops, type, angle]);

  const addStop = () => {
    if (stops.length >= 5) return;
    setStops([...stops, { id: Date.now().toString(), color: '#ffffff', position: 50 }]);
  };

  const removeStop = (id: string) => {
    if (stops.length <= 2) return;
    setStops(stops.filter(s => s.id !== id));
  };

  const updateStop = (id: string, updates: Partial<GradientStop>) => {
    setStops(stops.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  return { stops, sortedStops, type, setType, angle, setAngle, gradientString, addStop, removeStop, updateStop };
};