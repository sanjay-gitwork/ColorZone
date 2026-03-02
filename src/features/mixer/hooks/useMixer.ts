import { useState, useMemo } from 'react';
import { colord } from 'colord';

export const useMixer = (baseColor: string) => {
  const [mixColor, setMixColor] = useState('#ffffff');
  const [weight, setWeight] = useState(50);

  const mixedHex = useMemo(() => 
    colord(baseColor).mix(mixColor, weight / 100).toHex()
  , [baseColor, mixColor, weight]);

  const mixSteps = useMemo(() => 
    [0, 0.25, 0.5, 0.75, 1].map(w => colord(baseColor).mix(mixColor, w).toHex())
  , [baseColor, mixColor]);

  return { mixColor, setMixColor, weight, setWeight, mixedHex, mixSteps };
};