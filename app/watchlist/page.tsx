import { WatchlistTable } from '@/app/watchlist/components/table/WatchlistTable';
import { teleService } from '@/services/tele.service';
import { AppDetail } from '@/types/app.type';
const fetchTop50 = async () => {
  try {
    const res = await teleService.getTop50<AppDetail>({
      page: 1,
      limit: 10,
    });
    return {
      data: res.data.data.map((item, index) => ({ ...item, Order: index + 1 })),
      total: res.data.total,
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
