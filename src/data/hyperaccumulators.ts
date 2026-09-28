import { PlantSpecies } from '../types';

export const HYPERACCUMULATOR_SPECIES: PlantSpecies[] = [
  {
    id: 'pycnandra-acuminata',
    scientificName: 'Pycnandra acuminata',
    commonName: 'Blue-Sap Nickel Tree',
    primaryMetal: 'Nickel (Ni)',
    secondaryMetals: ['Cobalt', 'Zinc'],
    maxAccumulation: '257,000 mg/kg (25.7% dry weight)',
    dryWeightPercentage: 25.7,
    mechanism: 'Vacuolar compartmentalization where nickel ions are bound to organic citrate chelators in a vibrant blue-green latex sap.',
    nativeRegion: 'New Caledonia (Ultramafic serpentine soils)',
    biotechAdvantage: 'Highest known natural metal concentration in plant kingdom; latex acts as a natural conductive liquid electrolyte for bio-batteries.',
    bioroboticsRole: 'Primary organic fluid for living galvanic power channels and flexible leaf pressure sensors.'
  },
  {
    id: 'noccaea-caerulescens',
    scientificName: 'Noccaea caerulescens',
    commonName: 'Alpine Pennycress',
    primaryMetal: 'Zinc (Zn)',
    secondaryMetals: ['Cadmium (Cd)', 'Nickel (Ni)'],
    maxAccumulation: '43,700 mg/kg Zn / 3,000 mg/kg Cd',
    dryWeightPercentage: 4.4,
    mechanism: 'HMA4 (heavy metal P1B-ATPase) pump overexpression in root pericycle driving rapid xylem loading to shoots.',
    nativeRegion: 'Central & Western Europe (Calamine and serpentine soils)',
    biotechAdvantage: 'High growth rate; rapid seedling germination makes it ideal for mold micro-channel guidance and cadmiferous soil cleansing.',
    bioroboticsRole: 'Rapid prototyping model for initial mold conformation and early-stage root-electrode entanglement.'
  },
  {
    id: 'berkheya-coddii',
    scientificName: 'Berkheya coddii',
    commonName: 'Large Serpentinite Thistle',
    primaryMetal: 'Nickel (Ni)',
    secondaryMetals: ['Cobalt'],
    maxAccumulation: '36,000 mg/kg Ni',
    dryWeightPercentage: 3.6,
    mechanism: 'High-biomass accumulation; nickel is partitioned into epidermal trichomes and leaf mesophyll cell walls.',
    nativeRegion: 'Mpumalanga, South Africa',
    biotechAdvantage: 'Generates up to 18–22 metric tons of biomass per hectare; commercial phytomining standard yielding battery-grade nickel.',
    bioroboticsRole: 'High-power structural bio-actuator with thick lignified leaves suited for mechanical stomatal gripping.'
  },
  {
    id: 'pteris-vittata',
    scientificName: 'Pteris vittata',
    commonName: 'Ladder Brake Fern',
    primaryMetal: 'Arsenic (As)',
    secondaryMetals: ['Antimony', 'Phosphorus'],
    maxAccumulation: '22,600 mg/kg As',
    dryWeightPercentage: 2.3,
    mechanism: 'Reduces arsenate As(V) to toxic arsenite As(III) via ACR2 reductase, then pumps it into leaf vacuoles using ACR3 transporters.',
    nativeRegion: 'Southeastern Asia & Southern Europe',
    biotechAdvantage: 'Perennial fern with rapid frond turnover; exceptional resilience against extreme metalliferous soil poisoning.',
    bioroboticsRole: 'Bio-semiconductor trace generator; arsenic gradients create directional voltage differentials under light stimuli.'
  },
  {
    id: 'haumaniastrum-robertii',
    scientificName: 'Haumaniastrum robertii',
    commonName: 'Katanga Copper Flower',
    primaryMetal: 'Copper (Cu)',
    secondaryMetals: ['Cobalt (Co)'],
    maxAccumulation: '10,200 mg/kg Cu / 2,100 mg/kg Co',
    dryWeightPercentage: 1.0,
    mechanism: 'Accumulates copper directly in leaf tissues and flowers over mineralized copper outcrops without phytotoxic collapse.',
    nativeRegion: 'Katanga Copper Belt, Democratic Republic of Congo',
    biotechAdvantage: 'Direct bio-extraction of copper and cobalt — two critical transition metals for wiring and lithium-ion battery cathodes.',
    bioroboticsRole: 'Living conductive busbar traces; copper leaf veins provide low-resistance electrical interconnects inside the mold.'
  },
  {
    id: 'alyssum-bertolonii',
    scientificName: 'Odontarrhena bertolonii (Alyssum)',
    commonName: 'Tuscan Nickel Alyssum',
    primaryMetal: 'Nickel (Ni)',
    secondaryMetals: ['Magnesium'],
    maxAccumulation: '13,400 mg/kg Ni',
    dryWeightPercentage: 1.34,
    mechanism: 'Hyperaccumulation facilitated by histidine-nickel complexation in xylem sap, neutralizing toxic free radicals.',
    nativeRegion: 'Tuscany, Italy (Ophiolitic outcrops)',
    biotechAdvantage: 'High drought and alkaline tolerance; resilient for arid mine tailings remediation.',
    bioroboticsRole: 'Stomatal hydro-actuators that modulate leaf aperture in response to atmospheric humidity.'
  },
  {
    id: 'astragalus-bisulcatus',
    scientificName: 'Astragalus bisulcatus',
    commonName: 'Two-Grooved Milk Vetch',
    primaryMetal: 'Selenium (Se)',
    secondaryMetals: ['Molybdenum'],
    maxAccumulation: '10,000 mg/kg Se',
    dryWeightPercentage: 1.0,
    mechanism: 'Converts toxic selenocysteine into non-protein methylselenocysteine, avoiding disruption of cellular translation.',
    nativeRegion: 'Great Plains, North America',
    biotechAdvantage: 'Concentrates selenium, a key metallurgical and photovoltaic dopant element.',
    bioroboticsRole: 'Photovoltaic leaf junction dopant; boosts quantum efficiency of living leaf light sensors.'
  }
];

export const MOLD_GROWTH_STAGES = [
  {
    id: 1,
    phase: 'Phase 01',
    days: 'Day 0 – 3',
    title: 'Micro-Mold Preparation & Seed Priming',
    description: 'The silicone elastomer (PDMS) growth mold is pre-fabricated with capillary micro-channels, embedded gold interdigitated electrode pads (thickness: 150 nm), and capacitive carbon nanotube wicks. No electrical components need to be inserted post-growth.',
    plantState: 'Imbibition of hyperaccumulator seed (*Pycnandra* / *Noccaea*) in chelated nutrient gel.',
    moldState: 'Mold cavity open, capillary hydration channels primed with EDTA-free nickel/iron solution.',
    conductivity: '0.04 mS/cm (Passive buffer)',
    metalConcentration: '0.02% (Pre-germination)',
    keyChallenge: 'Preventing microbial fouling inside the sealed microfluidic mold before root colonization.'
  },
  {
    id: 2,
    phase: 'Phase 02',
    days: 'Day 4 – 14',
    title: 'Guided Thigmotropic Seedling In-Growth',
    description: 'The emergent radicle and hypocotyl navigate through micro-grooves inside the mold. Plant cells follow the mechanical guidance of the mold walls (thigmotropism) and electro-taxis towards micro-voltage biases (+25 mV) across embedded contact pins.',
    plantState: 'Cotyledons unfold within the optical mold window; root hairs interlace with porous carbon wicks.',
    moldState: 'Mold micro-clamps hold seedling crown securely without pinching vascular bundles.',
    conductivity: '1.2 mS/cm (Cell wall ionic exchange)',
    metalConcentration: '0.8% (Initial root uptake)',
    keyChallenge: 'Balancing mechanical stiffness of mold walls to guide stem expansion without inducing callus necrosis.'
  },
  {
    id: 3,
    phase: 'Phase 03',
    days: 'Day 15 – 35',
    title: 'Vascular Metallization & Sensor Fusion',
    description: 'As heavy metals (Ni/Cu/Zn) are drawn through xylem transpiration streams, metal-citrate complexes saturate leaf mesophyll. Secondary cell walls deposit cellulose and lignin directly onto the gold contact surfaces, forming an intimate, zero-incision biological seal.',
    plantState: 'Leaves turn rich iridescent blue-green as vacuolar nickel content surges past 15% dry weight.',
    moldState: 'Permanent bio-interface established: gold electrodes directly monitor leaf action potentials.',
    conductivity: '8.4 mS/cm (Conductive sap pathways)',
    metalConcentration: '18.4% – 25.0% dry weight',
    keyChallenge: 'Preventing metal ion crystallization in phloem sieve elements while maximizing electrical continuity.'
  },
  {
    id: 4,
    phase: 'Phase 04',
    days: 'Day 36+',
    title: 'Autonomous Cyborg Bio-Bot Operational',
    description: 'Ms. Heavy Metal Leaf is fully operational as a self-powered, living environmental bio-bot. The living leaf generates phytogalvanic voltages, monitors soil toxic metal gradients through sap impedance changes, and actuates stomatal vapor valves with zero e-waste.',
    plantState: 'Mature hyperaccumulating bio-cyborg; metabolically active, photosynthesizing, translocating toxic soil ions.',
    moldState: 'Mold functions as an external exoskeleton and signal routing backplane.',
    conductivity: '14.2 mS/cm (Optimal metallic bio-hybrid)',
    metalConcentration: '25.7% (Living) up to 75–80% (Engineered matrix)',
    keyChallenge: 'Managing leaf senescence and periodic bio-ore harvesting without degrading the mold exoskeleton.'
  }
];
