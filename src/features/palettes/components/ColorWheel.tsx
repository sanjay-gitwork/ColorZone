import { colord } from 'colord';

interface ColorWheelProps {
  harmonies: string[];
}

const ColorWheel = ({ harmonies }: ColorWheelProps) => {
  return (
    <div className="relative w-48 h-48 mx-auto">
      <div 
        className="absolute inset-0 rounded-full border border-slate-200 dark:border-slate-800"
        style={{
          background: 'conic-gradient(red, yellow, lime, aqua, blue, magenta, red)',
          opacity: 0.3
        }}
      />
      <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 100 100">
        {harmonies.length > 1 && harmonies.map((c, i) => {
          const hsv = colord(c).toHsv();
          const angle = (hsv.h - 90) * (Math.PI / 180);
          const x = 50 + 40 * Math.cos(angle);
          const y = 50 + 40 * Math.sin(angle);
          
          return (
            <circle
              key={i} cx={x} cy={y} r="4" fill={c}
              className="stroke-white dark:stroke-slate-900 stroke-2 shadow-sm"
            />
          );
        })}
      </svg>
    </div>
  );
};

export default ColorWheel;