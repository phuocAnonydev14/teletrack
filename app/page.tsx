import { teleService } from '@/services/tele.service';
import { AppDetail } from '@/types/app.type';
import { AppTrackTable } from '@/app/components/AppTrackTable';
import { Container } from '@/components/common/Container';

const fetchTop50 = async () => {
  try {
    const res = await teleService.getTop50<AppDetail>(
      {
        page: 1,
        limit: 100,
      },
      'fdv',
    );
    return { data: res.data.data, total: res.data.total };
  } catch (e) {
    return { data: [], total: 0 };
  }
};

const fetchStats = async () => {
  try {
    const res = await teleService.getStats();
    return res.data;
  } catch (e) {
    return null;
  }
};

export default async function Home() {
  const { data, total } = await fetchTop50();
  const stats = await fetchStats();
  if (!data || !stats) return;
  return (
    <Container isMobileDisablePx>
      <div className="flex flex-col lg:gap-[50px]">
        {/*<TopSection />*/}
        <AppTrackTable stats={stats} data={data} total={total} />
      </div>
    </Container>
  );
}
