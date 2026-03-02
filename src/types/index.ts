import type { LucideIcon } from 'lucide-react';

export interface SavedColor {
  id: string;
  name: string;
  hex: string;
}

export type TabType = 'picker' | 'shades' | 'palettes' | 'gradients' | 'extractor' | 'mixer' | 'converter' | 'random' | 'tools' | 'export' | 'saved';

export interface TabConfig {
  id: TabType;
  label: string;
  icon: LucideIcon;
}