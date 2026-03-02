import { useState } from 'react';
import { generatePalette } from '../../../utils/colors';

export const usePalettes = (color: string) => {
  const [activePaletteIndex, setActivePaletteIndex] = useState(0);
  const palettes = generatePalette(color);

  const paletteGroups = [
    { label: 'Complementary', colors: palettes.complementary, description: 'Opposite on wheel. High contrast.' },
    { label: 'Analogous', colors: palettes.analogous, description: 'Adjacent on wheel. Smooth & harmonious.' },
    { label: 'Triadic', colors: palettes.triadic, description: 'Evenly spaced. Balanced & vibrant.' },
    { label: 'Split Complementary', colors: palettes.splitComplementary, description: 'Base plus two adjacent to complement.' },
    { label: 'Square', colors: palettes.square, description: 'Four colors evenly spaced.' },
    { label: 'Tetradic', colors: palettes.tetradic, description: 'Two pairs of complements.' },
    { label: 'Accented Analogous', colors: palettes.accentedAnalogous, description: 'Analogous plus a complementary accent.' },
    { label: 'Monochromatic', colors: palettes.monochromatic, description: 'Shades, tints, and tones of one hue.' },
  ];

  return { activePaletteIndex, setActivePaletteIndex, paletteGroups };
};