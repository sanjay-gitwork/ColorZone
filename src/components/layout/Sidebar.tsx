import type { TabType, TabConfig } from '../../types';
import ColorHistory from '../ColorHistory';

interface SidebarProps {
  tabs: TabConfig[];
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  history: string[];
  onColorChange: (color: string) => void;
}

const Sidebar = ({ tabs, activeTab, setActiveTab, history, onColorChange }: SidebarProps) => {
  return (
    <aside className="lg:w-64 shrink-0">
      <nav className="flex lg:flex-col gap-2 p-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-x-auto lg:overflow-x-visible">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                  : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 dark:text-slate-400'
              }`}
            >
              <Icon className="w-5 h-5" />
              {tab.label}
            </button>
          );
        })}
      </nav>

      <div className="mt-8 hidden lg:block">
        <ColorHistory history={history} onSelect={onColorChange} />
      </div>
    </aside>
  );
};

export default Sidebar;