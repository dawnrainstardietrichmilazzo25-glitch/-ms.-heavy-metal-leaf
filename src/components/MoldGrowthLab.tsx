import React, { useState } from 'react';
import {
  Layers,
  Play,
  RotateCcw,
  CheckCircle2,
  Cpu,
  Sprout,
  Zap,
  Activity,
  Droplets,
  ChevronRight,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { MOLD_GROWTH_STAGES, HYPERACCUMULATOR_SPECIES } from '../data/hyperaccumulators';

export const MoldGrowthLab: React.FC = () => {
  const [selectedStageId, setSelectedStageId] = useState<number>(3);
  const [selectedSpeciesId, setSelectedSpeciesId] = useState<string>('pycnandra-acuminata');
  const [activeLayers, setActiveLayers] = useState<{
    moldShell: boolean;
    goldElectrodes: boolean;
    capillaryWicks: boolean;
    plantVascular: boolean;
    metalDeposition: boolean;
  }>({
    moldShell: true,
    goldElectrodes: true,
    capillaryWicks: true,
    plantVascular: true,
    metalDeposition: true
  });

  const [activeProtocolStep, setActiveProtocolStep] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]);

  const currentStage = MOLD_GROWTH_STAGES.find(s => s.id === selectedStageId) || MOLD_GROWTH_STAGES[2];
  const currentSpecies = HYPERACCUMULATOR_SPECIES.find(s => s.id === selectedSpeciesId) || HYPERACCUMULATOR_SPECIES[0];

  const toggleLayer = (layerKey: keyof typeof activeLayers) => {
    setActiveLayers(prev => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  const handleStepComplete = (stepNum: number) => {
    if (!completedSteps.includes(stepNum)) {
      setCompletedSteps(prev => [...prev, stepNum]);
    }
    if (stepNum < 5) {
      setActiveProtocolStep(stepNum + 1);
    }
  };

  const protocolSteps = [
    {
      num: 1,
      title: 'PDMS Micro-Mold Casting & Electrode Patterning',
      specs: 'Optically clear polydimethylsiloxane (PDMS) 10:1 ratio, degassed at 50 mTorr. Sputter 150 nm gold interdigitated electrode array with 5 nm titanium adhesion layer onto mold micro-channels.',
      duration: '4 hours',
      checkpoint: 'Electrode sheet resistance < 1.2 Ω/sq'
    },
    {
      num: 2,
      title: 'Capillary Wick & Hydro-Gel Channel Priming',
      specs: 'Insert porous carbon nanotube capillary wicks into lower nutrient bays. Infuse channels with sterile chelated Hoagland solution doped with 200 µM target metal (Ni/Cu/Zn) citrate.',
      duration: '2 hours',
      checkpoint: 'Capillary flow rate verified at 12 µL/min'
    },
    {
      num: 3,
      title: 'Direct Seed Placement & Guided In-Growth',
      specs: 'Surface-sterilize hyperaccumulator seed in 1.5% NaClO. Deposit single seed into mold inlet port. No needles or incisions — seed radicle follows capillary gradient into pre-positioned electrode nest.',
      duration: 'Day 1 – 10',
      checkpoint: 'Germination confirmation & radicle contact with gold pins'
    },
    {
      num: 4,
      title: 'Vascular Metallization & Biological Lamination',
      specs: 'Step-increase heavy metal concentration in transpiration feed. Cotyledons and secondary leaves expand against mold walls, locking cuticle and lignified cell walls directly to sensor array.',
      duration: 'Day 11 – 30',
      checkpoint: 'Leaf impedance drop to < 950 Ω without necrosis'
    },
    {
      num: 5,
      title: 'Bio-Bot Telemetry Calibration & Field Sealing',
      specs: 'Mount low-power sub-gigahertz LoRa transmitter to mold rear contact busbar. Connect phytogalvanic sap harvest terminals. Unit is hermetically sealed against rain while leaving stomatal gas window exposed.',
      duration: '1 hour',
      checkpoint: 'Autonomous 0.72V open-circuit potential verified'
    }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      {/* Top Banner */}
      <div className="mb-6 flex flex-wrap items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="font-display text-xl font-bold tracking-tight text-slate-100 uppercase">
            Bio-Mold & Zero-Installation In-Growth Laboratory
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Pre-casting sensors inside the micro-mold allows the hyperaccumulator plant to grow organically into the electronics — eliminating surgical incisions, callose scarring, and tissue rejection.
          </p>
        </div>
        <div className="mt-2 sm:mt-0 flex items-center gap-3 text-xs font-data">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <ShieldCheck className="h-4 w-4" />
            <span>IN-SITU GROWTH PROTOCOL v2.4</span>
          </span>
          <span className="text-slate-600">/</span>
          <span className="text-slate-400">ZERO SURGICAL FOOTPRINT</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column: Stage Selector & Species Pairing */}
        <div className="lg:col-span-4 space-y-6">
          {/* Species Selector */}
          <div className="rounded border border-slate-800 bg-slate-900/60 p-4">
            <div className="mb-2 text-xs font-semibold tracking-wider text-slate-400 uppercase">
              Host Hyperaccumulator Pairing
            </div>
            <select
              value={selectedSpeciesId}
              onChange={e => setSelectedSpeciesId(e.target.value)}
              className="w-full rounded border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-medium text-slate-200 focus:border-emerald-500 focus:outline-none"
            >
              {HYPERACCUMULATOR_SPECIES.map(sp => (
                <option key={sp.id} value={sp.id}>
                  {sp.scientificName} ({sp.primaryMetal}) — {sp.dryWeightPercentage}% max
                </option>
              ))}
            </select>
            <div className="mt-3 rounded border border-slate-800/80 bg-slate-950/60 p-2.5 text-xs">
              <div className="flex justify-between text-slate-400 font-data text-[11px]">
                <span>TARGET METAL:</span>
                <span className="text-emerald-400 font-semibold">{currentSpecies.primaryMetal}</span>
              </div>
              <div className="flex justify-between text-slate-400 font-data text-[11px] mt-1">
                <span>MAX CONCENTRATION:</span>
                <span className="text-slate-200">{currentSpecies.maxAccumulation}</span>
              </div>
              <p className="mt-2 text-[11px] text-slate-400 leading-relaxed">
                {currentSpecies.biotechAdvantage}
              </p>
            </div>
          </div>

          {/* 4-Stage In-Growth Timeline */}
          <div className="rounded border border-slate-800 bg-slate-900/60 p-4">
            <div className="mb-3 text-xs font-semibold tracking-wider text-slate-400 uppercase">
              In-Growth Phases (Zero Installation)
            </div>
            <div className="space-y-2">
              {MOLD_GROWTH_STAGES.map(stage => (
                <button
                  key={stage.id}
                  onClick={() => setSelectedStageId(stage.id)}
                  className={`w-full rounded border p-2.5 text-left transition-colors cursor-pointer ${
                    selectedStageId === stage.id
                      ? 'border-emerald-500 bg-emerald-950/30'
                      : 'border-slate-800/80 bg-slate-950/50 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-data">
                    <span className="text-emerald-400 font-bold">{stage.phase}</span>
                    <span className="text-slate-500">{stage.days}</span>
                  </div>
                  <div className="mt-1 text-xs font-semibold text-slate-200">
                    {stage.title}
                  </div>
                  <div className="mt-1 text-[11px] text-slate-400 line-clamp-2">
                    {stage.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Layer Visibility Toggles */}
          <div className="rounded border border-slate-800 bg-slate-900/60 p-4">
            <div className="mb-3 flex items-center justify-between text-xs font-semibold tracking-wider text-slate-400 uppercase">
              <span>Schematic Visual Layers</span>
              <Layers className="h-3.5 w-3.5 text-emerald-400" />
            </div>
            <div className="space-y-2 text-xs">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-slate-300">1. Mold Outer Exoskeleton (PDMS)</span>
                <input
                  type="checkbox"
                  checked={activeLayers.moldShell}
                  onChange={() => toggleLayer('moldShell')}
                  className="rounded border-slate-700 text-emerald-500 focus:ring-emerald-500"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-slate-300">2. Embedded Gold Electrodes</span>
                <input
                  type="checkbox"
                  checked={activeLayers.goldElectrodes}
                  onChange={() => toggleLayer('goldElectrodes')}
                  className="rounded border-slate-700 text-emerald-500 focus:ring-emerald-500"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-slate-300">3. Capillary Hydration Channels</span>
                <input
                  type="checkbox"
                  checked={activeLayers.capillaryWicks}
                  onChange={() => toggleLayer('capillaryWicks')}
                  className="rounded border-slate-700 text-emerald-500 focus:ring-emerald-500"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-slate-300">4. Living Plant Xylem / Leaf Tissue</span>
                <input
                  type="checkbox"
                  checked={activeLayers.plantVascular}
                  onChange={() => toggleLayer('plantVascular')}
                  className="rounded border-slate-700 text-emerald-500 focus:ring-emerald-500"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-slate-300">5. Metallic Conductive Vein Network</span>
                <input
                  type="checkbox"
                  checked={activeLayers.metalDeposition}
                  onChange={() => toggleLayer('metalDeposition')}
                  className="rounded border-slate-700 text-emerald-500 focus:ring-emerald-500"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Center / Right: Interactive Visual Schematic & Protocol Runner */}
        <div className="lg:col-span-8 space-y-6">
          {/* Interactive Mold & Plant SVG Cross-Section Viewport */}
          <div className="rounded border border-slate-800 bg-slate-900/60 p-4">
            <div className="mb-3 flex flex-wrap items-center justify-between">
              <div>
                <span className="text-xs font-data text-emerald-400 font-bold uppercase">
                  {currentStage.phase} // CROSS-SECTION MICRO-SCHEMATIC
                </span>
                <h2 className="font-display text-sm font-semibold text-slate-100">
                  {currentStage.title}
                </h2>
              </div>
              <div className="flex items-center gap-3 text-xs font-data text-slate-400">
                <span>CONDUCTIVITY: <span className="text-emerald-400">{currentStage.conductivity}</span></span>
                <span className="text-slate-600">·</span>
                <span>METAL: <span className="text-cyan-400">{currentStage.metalConcentration}</span></span>
              </div>
            </div>

            {/* SVG Visual Stage Display */}
            <div className="relative aspect-[16/9] w-full rounded border border-slate-800 bg-slate-950 overflow-hidden flex items-center justify-center p-4">
              <svg viewBox="0 0 800 450" className="w-full h-full">
                <defs>
                  {/* Grid background */}
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.8" opacity="0.4" />
                  </pattern>

                  {/* Metallic gradient for veins */}
                  <linearGradient id="metallicVein" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="50%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#e2e8f0" />
                  </linearGradient>

                  {/* Gold electrode pattern */}
                  <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#d97706" />
                    <stop offset="50%" stopColor="#fbbf24" />
                    <stop offset="100%" stopColor="#b45309" />
                  </linearGradient>
                </defs>

                <rect width="800" height="450" fill="url(#grid)" />

                {/* Layer 1: Mold Outer Frame / Shell */}
                {activeLayers.moldShell && (
                  <g id="mold-shell">
                    {/* Mold perimeter */}
                    <rect
                      x="100"
                      y="40"
                      width="600"
                      height="370"
                      rx="16"
                      fill="#0f172a"
                      fillOpacity="0.85"
                      stroke="#334155"
                      strokeWidth="2"
                    />
                    {/* Growth chamber cavity */}
                    <path
                      d="M 220 80 C 350 70, 450 70, 580 80 C 660 140, 680 260, 580 340 C 460 380, 340 380, 220 340 C 140 260, 160 140, 220 80 Z"
                      fill="#030712"
                      stroke="#1e293b"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                    />
                    {/* Mold port inlet */}
                    <rect x="360" y="380" width="80" height="40" fill="#1e293b" rx="4" />
                    <text x="400" y="405" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="monospace">
                      SEED INLET PORT
                    </text>
                  </g>
                )}

                {/* Layer 3: Capillary Microfluidic Channels */}
                {activeLayers.capillaryWicks && (
                  <g id="capillary-channels">
                    <path
                      d="M 380 400 L 380 300 Q 300 240 250 180"
                      fill="none"
                      stroke="#0284c7"
                      strokeWidth="3"
                      strokeDasharray="6 3"
                    />
                    <path
                      d="M 420 400 L 420 300 Q 500 240 550 180"
                      fill="none"
                      stroke="#0284c7"
                      strokeWidth="3"
                      strokeDasharray="6 3"
                    />
                    <circle cx="250" cy="180" r="6" fill="#0284c7" fillOpacity="0.5" />
                    <circle cx="550" cy="180" r="6" fill="#0284c7" fillOpacity="0.5" />
                    <text x="210" y="160" fill="#38bdf8" fontSize="10" fontFamily="monospace">
                      CAPILLARY WICK L-1
                    </text>
                    <text x="590" y="160" fill="#38bdf8" fontSize="10" fontFamily="monospace">
                      CAPILLARY WICK R-1
                    </text>
                  </g>
                )}

                {/* Layer 2: Embedded Gold Electrodes */}
                {activeLayers.goldElectrodes && (
                  <g id="gold-electrodes">
                    {/* Left electrode array */}
                    <g transform="translate(180, 160)">
                      <rect x="0" y="0" width="8" height="120" fill="url(#goldGradient)" />
                      <line x1="8" y1="20" x2="40" y2="20" stroke="url(#goldGradient)" strokeWidth="3" />
                      <line x1="8" y1="50" x2="50" y2="50" stroke="url(#goldGradient)" strokeWidth="3" />
                      <line x1="8" y1="80" x2="45" y2="80" stroke="url(#goldGradient)" strokeWidth="3" />
                      <line x1="8" y1="105" x2="35" y2="105" stroke="url(#goldGradient)" strokeWidth="3" />
                      <text x="-10" y="65" textAnchor="end" fill="#fbbf24" fontSize="10" fontFamily="monospace">
                        Au ARRAY 01
                      </text>
                    </g>

                    {/* Right electrode array */}
                    <g transform="translate(612, 160)">
                      <rect x="0" y="0" width="8" height="120" fill="url(#goldGradient)" />
                      <line x1="-32" y1="20" x2="0" y2="20" stroke="url(#goldGradient)" strokeWidth="3" />
                      <line x1="-42" y1="50" x2="0" y2="50" stroke="url(#goldGradient)" strokeWidth="3" />
                      <line x1="-37" y1="80" x2="0" y2="80" stroke="url(#goldGradient)" strokeWidth="3" />
                      <line x1="-28" y1="105" x2="0" y2="105" stroke="url(#goldGradient)" strokeWidth="3" />
                      <text x="20" y="65" textAnchor="start" fill="#fbbf24" fontSize="10" fontFamily="monospace">
                        Au ARRAY 02
                      </text>
                    </g>
                  </g>
                )}

                {/* Layer 4: Living Plant Leaf & Xylem Tissue */}
                {activeLayers.plantVascular && (
                  <g id="plant-tissue">
                    {/* Hypocotyl / stem growing in from bottom port */}
                    <path
                      d="M 395 390 L 395 300 Q 400 240 400 160"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth={selectedStageId === 1 ? '4' : selectedStageId === 2 ? '8' : '14'}
                      strokeLinecap="round"
                    />

                    {/* Leaf blade growing into the mold */}
                    {selectedStageId >= 2 && (
                      <path
                        d="M 400 300 C 260 280, 200 180, 300 120 C 370 80, 430 80, 500 120 C 600 180, 540 280, 400 300 Z"
                        fill="#064e3b"
                        fillOpacity={selectedStageId === 2 ? '0.6' : '0.9'}
                        stroke="#059669"
                        strokeWidth="2"
                      />
                    )}
                  </g>
                )}

                {/* Layer 5: Metallized Conductive Leaf Veins (Stage 3 & 4) */}
                {activeLayers.metalDeposition && selectedStageId >= 3 && (
                  <g id="metallic-veins">
                    {/* Primary Midrib Vein */}
                    <path
                      d="M 400 300 L 400 120"
                      fill="none"
                      stroke="url(#metallicVein)"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                    {/* Lateral secondary veins fusing with gold pins */}
                    <path
                      d="M 400 250 Q 320 230 220 210"
                      fill="none"
                      stroke="url(#metallicVein)"
                      strokeWidth="3.5"
                    />
                    <path
                      d="M 400 250 Q 480 230 580 210"
                      fill="none"
                      stroke="url(#metallicVein)"
                      strokeWidth="3.5"
                    />
                    <path
                      d="M 400 200 Q 330 180 220 180"
                      fill="none"
                      stroke="url(#metallicVein)"
                      strokeWidth="3.5"
                    />
                    <path
                      d="M 400 200 Q 470 180 580 180"
                      fill="none"
                      stroke="url(#metallicVein)"
                      strokeWidth="3.5"
                    />
                    <path
                      d="M 400 150 Q 350 140 228 150"
                      fill="none"
                      stroke="url(#metallicVein)"
                      strokeWidth="2.5"
                    />
                    <path
                      d="M 400 150 Q 450 140 572 150"
                      fill="none"
                      stroke="url(#metallicVein)"
                      strokeWidth="2.5"
                    />

                    {/* Sensor contact nodes glow */}
                    <circle cx="220" cy="210" r="5" fill="#34d399" />
                    <circle cx="580" cy="210" r="5" fill="#34d399" />
                    <circle cx="220" cy="180" r="5" fill="#34d399" />
                    <circle cx="580" cy="180" r="5" fill="#34d399" />
                    <circle cx="400" cy="120" r="6" fill="#38bdf8" />
                  </g>
                )}

                {/* Live Annotations */}
                <g id="annotations">
                  <rect x="120" y="60" width="160" height="24" rx="4" fill="#020617" stroke="#334155" />
                  <text x="130" y="76" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                    FUSION STATUS: {selectedStageId >= 3 ? 'ZERO INCISION SEAL' : 'IN-GROWTH PENDING'}
                  </text>
                </g>
              </svg>
            </div>

            {/* Readout Metrics */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-data">
              <div className="rounded border border-slate-800 bg-slate-950 p-2.5">
                <div className="text-[10px] text-slate-500">LEAF IMPEDANCE</div>
                <div className="text-emerald-400 font-semibold text-sm">
                  {selectedStageId === 1 ? '1.2 MΩ' : selectedStageId === 2 ? '42 kΩ' : selectedStageId === 3 ? '850 Ω' : '310 Ω'}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Gold pad contact</div>
              </div>

              <div className="rounded border border-slate-800 bg-slate-950 p-2.5">
                <div className="text-[10px] text-slate-500">PHYTOGALVANIC V_OC</div>
                <div className="text-cyan-400 font-semibold text-sm">
                  {selectedStageId === 1 ? '0.00 V' : selectedStageId === 2 ? '0.18 V' : selectedStageId === 3 ? '0.54 V' : '0.74 V'}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Living ionic sap</div>
              </div>

              <div className="rounded border border-slate-800 bg-slate-950 p-2.5">
                <div className="text-[10px] text-slate-500">METAL LOAD (DRY WT)</div>
                <div className="text-amber-400 font-semibold text-sm">
                  {selectedStageId === 1 ? '0.02%' : selectedStageId === 2 ? '1.2%' : selectedStageId === 3 ? '18.4%' : '25.7% (Live)'}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Vacuolar citrate complex</div>
              </div>

              <div className="rounded border border-slate-800 bg-slate-950 p-2.5">
                <div className="text-[10px] text-slate-500">CALLOSE SCARRING</div>
                <div className="text-emerald-400 font-semibold text-sm">
                  0.0% (Zero Wounds)
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Grown-in biological bond</div>
              </div>
            </div>
          </div>

          {/* Step-by-Step Bio-Mold Casting Protocol Runner */}
          <div className="rounded border border-slate-800 bg-slate-900/60 p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-emerald-400" />
                <h2 className="font-display text-sm font-semibold text-slate-100">
                  Cleanroom Bio-Mold Protocol Runner
                </h2>
              </div>
              <div className="text-xs font-data text-slate-400">
                PROGRESS: {completedSteps.length} / 5 COMPLETED
              </div>
            </div>

            <div className="space-y-3">
              {protocolSteps.map(step => (
                <div
                  key={step.num}
                  className={`rounded border p-3.5 transition-colors ${
                    activeProtocolStep === step.num
                      ? 'border-emerald-500/60 bg-emerald-950/20'
                      : completedSteps.includes(step.num)
                      ? 'border-slate-800/80 bg-slate-950/40 opacity-80'
                      : 'border-slate-800/50 bg-slate-950/20 opacity-50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          completedSteps.includes(step.num)
                            ? 'bg-emerald-500 text-slate-950'
                            : 'border border-slate-600 text-slate-300'
                        }`}
                      >
                        {completedSteps.includes(step.num) ? '✓' : step.num}
                      </span>
                      <span className="text-xs font-semibold text-slate-200">
                        {step.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] font-data text-slate-400">
                      <span>{step.duration}</span>
                      <button
                        onClick={() => handleStepComplete(step.num)}
                        className={`rounded px-2 py-0.5 text-[10px] font-medium transition-colors cursor-pointer ${
                          completedSteps.includes(step.num)
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : 'bg-slate-800 text-slate-300 hover:bg-emerald-500 hover:text-slate-950'
                        }`}
                      >
                        {completedSteps.includes(step.num) ? 'Verified' : 'Verify Step'}
                      </button>
                    </div>
                  </div>

                  <p className="mt-2 text-xs text-slate-300 leading-relaxed pl-7">
                    {step.specs}
                  </p>

                  <div className="mt-2.5 pl-7 flex items-center gap-2 text-[11px] font-data text-emerald-400">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>CHECKPOINT: {step.checkpoint}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
