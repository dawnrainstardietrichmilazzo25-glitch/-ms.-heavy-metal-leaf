import React, { useState } from 'react';
import {
  Sliders,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  Zap,
  Leaf,
  Activity,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

export const MetalFeasibilityCalculator: React.FC = () => {
  const [metalPercent, setMetalPercent] = useState<number>(78);
  const [architectureMode, setArchitectureMode] = useState<'cyborg' | 'natural'>('cyborg');

  // Biophysical mathematical model calculations
  // If natural mode:
  // Metal > 25.7% causes rapid cellular toxicity and death because all metal is forced into cytoplasm/vacuole.
  // If cyborg mode:
  // Metal is compartmentalized: Living inner symplast holds ~22-26% (safe), while outer apoplastic matrix & leaf cuticle carries the remaining 50-55% as solid bio-metallic frameworks!
  
  const naturalViability = Math.max(0, Math.min(100, Math.round(100 - Math.pow(Math.max(0, metalPercent - 25.7), 1.6) * 4)));
  const cyborgViability = metalPercent <= 82
    ? Math.round(98 - Math.max(0, metalPercent - 70) * 1.5)
    : Math.max(0, Math.round(80 - Math.pow(metalPercent - 82, 1.8) * 8));

  const currentViability = architectureMode === 'cyborg' ? cyborgViability : naturalViability;

  // Electrical conductivity (S/m) - percolation threshold occurs around 40-50% metal
  const conductivity = metalPercent < 15
    ? (metalPercent * 0.005).toFixed(3)
    : metalPercent < 45
    ? (0.075 + (metalPercent - 15) * 0.08).toFixed(2)
    : (2.5 + Math.pow(metalPercent - 45, 1.4) * 0.45).toFixed(1);

  // Percolation status
  const isPercolating = metalPercent >= 52;

  // Vacuolar saturation %
  const vacuolarSaturation = Math.min(100, Math.round((metalPercent / 25.7) * 100));

  // Stomatal conductance (mmol/m²s)
  const stomatalConductance = Math.max(12, Math.round(220 - (metalPercent * 1.8)));

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="font-display text-xl font-bold tracking-tight text-slate-100 uppercase">
            The 80% Metal Feasibility & Cellular Limit Analyzer
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Evaluating the central scientific inquiry: <em>Can Ms. Heavy Metal Leaf hold ~80% metal by dry weight and still be a viable, living plant?</em>
          </p>
        </div>
        <div className="mt-2 sm:mt-0 flex items-center gap-2 text-xs font-data">
          <span className="text-emerald-400">BENCHMARK: PYCNANDRA ACUMINATA (25.7% Ni)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column: Interactive Controls & Slider */}
        <div className="lg:col-span-5 space-y-6">
          {/* Architecture Selector */}
          <div className="rounded border border-slate-800 bg-slate-900/60 p-4">
            <div className="mb-2 text-xs font-semibold tracking-wider text-slate-400 uppercase">
              Biological Architecture Mode
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setArchitectureMode('cyborg')}
                className={`rounded border p-2.5 text-left text-xs transition-colors cursor-pointer ${
                  architectureMode === 'cyborg'
                    ? 'border-emerald-500 bg-emerald-950/30 text-emerald-300'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="font-semibold text-slate-100">Ms. Leaf Cyborg Hybrid</div>
                <div className="mt-1 text-[11px] opacity-80">
                  Symplast living core + Apoplastic metallized exoskeleton
                </div>
              </button>

              <button
                onClick={() => setArchitectureMode('natural')}
                className={`rounded border p-2.5 text-left text-xs transition-colors cursor-pointer ${
                  architectureMode === 'natural'
                    ? 'border-cyan-500 bg-cyan-950/30 text-cyan-300'
                    : 'border-slate-800 bg-slate-950 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="font-semibold text-slate-100">Natural Botanics Only</div>
                <div className="mt-1 text-[11px] opacity-80">
                  Intracellular vacuolar storage (Max natural: ~25.7%)
                </div>
              </button>
            </div>
          </div>

          {/* Metal Concentration Slider */}
          <div className="rounded border border-slate-800 bg-slate-900/60 p-4">
            <div className="flex items-center justify-between text-xs font-data">
              <span className="text-slate-400 font-semibold uppercase">TOTAL METAL CONTENT (DRY WEIGHT)</span>
              <span className="text-emerald-400 font-bold text-lg">{metalPercent}%</span>
            </div>

            <input
              type="range"
              min="1"
              max="90"
              value={metalPercent}
              onChange={e => setMetalPercent(Number(e.target.value))}
              className="mt-3 w-full accent-emerald-500 cursor-pointer"
            />

            <div className="mt-2 flex justify-between text-[10px] font-data text-slate-500">
              <span>1% (Wild type)</span>
              <span>25.7% (Pycnandra natural cap)</span>
              <span>55% (Conductive threshold)</span>
              <span className="text-emerald-400 font-bold">80% (Ms. Leaf Target)</span>
              <span>90% (Necrosis)</span>
            </div>

            {/* Quick Presets */}
            <div className="mt-4 border-t border-slate-800/80 pt-3 flex flex-wrap gap-1.5 text-xs">
              <button
                onClick={() => setMetalPercent(4)}
                className="rounded border border-slate-800 bg-slate-950 px-2 py-1 text-[11px] text-slate-300 hover:border-emerald-500 transition-colors cursor-pointer"
              >
                4.4% (Noccaea)
              </button>
              <button
                onClick={() => setMetalPercent(25.7)}
                className="rounded border border-slate-800 bg-slate-950 px-2 py-1 text-[11px] text-slate-300 hover:border-emerald-500 transition-colors cursor-pointer"
              >
                25.7% (Pycnandra Natural Limit)
              </button>
              <button
                onClick={() => setMetalPercent(55)}
                className="rounded border border-slate-800 bg-slate-950 px-2 py-1 text-[11px] text-slate-300 hover:border-emerald-500 transition-colors cursor-pointer"
              >
                55% (Electrical Percolation)
              </button>
              <button
                onClick={() => setMetalPercent(80)}
                className="rounded border border-emerald-500/60 bg-emerald-950/40 px-2 py-1 text-[11px] text-emerald-300 font-semibold cursor-pointer"
              >
                80% (Ms. Heavy Metal Leaf)
              </button>
            </div>
          </div>

          {/* Key Biophysical Readouts */}
          <div className="grid grid-cols-2 gap-3 text-xs font-data">
            <div className="rounded border border-slate-800 bg-slate-900/60 p-3">
              <div className="text-[10px] text-slate-500">TISSUE VIABILITY</div>
              <div className={`mt-1 text-lg font-bold ${currentViability > 70 ? 'text-emerald-400' : currentViability > 30 ? 'text-amber-400' : 'text-rose-500'}`}>
                {currentViability}%
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                {currentViability > 70 ? '● Active Chloroplasts' : currentViability > 30 ? '▲ Stress Chlorosis' : '✖ Cell Necrosis'}
              </div>
            </div>

            <div className="rounded border border-slate-800 bg-slate-900/60 p-3">
              <div className="text-[10px] text-slate-500">ELECTRICAL CONDUCTIVITY</div>
              <div className="mt-1 text-lg font-bold text-cyan-400">
                {conductivity} <span className="text-xs font-normal text-slate-400">S/m</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                {isPercolating ? '● Conductive Pathway Active' : '▲ Below Percolation'}
              </div>
            </div>

            <div className="rounded border border-slate-800 bg-slate-900/60 p-3">
              <div className="text-[10px] text-slate-500">VACUOLAR SATURATION</div>
              <div className="mt-1 text-lg font-bold text-indigo-400">
                {vacuolarSaturation}%
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Citrate/Malate Chelation</div>
            </div>

            <div className="rounded border border-slate-800 bg-slate-900/60 p-3">
              <div className="text-[10px] text-slate-500">TRANSPIRATION CONDUCTANCE</div>
              <div className="mt-1 text-lg font-bold text-amber-400">
                {stomatalConductance} <span className="text-xs font-normal text-slate-400">mmol/m²s</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Gas exchange & cooling</div>
            </div>
          </div>
        </div>

        {/* Right Column: Biophysical Model Diagram & Verdict */}
        <div className="lg:col-span-7 space-y-6">
          {/* Cellular Cross-Section Visualization */}
          <div className="rounded border border-slate-800 bg-slate-900/60 p-4">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <span className="text-xs font-data text-emerald-400 font-bold uppercase">
                  CELLULAR COMPARTMENTALIZATION MODEL
                </span>
                <h2 className="font-display text-sm font-semibold text-slate-100">
                  How 80% Metal Is Sustained While The Plant Stays Alive
                </h2>
              </div>
              <span className={`text-xs font-data font-semibold ${currentViability > 70 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {currentViability > 70 ? 'VIABLE LIVE PLANT' : 'PHYSIOLOGICAL COLLAPSE'}
              </span>
            </div>

            {/* SVG Diagram */}
            <div className="relative aspect-[16/9] w-full rounded border border-slate-800 bg-slate-950 p-4 flex items-center justify-center">
              <svg viewBox="0 0 700 380" className="w-full h-full">
                {/* Background Grid */}
                <pattern id="cellGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.5" opacity="0.3" />
                </pattern>
                <rect width="700" height="380" fill="url(#cellGrid)" />

                {/* Outer Apoplastic Cell Wall Matrix (55% metal in Cyborg mode) */}
                <rect
                  x="80"
                  y="40"
                  width="540"
                  height="300"
                  rx="24"
                  fill="#030712"
                  stroke={architectureMode === 'cyborg' && metalPercent >= 50 ? '#06b6d4' : '#1e293b'}
                  strokeWidth={architectureMode === 'cyborg' ? Math.min(24, Math.max(6, metalPercent * 0.28)) : '6'}
                />

                {/* Plasma membrane */}
                <rect
                  x="110"
                  y="70"
                  width="480"
                  height="240"
                  rx="18"
                  fill="#022c22"
                  fillOpacity="0.4"
                  stroke="#059669"
                  strokeWidth="2"
                  strokeDasharray="4 2"
                />

                {/* Central Vacuole (holds 25.7% max natural chelated metal) */}
                <ellipse
                  cx="350"
                  cy="190"
                  rx="160"
                  ry="90"
                  fill="#083344"
                  fillOpacity="0.7"
                  stroke="#06b6d4"
                  strokeWidth="3"
                />

                {/* Chloroplasts in cytoplasm */}
                <g id="chloroplasts" opacity={currentViability / 100}>
                  <ellipse cx="150" cy="110" rx="20" ry="12" fill="#10b981" />
                  <ellipse cx="550" cy="110" rx="20" ry="12" fill="#10b981" />
                  <ellipse cx="150" cy="270" rx="20" ry="12" fill="#10b981" />
                  <ellipse cx="550" cy="270" rx="20" ry="12" fill="#10b981" />
                  <ellipse cx="250" cy="85" rx="18" ry="10" fill="#10b981" />
                  <ellipse cx="450" cy="85" rx="18" ry="10" fill="#10b981" />
                </g>

                {/* Vacuolar Metal Ions (Chelated Ni-citrate complex) */}
                <g id="vacuolar-ions">
                  <text x="350" y="165" textAnchor="middle" fill="#38bdf8" fontSize="12" fontFamily="monospace" fontWeight="bold">
                    CENTRAL VACUOLE (SYMPLAST)
                  </text>
                  <text x="350" y="185" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="sans-serif">
                    Chelated Ni²⁺ / Cd²⁺ / Zn²⁺ with Citrate & Phytochelatins
                  </text>
                  <text x="350" y="205" textAnchor="middle" fill="#34d399" fontSize="11" fontFamily="monospace">
                    Metabolic Storage: {Math.min(25.7, metalPercent).toFixed(1)}% dry wt
                  </text>
                </g>

                {/* Outer Apoplastic Metallization Lattice */}
                {architectureMode === 'cyborg' && metalPercent > 30 && (
                  <g id="apoplast-lattice">
                    <line x1="80" y1="40" x2="620" y2="40" stroke="#38bdf8" strokeWidth="4" strokeDasharray="8 4" />
                    <line x1="80" y1="340" x2="620" y2="340" stroke="#38bdf8" strokeWidth="4" strokeDasharray="8 4" />
                    <line x1="80" y1="40" x2="80" y2="340" stroke="#38bdf8" strokeWidth="4" strokeDasharray="8 4" />
                    <line x1="620" y1="40" x2="620" y2="340" stroke="#38bdf8" strokeWidth="4" strokeDasharray="8 4" />
                    <text x="350" y="32" textAnchor="middle" fill="#38bdf8" fontSize="10" fontFamily="monospace">
                      EXTRACELLULAR METALLIC EXOSKELETON (APOPLAST): {(metalPercent - Math.min(25.7, metalPercent)).toFixed(1)}%
                    </text>
                  </g>
                )}

                {/* Cytoplasm Label */}
                <text x="180" y="100" fill="#a7f3d0" fontSize="10" fontFamily="sans-serif">
                  Cytoplasm & Chloroplasts (ATP Active)
                </text>
              </svg>
            </div>

            {/* Scientific Findings Summary */}
            <div className="mt-4 rounded border border-slate-800 bg-slate-950 p-4 text-xs space-y-2.5">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                <CheckCircle className="h-4 w-4" />
                <span>Verdict on the 80% Metal Question:</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                {architectureMode === 'cyborg' ? (
                  metalPercent <= 82 ? (
                    <>
                      <strong>Yes, the plant can reach ~80% metal and remain fully alive!</strong> Natural botany alone caps at 25.7% (as in <em>Pycnandra</em>) because forcing 80% metal into the cytoplasm ruptures vacuolar tonoplasts. In Ms. Heavy Metal Leaf, the growth mold guides transpiration sap into the <strong>apoplastic cell-wall sheath</strong>, precipitating solid conductive metal nano-scaffolds (54% metal) outside the cell membrane, while maintaining the living cytoplasm at a safe 26% chelated equilibrium.
                    </>
                  ) : (
                    <>
                      <strong>Critical threshold exceeded (&gt;82%):</strong> Stomatal pores become mechanically occluded by extracellular metallic deposits, preventing CO₂ assimilation and transpiration cooling.
                    </>
                  )
                ) : (
                  metalPercent <= 25.7 ? (
                    <>
                      <strong>Naturally viable:</strong> Below 25.7%, true hyperaccumulators compartmentalize metals entirely in vacuoles using citrate/malate organic acid buffers without toxicity.
                    </>
                  ) : (
                    <>
                      <strong>Biological necrosis:</strong> Pure botanical tissue cannot exceed ~26% metal in a single compartment without free metal ions (Ni²⁺, Cd²⁺) displacing magnesium in chlorophyll and halting photosynthesis.
                    </>
                  )
                )}
              </p>

              <div className="pt-2 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-2 font-data text-[11px]">
                <div className="text-slate-400">
                  PERCOLATION: <span className={isPercolating ? 'text-emerald-400 font-semibold' : 'text-slate-500'}>{isPercolating ? 'METALLIC CONDUCTOR' : 'SEMICONDUCTING'}</span>
                </div>
                <div className="text-slate-400">
                  APOPLAST RATIO: <span className="text-cyan-400 font-semibold">{(metalPercent * 0.68).toFixed(1)}% Metal</span>
                </div>
                <div className="text-slate-400">
                  SYMPLAST CORE: <span className="text-amber-400 font-semibold">{Math.min(25.7, metalPercent).toFixed(1)}% Metal</span>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="rounded border border-slate-800 bg-slate-900/60 p-4">
            <div className="mb-2 text-xs font-semibold tracking-wider text-slate-400 uppercase">
              Metal Saturation Milestones in Ms. Leaf Development
            </div>
            <div className="overflow-x-auto text-xs">
              <table className="w-full text-left font-data">
                <thead>
                  <tr className="border-b border-slate-800 text-[10px] text-slate-500 uppercase">
                    <th className="py-2">Level</th>
                    <th className="py-2">Dry Wt %</th>
                    <th className="py-2">Biological State</th>
                    <th className="py-2">Electrical Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="py-2 text-slate-400">Wild Type</td>
                    <td className="py-2">0.01 – 0.05%</td>
                    <td className="py-2">Standard flora (dies at &gt;100 ppm)</td>
                    <td className="py-2 text-slate-500">Insulator</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-cyan-400">Noccaea / Alyssum</td>
                    <td className="py-2">1.5 – 4.4%</td>
                    <td className="py-2">Active soil extraction, roots viable</td>
                    <td className="py-2 text-slate-400">Weak galvanic ionic trace</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-emerald-400">Pycnandra Latex</td>
                    <td className="py-2">25.7%</td>
                    <td className="py-2">Blue-green sap, peak natural cap</td>
                    <td className="py-2 text-cyan-400">Liquid bio-electrolyte</td>
                  </tr>
                  <tr className="bg-emerald-950/20">
                    <td className="py-2 text-emerald-300 font-bold">Ms. Leaf Target</td>
                    <td className="py-2 text-emerald-300 font-bold">75 – 80%</td>
                    <td className="py-2 text-emerald-300">Dual-compartment living cyborg</td>
                    <td className="py-2 text-emerald-400 font-bold">Bio-antenna & busbar conductor</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
