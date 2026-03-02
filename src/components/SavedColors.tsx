import { Plus, Trash2 } from 'lucide-react';

interface SavedColor {
  id: string;
  name: string;
  hex: string;
}

interface SavedColorsProps {
  colors: SavedColor[];
  onSave: (hex: string) => void;
  onDelete: (id: string) => void;
  onSelect: (hex: string) => void;
  currentColor: string;
}

const SavedColors = ({ colors, onSave, onDelete, onSelect, currentColor }: SavedColorsProps) => {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Saved Colors</h3>
        <button
          onClick={() => onSave(currentColor)}
          className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" /> Save Current
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {colors.map((color) => (
          <div key={color.id} className="group relative">
            <button
              onClick={() => onSelect(color.hex)}
              className="w-full aspect-square rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 transition-transform hover:scale-105"
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(color.id);
              }}
              className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-sm"
              title="Delete"
            >
              <Trash2 className="w-3 h-3" />
            </button>
            <span className="text-[10px] font-medium text-slate-500 mt-1 block truncate text-center">
              {color.name || color.hex}
            </span>
          </div>
        ))}
        {colors.length === 0 && (
          <div className="col-span-full py-8 text-center text-slate-400 text-sm italic">
            No colors saved yet
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedColors;
