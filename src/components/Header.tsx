import React from 'react';
import { Microscope, FileDown, PlusCircle } from 'lucide-react';

interface HeaderProps {
  activeTab: 'collaboration' | 'mold-lab' | 'feasibility' | 'species' | 'remediation';
  onSelectTab: (tab: 'collaboration' | 'mold-lab' | 'feasibility' | 'species' | 'remediation') => void;
  onOpenHypothesis: () => void;
  onOpenExport: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onOpenHypothesis,
  onOpenExport
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/95 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onSelectTab('collaboration')}
          className="flex items-center gap-2 text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500"
        >
          <Microscope className="h-5 w-5 text-emerald-400" />
          <span className="font-display text-base font-bold tracking-wider text-slate-100 uppercase">
            Ms. Heavy Metal Leaf
          </span>
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <button
            onClick={() => onSelectTab('collaboration')}
            className={`transition-colors hover:text-emerald-400 whitespace-nowrap cursor-pointer ${
              activeTab === 'collaboration'
                ? 'text-emerald-400 border-b-2 border-emerald-400 py-4 -mb-px'
                : 'text-slate-400 py-4'
            }`}
          >
            Collaboration Room
          </button>
          <button
            onClick={() => onSelectTab('mold-lab')}
            className={`transition-colors hover:text-emerald-400 whitespace-nowrap cursor-pointer ${
              activeTab === 'mold-lab'
                ? 'text-emerald-400 border-b-2 border-emerald-400 py-4 -mb-px'
                : 'text-slate-400 py-4'
            }`}
          >
            Mold & In-Growth Lab
          </button>
          <button
            onClick={() => onSelectTab('feasibility')}
            className={`transition-colors hover:text-emerald-400 whitespace-nowrap cursor-pointer ${
              activeTab === 'feasibility'
                ? 'text-emerald-400 border-b-2 border-emerald-400 py-4 -mb-px'
                : 'text-slate-400 py-4'
            }`}
          >
            80% Metal Feasibility
          </button>
          <button
            onClick={() => onSelectTab('species')}
            className={`transition-colors hover:text-emerald-400 whitespace-nowrap cursor-pointer ${
              activeTab === 'species'
                ? 'text-emerald-400 border-b-2 border-emerald-400 py-4 -mb-px'
                : 'text-slate-400 py-4'
            }`}
          >
            Hyperaccumulator Archive
          </button>
          <button
            onClick={() => onSelectTab('remediation')}
            className={`transition-colors hover:text-emerald-400 whitespace-nowrap cursor-pointer ${
              activeTab === 'remediation'
                ? 'text-emerald-400 border-b-2 border-emerald-400 py-4 -mb-px'
                : 'text-slate-400 py-4'
            }`}
          >
            Field Remediation
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenHypothesis}
            className="inline-flex items-center gap-1.5 rounded border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:border-emerald-500 hover:text-emerald-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 whitespace-nowrap cursor-pointer"
          >
            <PlusCircle className="h-3.5 w-3.5 text-emerald-400" />
            <span>New Hypothesis</span>
          </button>
          <button
            onClick={onOpenExport}
            className="inline-flex items-center gap-1.5 rounded bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-slate-950 transition-colors hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400 whitespace-nowrap cursor-pointer"
          >
            <FileDown className="h-3.5 w-3.5" />
            <span>Export Dossier</span>
          </button>
        </div>
      </div>

      {/* Mobile nav bar */}
      <div className="flex md:hidden border-t border-slate-800/80 overflow-x-auto px-4 py-2 gap-4 text-xs">
        <button
          onClick={() => onSelectTab('collaboration')}
          className={`whitespace-nowrap ${activeTab === 'collaboration' ? 'text-emerald-400 font-semibold' : 'text-slate-400'}`}
        >
          Room
        </button>
        <button
          onClick={() => onSelectTab('mold-lab')}
          className={`whitespace-nowrap ${activeTab === 'mold-lab' ? 'text-emerald-400 font-semibold' : 'text-slate-400'}`}
        >
          In-Growth Mold
        </button>
        <button
          onClick={() => onSelectTab('feasibility')}
          className={`whitespace-nowrap ${activeTab === 'feasibility' ? 'text-emerald-400 font-semibold' : 'text-slate-400'}`}
        >
          80% Feasibility
        </button>
        <button
          onClick={() => onSelectTab('species')}
          className={`whitespace-nowrap ${activeTab === 'species' ? 'text-emerald-400 font-semibold' : 'text-slate-400'}`}
        >
          Species
        </button>
        <button
          onClick={() => onSelectTab('remediation')}
          className={`whitespace-nowrap ${activeTab === 'remediation' ? 'text-emerald-400 font-semibold' : 'text-slate-400'}`}
        >
          Remediation
        </button>
      </div>
    </header>
  );
};
