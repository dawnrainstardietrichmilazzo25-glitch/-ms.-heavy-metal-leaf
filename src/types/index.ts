export interface PlantSpecies {
  id: string;
  scientificName: string;
  commonName: string;
  primaryMetal: string;
  secondaryMetals: string[];
  maxAccumulation: string;
  dryWeightPercentage: number;
  mechanism: string;
  nativeRegion: string;
  biotechAdvantage: string;
  bioroboticsRole: string;
}

export interface ResearchMessage {
  id: string;
  channelId: string;
  author: {
    name: string;
    role: string;
    avatarColor: string;
    isAi?: boolean;
  };
  timestamp: string;
  content: string;
  tags?: string[];
  pinned?: boolean;
}

export interface ResearchChannel {
  id: string;
  name: string;
  topic: string;
  unreadCount: number;
  category: 'core' | 'biotech' | 'field';
}

export interface GrowthStage {
  id: number;
  phase: string;
  days: string;
  title: string;
  description: string;
  plantState: string;
  moldState: string;
  conductivity: string;
  metalConcentration: string;
  keyChallenge: string;
}

export interface FieldSite {
  id: string;
  name: string;
  location: string;
  soilContaminationType: string;
  initialPpm: number;
  targetPpm: number;
  hectares: number;
  recommendedSpecies: string;
}
