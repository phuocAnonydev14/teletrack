import spakle from '@/components/assets/home/sparkle.png';
import { AppTrackFeat } from '@/common/enums/app.enum';

export const homeMenu: { title: string; icon?: string; id: AppTrackFeat; href: string }[] = [
  { title: 'Top 100', icon: spakle.src, id: AppTrackFeat.TOP_50, href: '' },
  { title: 'Compare', id: AppTrackFeat.COMPARE, href: 'compare' },
  { title: 'Watchlist', id: AppTrackFeat.WATCHLIST, href: 'watchlist' },
  { title: 'Submit App', id: AppTrackFeat.SUBMIT, href: 'submit-app' },
];
