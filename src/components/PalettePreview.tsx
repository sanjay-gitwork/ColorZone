import { colord } from 'colord';

interface PalettePreviewProps {
  colors: string[];
}

const PalettePreview = ({ colors }: PalettePreviewProps) => {
  // Try to intelligently assign colors from the palette to UI elements
  const primary = colors[0];
  const secondary = colors[1] || colors[0];
  const background = colord(primary).isLight() ? colord(primary).lighten(0.4).toHex() : colord(primary).lighten(0.3).toHex();
  
  return (
    <div className="mt-8 p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-6">
      <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Mock UI Preview</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sidebar/Nav Mockup */}
        <div 
          className="p-4 rounded-xl border space-y-3"
          style={{ backgroundColor: background, borderColor: colord(primary).alpha(0.2).toRgbString() }}
        >
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg" style={{ backgroundColor: primary }} />
            <div className="h-2 w-20 rounded bg-slate-200 dark:bg-slate-800" />
          </div>
          <div className="space-y-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: i === 1 ? secondary : colord(background).darken(0.1).toHex() }} />
                <div className="h-1.5 w-16 rounded bg-slate-200 dark:bg-slate-800" />
              </div>
            ))}
          </div>
        </div>

        {/* Hero Section Mockup */}
        <div className="space-y-4">
          <h5 className="text-xl font-black leading-tight" style={{ color: colord(primary).isLight() ? colord(primary).darken(0.4).toHex() : primary }}>
            Design with <span style={{ color: secondary }}>Harmony</span>
          </h5>
          <p className="text-[10px] text-slate-600 dark:text-slate-400">
            A preview of how these colors work together in a professional interface.
          </p>
          <div className="flex gap-2">
            <button 
              className="px-4 py-1.5 rounded-lg text-[10px] font-bold shadow-sm"
              style={{ 
                backgroundColor: primary,
                color: colord(primary).isLight() ? '#000' : '#fff'
              }}
            >
              Get Started
            </button>
            <button 
              className="px-4 py-1.5 rounded-lg text-[10px] font-bold border"
              style={{ 
                borderColor: secondary,
                color: secondary
              }}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PalettePreview;