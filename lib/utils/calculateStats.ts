import { Stats } from '@/types/app.type';

export function calculateStats(appList: { change: number; users: number }[]): Stats {
  let sumToday = 0;
  let sumYesterday = 0;
  let rise = 0;
  let decline = 0;
  let unchanged = 0;

  appList.forEach((app) => {
    if (app.change !== 0) {
      sumToday += app.users;
      sumYesterday += app.users + app.change;

      if (app.change > 0) {
        rise++;
      } else {
        decline++;
      }
    } else {
      unchanged++;
    }
  });
  const percentChange = (((sumToday - sumYesterday) / sumYesterday) * 100).toFixed(2);
  return {
    mau_change: +percentChange,
    gainers: rise,
    losers: decline,
  };
}
