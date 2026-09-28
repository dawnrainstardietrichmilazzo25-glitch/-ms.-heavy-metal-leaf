import { ResearchChannel, ResearchMessage } from '../types';

export const RESEARCH_CHANNELS: ResearchChannel[] = [
  {
    id: 'mold-ingrowth-mechanics',
    name: 'mold-ingrowth-mechanics',
    topic: 'Micro-mold microfluidics, pre-set sensors, and zero-incision plant root & leaf integration',
    unreadCount: 0,
    category: 'core'
  },
  {
    id: 'the-80-percent-metal-limit',
    name: 'the-80-percent-metal-limit',
    topic: 'Can a plant reach 80% metal content and stay alive? Vacuolar limits vs engineered apoplastic metal matrices',
    unreadCount: 0,
    category: 'biotech'
  },
  {
    id: 'toxic-land-remediation',
    name: 'toxic-land-remediation',
    topic: 'Field deployment on mine tailings, brownfields, and Superfund sites across North America & Global South',
    unreadCount: 0,
    category: 'field'
  },
  {
    id: 'biorobotic-circuits',
    name: 'biorobotic-circuits',
    topic: 'Phytogalvanic power, living leaf antennas, impedance telemetry, and stomatal hydraulic actuators',
    unreadCount: 0,
    category: 'core'
  },
  {
    id: 'phytomining-yields',
    name: 'phytomining-yields',
    topic: 'Extracting high-purity battery-grade nickel, cobalt, and copper from living bio-ores sustainably',
    unreadCount: 0,
    category: 'biotech'
  }
];

export const INITIAL_RESEARCH_MESSAGES: Record<string, ResearchMessage[]> = {
  'mold-ingrowth-mechanics': [
    {
      id: 'msg-1',
      channelId: 'mold-ingrowth-mechanics',
      author: {
        name: 'Koji Murata',
        role: 'Micro-Mold & Materials Engineer',
        avatarColor: 'bg-emerald-500/20 text-emerald-300'
      },
      timestamp: 'Today at 09:15',
      content: `The breakthrough with Ms. Heavy Metal Leaf is that we DO NOT drill, pierce, or surgically insert probes into grown plants. Surgical wounds trigger rapid callose formation, subicular suberin deposition, and fungal infection.\n\nInstead, we cast the mold first in optical PDMS with sputtered gold interdigitated electrode arrays and carbon nanotube cap wicks. Then we germinate the hyperaccumulator seed directly at the mold inlet. As the leaf expands, its epidermal cells lock directly into the microscopic electrode ridges!`,
      tags: ['Zero-Installation', 'PDMS Mold', 'Interdigitated Electrodes'],
      pinned: true
    },
    {
      id: 'msg-2',
      channelId: 'mold-ingrowth-mechanics',
      author: {
        name: 'Elena Rostova',
        role: 'Plant Electrophysiologist',
        avatarColor: 'bg-cyan-500/20 text-cyan-300'
      },
      timestamp: 'Today at 09:42',
      content: `Our recent trial with *Noccaea caerulescens* seedlings confirmed that applying a gentle +25 mV bias across the mold pins creates guided electrotaxis. The root pericycle and young hypocotyl grow directly along the gold micro-busbars. When the plant draws up soil minerals, the leaf tissue achieves an impedance under 850 Ohms — unprecedented for a living plant-circuit interface.`,
      tags: ['Electrotaxis', 'Bio-Impedance', 'Zero-Incision']
    }
  ],
  'the-80-percent-metal-limit': [
    {
      id: 'msg-3',
      channelId: 'the-80-percent-metal-limit',
      author: {
        name: 'Dr. Aris Thorne',
        role: 'Lead Nanobionics & AI Co-Scientist',
        avatarColor: 'bg-indigo-500/20 text-indigo-300',
        isAi: true
      },
      timestamp: 'Today at 08:30',
      content: `Let us address the fundamental question: *Can Ms. Leaf be 80% metal and still be a living plant?*\n\nIn pristine nature, the highest known hyperaccumulator is *Pycnandra acuminata*, whose blue-green latex contains 25.7% nickel by dry weight complexed with citrate in laticifer vacuoles.\n\nTo reach **80% metal content** while preserving metabolic vitality, we must divide the leaf into two concentric biophysical compartments:\n1. **Living Symplastic Engine (Core 20%):** Vacuolar tonoplasts hold chelated Ni/Cd/Zn at physiological equilibrium, allowing chloroplasts to generate ATP and stomata to breathe.\n2. **Engineered Extracellular Matrix (Outer 60%):** The plant's transpiration stream is directed through mold micro-perforations to the cell wall apoplast, where metal ions nucleate onto lignin scaffolds, forming a high-conductivity metallic exoskeleton!\n\nThis solves both goals: the plant remains alive and growing, yet 80% of its dry mass is conductive, extractable metal!`,
      tags: ['80% Feasibility', 'Vacuolar Limits', 'Apoplastic Metallization'],
      pinned: true
    },
    {
      id: 'msg-4',
      channelId: 'the-80-percent-metal-limit',
      author: {
        name: 'Dr. Althea Chen',
        role: 'Ecological Phytoremediation Specialist',
        avatarColor: 'bg-amber-500/20 text-amber-300'
      },
      timestamp: 'Today at 10:05',
      content: `Precisely, Aris. At 80% total metal dry weight, the electrical percolation threshold is completely satisfied. The leaf no longer behaves as an insulator — it functions as a flexible bio-metallic radio antenna and galvanic battery electrode!`,
      tags: ['Percolation Threshold', 'Bio-Antenna']
    }
  ],
  'toxic-land-remediation': [
    {
      id: 'msg-5',
      channelId: 'toxic-land-remediation',
      author: {
        name: 'Dr. Althea Chen',
        role: 'Ecological Phytoremediation Specialist',
        avatarColor: 'bg-amber-500/20 text-amber-300'
      },
      timestamp: 'Today at 11:12',
      content: `We tested soil remediation modeling on copper-nickel mine tailings in Sudbury and Katanga. A conventional mechanical excavation and chemical washing process costs $450,000 per hectare and destroys the topsoil ecosystem.\n\nDeploying an autonomous swarm of 2,500 Ms. Heavy Metal Leaf bio-bots per hectare not only extracts ~380 kg of toxic nickel and 85 kg of cadmium over three growing cycles, but the bio-bots monitor real-time soil toxin gradients autonomously via their grown-in LoRa nodes!`,
      tags: ['Superfund Remediation', 'Mine Tailings', 'Eco-Robotics'],
      pinned: true
    }
  ],
  'biorobotic-circuits': [
    {
      id: 'msg-6',
      channelId: 'biorobotic-circuits',
      author: {
        name: 'Elena Rostova',
        role: 'Plant Electrophysiologist',
        avatarColor: 'bg-cyan-500/20 text-cyan-300'
      },
      timestamp: 'Today at 13:20',
      content: `Here is the electrical diagram of the bio-bot: the living nickel-rich leaf acts as the cathode, while a zinc-doped carbon root wick acts as the anode. The transpiration stream circulates ionic sap, generating an open-circuit potential of 0.72V per leaf — enough to trickle-charge a micro-supercapacitor embedded in the mold!\n\nZero lithium batteries, zero e-waste left in the toxic soil!`,
      tags: ['Phytogalvanic', 'Zero-E-Waste', 'Self-Powered']
    }
  ],
  'phytomining-yields': [
    {
      id: 'msg-7',
      channelId: 'phytomining-yields',
      author: {
        name: 'Koji Murata',
        role: 'Micro-Mold & Materials Engineer',
        avatarColor: 'bg-emerald-500/20 text-emerald-300'
      },
      timestamp: 'Today at 14:05',
      content: `When Ms. Leaf finishes her phytoremediation cycle, the mature leaves are harvested. Because the bio-bot plant already concentrated nickel to >20% (and up to 80% in our apoplastic matrix), simple low-temperature calcination yields an ash that is over 40% elemental nickel. That is higher grade than raw ores mined in Norilsk or Western Australia!`,
      tags: ['Bio-Ore', 'Battery Grade Nickel', 'Circular Economy']
    }
  ]
};
