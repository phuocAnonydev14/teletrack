import { WatchlistTable } from '@/app/watchlist/components/table/WatchlistTable';
import { teleService } from '@/services/tele.service';
const fetchTop50 = async () => {
  try {
    const res = await teleService.getWatchList();
    return {
      data: res.data.map((item, index) => ({ ...item, Order: index + 1 })),
      total: 0,
    };
  } catch (e) {
    return { data: [], total: 0 };
  }
};
export default async function WatchlistPage() {
  const { data, total } = await fetchTop50();

  if (!data) return;
  return (
    <div>
      <WatchlistTable data={data} total={total} />
    </div>
  );
}
