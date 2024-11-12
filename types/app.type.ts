export interface AppTrack {
  // id: string;
  // order: number;
  // name: string;
  // image: string;
  // mau: number;
  // dayUpdate: number;
  // totalSub: number;
  // daySub: number;
  // fdv: number;
  // description?: string;
  // totalCost?: number;
  id?: string;
  change: number;
  rank: number;
  rankChange: number;
  updated: boolean;
  username: string;
  users: number;
}

export interface AppDetail {
  id?: string;
  Order?: number;
  Name: string;
  Logo: string;
  Bot: AppTrack;
  Channel: AppTrack;
  FDV: number;
  Price: number;
}

export interface AppWatch {
  id: string;
  Bot: AppTrack;
  Channel: AppTrack;
  FDV: number;
  Price: number;
  Order: number;
  Logo: string;
  Name: string;
}

export interface Stats {
  mau_change: number;
  gainers: number;
  losers: number;
}

export interface AppHistory {
  Bot: Record<string, number>;
  Channel: Record<string, number>;
}
