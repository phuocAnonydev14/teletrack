export interface AppTrack {
  id: string;
  order: number;
  name: string;
  image: string;
  mau: number;
  dayUpdate: number;
  totalSub: number;
  daySub: number;
  fdv: number;
  description?: string;
  totalCost?: number;
}
