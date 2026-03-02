interface LabelledSliderProps {
  label: string;
  value: string | number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (val: number) => void;
  background?: string;
  className?: string;
}

export const LabelledSlider = ({ label, value, min = 0, max = 100, step = 1, onChange, background, className }: LabelledSliderProps) => (
  <div className={`space-y-2 ${className}`}>
    <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase">
      <span>{label}</span>
      <span>{value}</span>
    </div>
    <div className="relative h-2 rounded-lg alpha-slider overflow-hidden">
      <input 
        type="range" 
        min={min} max={max} step={step}
        value={value} 
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="absolute inset-0 w-full h-full appearance-none cursor-pointer bg-transparent z-10"
        style={{ background }}
      />
    </div>
  </div>
);