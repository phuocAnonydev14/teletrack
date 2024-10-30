import { AppTrackTable } from '@/app/components/table/AppTrackTable';
import { teleService } from '@/services/tele.service';
import { AppDetail } from '@/types/app.type';

const fetchTop50 = async () => {
  try {
    const res = await teleService.getTop50<AppDetail>(
      {
        page: 1,
        limit: 50,
      },
      'fdv',
    );
    return { data: res.data.data, total: res.data.total };
  } catch (e) {
    return { data: [], total: 0 };
  }
};

export default async function Home() {
  const { data, total } = await fetchTop50();

  if (!data) return;
  return (
    <div className="flex flex-col">
      <AppTrackTable data={data} total={total} />
    </div>
  );
}
