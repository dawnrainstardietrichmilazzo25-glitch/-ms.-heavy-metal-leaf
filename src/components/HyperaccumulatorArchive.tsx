import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  ExternalLink,
  Sparkles,
  Zap,
  Globe2,
  FileCheck2,
  Filter
} from 'lucide-react';
import { HYPERACCUMULATOR_SPECIES } from '../data/hyperaccumulators';

export const HyperaccumulatorArchive: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedMetal, setSelectedMetal] = useState<string>('all');
  const [activeSpeciesId, setActiveSpeciesId] = useState<string>('pycnandra-acuminata');

  const filteredSpecies = HYPERACCUMULATOR_SPECIES.filter(species => {
    const matchesSearch =
      species.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      species.commonName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      species.primaryMetal.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesMetal =
      selectedMetal === 'all' ||
      species.primaryMetal.toLowerCase().includes(selectedMetal.toLowerCase());

    return matchesSearch && matchesMetal;
  });

  const activeSpecies =
    HYPERACCUMULATOR_SPECIES.find(s => s.id === activeSpeciesId) ||
    HYPERACCUMULATOR_SPECIES[0];

  const metals = ['all', 'nickel', 'zinc', 'cadmium', 'copper', 'arsenic', 'selenium'];

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      {/* Top Banner */}
      <div className="mb-6 flex flex-wrap items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="font-display text-xl font-bold tracking-tight text-slate-100 uppercase">
            Peer-Reviewed Hyperaccumulator Archive
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Empirical botanical database of metallophyte flora capable of extracting high-purity transition metals from toxic soils for living bio-bot systems and phytomining.
          </p>
        </div>
        <div className="mt-2 sm:mt-0 flex items-center gap-2 text-xs font-data text-slate-400">
          <span>7 SPECIES VALIDATED</span>
          <span className="text-slate-600">/</span>
          <span className="text-emerald-400">GLOBAL HERBARIUM INDEX</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column: Filter & List */}
        <div className="lg:col-span-5 space-y-4">
          {/* Search & Filter Bar */}
          <div className="rounded border border-slate-800 bg-slate-900/60 p-4 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
              <input
                type="text"
                placeholder="Search by scientific name, metal, or mechanism..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full rounded border border-slate-800 bg-slate-950 pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            {/* Interactive Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-semibold text-slate-400 mr-1 flex items-center gap-1">
                <Filter className="h-3 w-3" /> Metal:
              </span>
              {metals.map(metal => (
                <button
                  key={metal}
                  onClick={() => setSelectedMetal(metal)}
                  className={`rounded px-2.5 py-1 text-xs font-medium capitalize transition-colors cursor-pointer ${
                    selectedMetal === metal
                      ? 'bg-emerald-500 text-slate-950 font-semibold'
                      : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {metal}
                </button>
              ))}
            </div>
          </div>

          {/* Species List */}
          <div className="space-y-2">
            {filteredSpecies.map(sp => (
              <button
                key={sp.id}
                onClick={() => setActiveSpeciesId(sp.id)}
                className={`w-full rounded border p-3 text-left transition-colors cursor-pointer ${
                  activeSpeciesId === sp.id
                    ? 'border-emerald-500 bg-emerald-950/20'
                    : 'border-slate-800/80 bg-slate-900/40 hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-display text-sm font-semibold text-slate-200 italic">
                      {sp.scientificName}
                    </div>
                    <div className="text-xs text-slate-400">
                      {sp.commonName}
                    </div>
                  </div>
                  <div className="text-right font-data text-xs">
                    <span className="text-emerald-400 font-bold">{sp.dryWeightPercentage}%</span>
                    <div className="text-[10px] text-slate-500">Dry Mass</div>
                  </div>
                </div>

                <div className="mt-2.5 flex items-center gap-2 text-[11px] text-slate-400 font-data">
                  <span className="text-slate-300 font-medium">{sp.primaryMetal}</span>
                  <span aria-hidden="true">·</span>
                  <span>{sp.nativeRegion.split('(')[0]}</span>
                </div>
              </button>
            ))}

            {filteredSpecies.length === 0 && (
              <div className="rounded border border-slate-800 bg-slate-900/40 p-6 text-center text-xs text-slate-400">
                No hyperaccumulator species found matching your filter criteria.
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Species Deep-Dive Dossier */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Species Overview */}
          <div className="rounded border border-slate-800 bg-slate-900/60 p-6 space-y-5">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <div className="text-xs font-data text-emerald-400 uppercase tracking-wider">
                  BOTANICAL SPECIFICATION DOSSIER
                </div>
                <h2 className="font-display text-2xl font-bold text-slate-100 italic mt-0.5">
                  {activeSpecies.scientificName}
                </h2>
                <div className="text-sm text-slate-300 mt-0.5">
                  {activeSpecies.commonName}
                </div>
              </div>

              <div className="rounded border border-emerald-500/40 bg-emerald-950/30 px-3 py-2 text-right font-data">
                <div className="text-[10px] text-slate-400 uppercase">MAX CONCENTRATION</div>
                <div className="text-base font-bold text-emerald-400">
                  {activeSpecies.dryWeightPercentage}% Dry Wt
                </div>
                <div className="text-[10px] text-slate-400">{activeSpecies.maxAccumulation}</div>
              </div>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-data">
              <div className="rounded border border-slate-800 bg-slate-950 p-3">
                <div className="text-[10px] text-slate-500 uppercase">Primary Target Metal</div>
                <div className="text-emerald-400 font-semibold text-sm mt-0.5">
                  {activeSpecies.primaryMetal}
                </div>
              </div>

              <div className="rounded border border-slate-800 bg-slate-950 p-3">
                <div className="text-[10px] text-slate-500 uppercase">Co-Accumulated Ions</div>
                <div className="text-cyan-400 font-semibold text-sm mt-0.5">
                  {activeSpecies.secondaryMetals.join(', ') || 'None reported'}
                </div>
              </div>

              <div className="rounded border border-slate-800 bg-slate-950 p-3">
                <div className="text-[10px] text-slate-500 uppercase">Native Soil Geology</div>
                <div className="text-amber-400 font-semibold text-sm mt-0.5 truncate">
                  {activeSpecies.nativeRegion}
                </div>
              </div>
            </div>

            {/* In-Depth Biochemical Mechanism */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Cellular Hyperaccumulation Mechanism
              </h3>
              <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
                {activeSpecies.mechanism}
              </p>
            </div>

            {/* Ms. Leaf Bio-Robotics Role */}
            <div className="rounded border border-slate-800/80 bg-slate-950/70 p-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                <Zap className="h-4 w-4" />
                <span>Ms. Heavy Metal Leaf Bio-Bot Integration Role</span>
              </div>
              <p className="mt-2 text-xs text-slate-200 leading-relaxed">
                {activeSpecies.bioroboticsRole}
              </p>
              <div className="mt-3 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 leading-relaxed">
                <strong>Biotech Advantage:</strong> {activeSpecies.biotechAdvantage}
              </div>
            </div>

            {/* Academic Literature Grounding */}
            <div className="border-t border-slate-800 pt-4">
              <div className="mb-2 text-xs font-semibold tracking-wider text-slate-400 uppercase">
                Peer-Reviewed Botanical References
              </div>
              <div className="space-y-2 text-xs text-slate-400 font-sans">
                <div className="flex items-start gap-2">
                  <FileCheck2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-300 font-medium">
                      Jaffré, T., Brooks, R.R., Lee, J., Reeves, R.D. (1976).
                    </span>{' '}
                    "<em>Sebertia acuminata: a hyperaccumulator of nickel from New Caledonia</em>." Science, 193(4253), 579-580.
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <FileCheck2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-300 font-medium">
                      van der Ent, A., Baker, A.J.M., Reeves, R.D., Pollard, A.J., Schat, H. (2013).
                    </span>{' '}
                    "<em>Hyperaccumulators of metal and metalloid trace elements: Facts and fiction</em>." Plant and Soil, 362(1-2), 319-334.
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <FileCheck2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-300 font-medium">
                      Verbruggen, N., Hermans, C., Schat, H. (2009).
                    </span>{' '}
                    "<em>Mechanisms to cope with arsenic or cadmium excess in plants</em>." Current Opinion in Plant Biology, 12(3), 364-372.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cleanroom Photobioreactor Growth Asset Showcase */}
          <div className="rounded border border-slate-800 bg-slate-900/60 overflow-hidden">
            <div className="relative aspect-[16/9] w-full bg-slate-950">
              <img
                src="/src/assets/images/biomold_cleanroom_growth_1790557802604.jpg"
                alt="Photobioreactor cleanroom growth chamber for cyborg hyperaccumulator plants"
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] font-data text-emerald-400">
                <span>PHOTOBIOREACTOR FACILITY // LEVEL 03</span>
                <span>CHELATED NUTRIENT CYCLE</span>
              </div>
            </div>
            <div className="p-3 text-xs text-slate-300">
              Controlled environment photobioreactors maintain calibrated photosynthetic photons (PPFD: 450 µmol/m²s) and continuous micro-mist chelates to optimize seedling in-growth within the micro-molds.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
