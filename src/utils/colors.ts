import { colord, extend } from "colord";
import namesPlugin from "colord/plugins/names";
import a11yPlugin from "colord/plugins/a11y";
import mixPlugin from "colord/plugins/mix";
import lchPlugin from "colord/plugins/lch";

extend([namesPlugin, a11yPlugin, mixPlugin, lchPlugin]);

export interface ColorData {
  hex: string;
  rgb: string;
  hsl: string;
  hsv: { h: number; s: number; v: number; a: number };
  cmyk: string;
  alpha: number;
  name: string;
}

export const hexToRgb = (hex: string) => colord(hex).toRgb();
export const hexToHsl = (hex: string) => colord(hex).toHsl();
export const hexToHsv = (hex: string) => colord(hex).toHsv();

export const calculateCmyk = (hex: string) => {
  const { r, g, b } = colord(hex).toRgb();
  const r_ = r / 255;
  const g_ = g / 255;
  const b_ = b / 255;

  const k = 1 - Math.max(r_, g_, b_);
  const c = (1 - r_ - k) / (1 - k) || 0;
  const m = (1 - g_ - k) / (1 - k) || 0;
  const y = (1 - b_ - k) / (1 - k) || 0;

  return `cmyk(${Math.round(c * 100)}%, ${Math.round(m * 100)}%, ${Math.round(y * 100)}%, ${Math.round(k * 100)}%)`;
};

export const getColorData = (color: string): ColorData => {
  const c = colord(color);
  return {
    hex: c.toHex(),
    rgb: c.toRgbString(),
    hsl: c.toHslString(),
    hsv: c.toHsv(),
    cmyk: calculateCmyk(c.toHex()),
    alpha: c.alpha(),
    name: c.toName({ closest: true }) || "Unknown",
  };
};

export const getContrastRatio = (color1: string, color2: string) => {
  return colord(color1).contrast(color2);
};

export const isReadable = (color1: string, color2: string, level: "AA" | "AAA" = "AA") => {
  return colord(color1).isReadable(color2, { level });
};

export const fixContrast = (color: string, background: string, level: "AA" | "AAA" = "AA") => {
  let c = colord(color);
  const bg = colord(background);
  const target = level === "AA" ? 4.5 : 7;
  
  // Try lightening or darkening until contrast is met
  let iteration = 0;
  const isBgLight = bg.isLight();
  
  while (c.contrast(bg) < target && iteration < 100) {
    if (isBgLight) {
      c = c.darken(0.01);
    } else {
      c = c.lighten(0.01);
    }
    iteration++;
  }
  
  return c.toHex();
};

export const generatePalette = (hex: string) => {
  const color = colord(hex);
  return {
    complementary: [hex, color.rotate(180).toHex()],
    analogous: [
      color.rotate(-30).toHex(),
      hex,
      color.rotate(30).toHex(),
    ],
    triadic: [
      hex,
      color.rotate(120).toHex(),
      color.rotate(240).toHex(),
    ],
    tetradic: [
      hex,
      color.rotate(90).toHex(),
      color.rotate(180).toHex(),
      color.rotate(270).toHex(),
    ],
    square: [
      hex,
      color.rotate(90).toHex(),
      color.rotate(180).toHex(),
      color.rotate(270).toHex(),
    ],
    splitComplementary: [
      hex,
      color.rotate(150).toHex(),
      color.rotate(210).toHex(),
    ],
    monochromatic: [
      color.lighten(0.3).toHex(),
      color.lighten(0.15).toHex(),
      hex,
      color.darken(0.15).toHex(),
      color.darken(0.3).toHex(),
    ],
    accentedAnalogous: [
      color.rotate(-30).toHex(),
      hex,
      color.rotate(30).toHex(),
      color.rotate(180).toHex(),
    ],
  };
};
