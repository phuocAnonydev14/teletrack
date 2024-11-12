import { teleService } from '@/services/tele.service';
import { AppDetail } from '@/types/app.type';
import { AppTrackTable } from '@/app/components/AppTrackTable';
import { Container } from '@/components/common/Container';
import { calculateStats } from '@/lib/utils/calculateStats';

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

export default async function Home() {
  const { data, total } = await fetchTop50();
  if (!data) return;
  const stats = calculateStats(
    data.map((item) => ({ change: item.Bot.change || 0, users: item.Bot.users || 0 })),
  );
  return (
    <Container isMobileDisablePx>
      <div className="flex flex-col lg:gap-[50px]">
        {/*<TopSection />*/}
        <AppTrackTable stats={stats} data={data} total={total} />
      </div>
    </Container>
  );
}
