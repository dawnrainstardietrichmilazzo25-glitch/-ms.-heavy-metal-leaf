import React, { useState } from 'react';
import {
  Sprout,
  DollarSign,
  TrendingDown,
  Clock,
  ShieldCheck,
  MapPin,
  Leaf,
  Layers,
  Zap
} from 'lucide-react';

interface SitePreset {
  id: string;
  name: string;
  location: string;
  metal: string;
  initialPpm: number;
  marketPricePerKg: number; // USD per kg of battery-grade metal
  typicalHectares: number;
  bioBotSpec: string;
}

const PRESET_SITES: SitePreset[] = [
  {
    id: 'sudbury',
    name: 'Sudbury Smelter Tailings Basin',
    location: 'Ontario, Canada',
    metal: 'Nickel (Ni)',
    initialPpm: 4800,
    marketPricePerKg: 18.5,
    typicalHectares: 12,
    bioBotSpec: 'Ms. Leaf / Berkheya coddii chassis'
  },
  {
    id: 'katanga',
    name: 'Katanga Copper-Cobalt Tailings',
    location: 'Kolwezi, DR Congo',
    metal: 'Copper (Cu) & Cobalt (Co)',
    initialPpm: 3400,
    marketPricePerKg: 28.0,
    typicalHectares: 25,
    bioBotSpec: 'Ms. Leaf / Haumaniastrum chassis'
  },
  {
    id: 'silesia',
    name: 'Upper Silesian Zinc-Cadmium Slag',
    location: 'Katowice, Poland',
    metal: 'Zinc (Zn) & Cadmium (Cd)',
    initialPpm: 5200,
    marketPricePerKg: 12.0,
    typicalHectares: 8,
    bioBotSpec: 'Ms. Leaf / Noccaea chassis'
  },
  {
    id: 'montana',
    name: 'Silver Bow Creek Superfund Slag',
    location: 'Butte, Montana, USA',
    metal: 'Arsenic (As) & Copper (Cu)',
    initialPpm: 2900,
    marketPricePerKg: 15.0,
    typicalHectares: 15,
    bioBotSpec: 'Ms. Leaf / Pteris vittata chassis'
  }
];

export const RemediationCalculator: React.FC = () => {
  const [selectedSiteId, setSelectedSiteId] = useState<string>('sudbury');
  const [hectares, setHectares] = useState<number>(10);
  const [soilPpm, setSoilPpm] = useState<number>(4500);
  const [bioBotDensity, setBioBotDensity] = useState<number>(20); // bio-bots per m²
  const [seasons, setSeasons] = useState<number>(3); // 1 to 6 growing seasons

  const activePreset = PRESET_SITES.find(s => s.id === selectedSiteId) || PRESET_SITES[0];

  const handleApplyPreset = (preset: SitePreset) => {
    setSelectedSiteId(preset.id);
    setSoilPpm(preset.initialPpm);
    setHectares(preset.typicalHectares);
  };

  // Environmental Physics & Phytoremediation Kinetics Calculations
  // Total area in m²: hectares * 10,000
  const areaM2 = hectares * 10000;
  const totalBioBots = areaM2 * bioBotDensity;

  // Assuming active root rhizosphere depth of 30 cm, soil density = 1.3 tonnes/m³
  // Topsoil mass per hectare = 10,000 m² * 0.3 m * 1.3 t/m³ = 3,900 tonnes
  const totalTopsoilTonnes = hectares * 3900;

  // Metal uptake per bio-bot per season:
  // An average mature hyperaccumulator bio-bot yields ~18g dry biomass at 2.5% to 15% metal = ~1.2g pure metal/unit/season
  const metalExtractedPerUnitSeasonKg = 0.0014;
  const totalMetalExtractedKg = Math.round(totalBioBots * metalExtractedPerUnitSeasonKg * seasons);
  const totalMetalExtractedTonnes = (totalMetalExtractedKg / 1000).toFixed(2);

  // PPM reduction calculation:
  // Metal removed (kg) / Topsoil mass (tonnes) = PPM reduction
  const ppmReduced = Math.min(soilPpm, Math.round((totalMetalExtractedKg / totalTopsoilTonnes) * 1000));
  const finalSoilPpm = Math.max(80, soilPpm - ppmReduced);

  // Economic Value of Bio-Ore (Phytomining)
  const grossBioOreValueUSD = Math.round(totalMetalExtractedKg * activePreset.marketPricePerKg);

  // Avoided excavation costs (standard mechanical strip washing costs ~$38,000 / hectare)
  const conventionalExcavationCost = hectares * 38000;
  const netSavingsUSD = Math.max(0, conventionalExcavationCost + grossBioOreValueUSD);

  // Avoided CO2 emissions vs heavy diesel excavators (~18 tonnes CO2 / hectare remediated)
  const avoidedCO2Tonnes = Math.round(hectares * 18.4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      {/* Top Banner */}
      <div className="mb-6 flex flex-wrap items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="font-display text-xl font-bold tracking-tight text-slate-100 uppercase">
            Toxic Land Phytoremediation & Phytomining Engine
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Model real-world decontamination of toxic industrial soils, mine tailings, and Superfund sites using autonomous Ms. Heavy Metal Leaf cyborg bio-bot arrays.
          </p>
        </div>
        <div className="mt-2 sm:mt-0 flex items-center gap-2 text-xs font-data text-slate-400">
          <span className="text-emerald-400">CIRCULAR BIO-ECONOMY MODEL</span>
          <span className="text-slate-600">/</span>
          <span>ZERO SOIL DIGGING</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column: Interactive Parameters & Presets */}
        <div className="lg:col-span-5 space-y-6">
          {/* Site Presets */}
          <div className="rounded border border-slate-800 bg-slate-900/60 p-4">
            <div className="mb-2 text-xs font-semibold tracking-wider text-slate-400 uppercase">
              Field Site Case Study Presets
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {PRESET_SITES.map(preset => (
                <button
                  key={preset.id}
                  onClick={() => handleApplyPreset(preset)}
                  className={`rounded border p-2.5 text-left text-xs transition-colors cursor-pointer ${
                    selectedSiteId === preset.id
                      ? 'border-emerald-500 bg-emerald-950/30'
                      : 'border-slate-800 bg-slate-950 hover:bg-slate-800/40 text-slate-400'
                  }`}
                >
                  <div className="font-semibold text-slate-200 truncate">
                    {preset.name}
                  </div>
                  <div className="mt-1 flex items-center gap-1 text-[11px] text-slate-400">
                    <MapPin className="h-3 w-3 text-emerald-400 shrink-0" />
                    <span className="truncate">{preset.location}</span>
                  </div>
                  <div className="mt-1.5 font-data text-[10px] text-emerald-400">
                    {preset.metal} · {preset.initialPpm} PPM
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Sliders Console */}
          <div className="rounded border border-slate-800 bg-slate-900/60 p-4 space-y-4">
            {/* Hectares Slider */}
            <div>
              <div className="flex justify-between text-xs font-data">
                <span className="text-slate-400 font-semibold uppercase">Contaminated Land Area</span>
                <span className="text-emerald-400 font-bold">{hectares} Hectares</span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                value={hectares}
                onChange={e => setHectares(Number(e.target.value))}
                className="mt-2 w-full accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-data">
                <span>1 ha (Pilot site)</span>
                <span>25 ha</span>
                <span>50 ha (Mega tailing)</span>
              </div>
            </div>

            {/* Initial PPM Slider */}
            <div>
              <div className="flex justify-between text-xs font-data">
                <span className="text-slate-400 font-semibold uppercase">Initial Soil Contamination</span>
                <span className="text-cyan-400 font-bold">{soilPpm} PPM</span>
              </div>
              <input
                type="range"
                min="500"
                max="10000"
                step="100"
                value={soilPpm}
                onChange={e => setSoilPpm(Number(e.target.value))}
                className="mt-2 w-full accent-cyan-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-data">
                <span>500 ppm (Moderate)</span>
                <span>4,000 ppm (Heavy slag)</span>
                <span>10,000 ppm (Toxic waste)</span>
              </div>
            </div>

            {/* Bio-Bot Density */}
            <div>
              <div className="flex justify-between text-xs font-data">
                <span className="text-slate-400 font-semibold uppercase">Ms. Leaf Density</span>
                <span className="text-amber-400 font-bold">{bioBotDensity} Bio-Bots / m²</span>
              </div>
              <input
                type="range"
                min="5"
                max="40"
                value={bioBotDensity}
                onChange={e => setBioBotDensity(Number(e.target.value))}
                className="mt-2 w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-data">
                <span>5 / m² (Sparse canopy)</span>
                <span>20 / m² (Standard swarm)</span>
                <span>40 / m² (High density)</span>
              </div>
            </div>

            {/* Growing Seasons */}
            <div>
              <div className="flex justify-between text-xs font-data">
                <span className="text-slate-400 font-semibold uppercase">Phytoremediation Cycles</span>
                <span className="text-emerald-400 font-bold">{seasons} Growing Seasons</span>
              </div>
              <input
                type="range"
                min="1"
                max="6"
                value={seasons}
                onChange={e => setSeasons(Number(e.target.value))}
                className="mt-2 w-full accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-data">
                <span>1 Season (60 days)</span>
                <span>3 Seasons (~1.5 yrs)</span>
                <span>6 Seasons (Long term)</span>
              </div>
            </div>
          </div>

          {/* Bio-Bot Swarm Scale Readout */}
          <div className="rounded border border-slate-800 bg-slate-950 p-4 font-data text-xs space-y-2">
            <div className="text-[10px] text-slate-500 uppercase">Swarm Scale & Telemetry</div>
            <div className="flex justify-between text-slate-300">
              <span>Total Deployed Cyborg Bio-Bots:</span>
              <span className="text-emerald-400 font-semibold">{totalBioBots.toLocaleString()} units</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Active Rhizosphere Topsoil:</span>
              <span className="text-slate-200">{totalTopsoilTonnes.toLocaleString()} metric tons</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Grown Bio-Sensors Active:</span>
              <span className="text-cyan-400 font-semibold">{(totalBioBots * 4).toLocaleString()} electrode channels</span>
            </div>
          </div>
        </div>

        {/* Right Column: Remediation Results & Phytomining Economics */}
        <div className="lg:col-span-7 space-y-6">
          {/* Key Output Metrics Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-data">
            <div className="rounded border border-slate-800 bg-slate-900/60 p-4">
              <div className="text-[10px] text-slate-500 uppercase">Metal Extracted from Soil</div>
              <div className="text-xl font-bold text-emerald-400 mt-1">
                {totalMetalExtractedTonnes} <span className="text-xs font-normal text-slate-400">Metric Tons</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-1">
                {totalMetalExtractedKg.toLocaleString()} kg battery-grade {activePreset.metal.split(' ')[0]}
              </div>
            </div>

            <div className="rounded border border-slate-800 bg-slate-900/60 p-4">
              <div className="text-[10px] text-slate-500 uppercase">Final Soil Toxicity</div>
              <div className="text-xl font-bold text-cyan-400 mt-1">
                {finalSoilPpm} <span className="text-xs font-normal text-slate-400">PPM</span>
              </div>
              <div className="text-[10px] text-emerald-400 mt-1">
                - {ppmReduced} PPM reduction ({Math.round((ppmReduced / soilPpm) * 100)}% cleansed)
              </div>
            </div>

            <div className="rounded border border-slate-800 bg-slate-900/60 p-4">
              <div className="text-[10px] text-slate-500 uppercase">Phytomining Bio-Ore Value</div>
              <div className="text-xl font-bold text-amber-400 mt-1">
                ${grossBioOreValueUSD.toLocaleString()}
              </div>
              <div className="text-[10px] text-slate-400 mt-1">
                @ ${activePreset.marketPricePerKg}/kg London Metal Ex.
              </div>
            </div>
          </div>

          {/* Environmental Field Impact Dossier */}
          <div className="rounded border border-slate-800 bg-slate-900/60 p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-data text-emerald-400 uppercase font-bold">
                  ECOLOGICAL & INDUSTRIAL IMPACT PROJECTION
                </span>
                <h2 className="font-display text-base font-semibold text-slate-100">
                  Phytoremediation vs Conventional Strip-Mining & Excavation
                </h2>
              </div>
              <div className="text-xs font-data text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4" />
                <span>CLEAN ECO-ROBOTICS</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="rounded border border-emerald-500/30 bg-emerald-950/20 p-4">
                <div className="font-semibold text-emerald-300 flex items-center gap-1.5">
                  <Sprout className="h-4 w-4" />
                  <span>Ms. Heavy Metal Leaf Bio-Bot Approach</span>
                </div>
                <ul className="mt-2.5 space-y-1.5 text-slate-300">
                  <li>• Zero destruction of topsoil microorganisms.</li>
                  <li>• Eliminates need for chemical acid leaching.</li>
                  <li>• Living leaves continuously monitor soil toxicity and transmit data wirelessly via grown-in LoRa nodes.</li>
                  <li>• Harvested biomass is processed into high-purity nickel sulfate for EV battery cathodes.</li>
                  <li>• Avoids <strong className="text-emerald-400">{avoidedCO2Tonnes} tonnes of CO₂</strong> emissions.</li>
                </ul>
              </div>

              <div className="rounded border border-slate-800 bg-slate-950 p-4">
                <div className="font-semibold text-slate-400 flex items-center gap-1.5">
                  <TrendingDown className="h-4 w-4 text-rose-400" />
                  <span>Conventional Mechanical Excavation</span>
                </div>
                <ul className="mt-2.5 space-y-1.5 text-slate-400">
                  <li>• Heavy diesel earthmovers strip top 1m of soil.</li>
                  <li>• Estimated cost: <strong className="text-rose-300">${conventionalExcavationCost.toLocaleString()}</strong> for this site.</li>
                  <li>• Hazardous contaminated dust clouds blow into surrounding communities during digging.</li>
                  <li>• Contaminated soil dumped into lined landfills without metal recovery.</li>
                  <li>• Total loss of local biome and biodiversity.</li>
                </ul>
              </div>
            </div>

            {/* Total Economic Benefit Card */}
            <div className="rounded border border-slate-800 bg-slate-950 p-4 font-data text-xs flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-[10px] text-slate-500 uppercase">TOTAL ESTIMATED VALUE GENERATED</div>
                <div className="text-lg font-bold text-emerald-400">
                  ${netSavingsUSD.toLocaleString()} USD
                </div>
                <div className="text-[11px] text-slate-400">
                  (Avoided Excavation Costs + Recovered Bio-Ore Market Value)
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-slate-500 uppercase">SAFE RE-ENTRY TIMELINE</div>
                <div className="text-lg font-bold text-cyan-400">
                  {finalSoilPpm <= 400 ? 'Achieved in Season ' + seasons : `${Math.ceil(soilPpm / (ppmReduced / seasons))} Seasons Estimated`}
                </div>
                <div className="text-[11px] text-slate-400">
                  Target threshold &lt; 400 PPM
                </div>
              </div>
            </div>
          </div>

          {/* Field Deployment Site Photographic Asset */}
          <div className="rounded border border-slate-800 bg-slate-900/60 overflow-hidden">
            <div className="relative aspect-[16/9] w-full bg-slate-950">
              <img
                src="/src/assets/images/toxic_soil_field_site_1790557814682.jpg"
                alt="Environmental phytoremediation field site on former industrial copper nickel mine tailings"
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] font-data text-emerald-400">
                <span>FIELD TELEMETRY SITE // SECTOR DELTA</span>
                <span>METALLOPHYTE VEGETATIVE CANOPY</span>
              </div>
            </div>
            <div className="p-3 text-xs text-slate-300">
              Field validation on copper-nickel mine tailings. Bio-bots withstand extreme metallic salinity while purifying the rhizosphere and signaling sub-surface toxin plumes to solar relay stations.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
