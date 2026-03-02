interface ColorHistoryProps {
  history: string[];
  onSelect: (color: string) => void;
}

const ColorHistory = ({ history, onSelect }: ColorHistoryProps) => {
  if (history.length === 0) return null;

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
      <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Recent Colors</h3>
      <div className="flex flex-wrap gap-2">
        {history.map((c, i) => (
          <button
            key={`${c}-${i}`}
            onClick={() => onSelect(c)}
            className="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-800 transition-transform hover:scale-110 shadow-sm"
            style={{ backgroundColor: c }}
            title={c}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorHistory;