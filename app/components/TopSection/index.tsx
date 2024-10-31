import { TopBox } from '@/components/common/TopBox';
import { teleService } from '@/services/tele.service';
import { AppDetail, AppTrack } from '@/types/app.type';
import { TopAnalysis } from '@/app/components/TopSection/TopAnalysis';

const fetchTop50 = async () => {
  try {
    const res = await teleService.getTop50<AppTrack>(
      {
        page: 1,
        limit: 50,
      },
      'bot',
    );
    return { data: res.data.data, total: res.data.total };
  } catch (e) {
    return { data: [], total: 0 };
  }
};

export const TopSection = async () => {
  const { data, total } = await fetchTop50();

  if (!data) return;
  return (
    <div className="flex w-full flex-col gap-6 xl:flex-row">
      <div className="flex w-full flex-col gap-6 xl:w-[65%]">
        <div className="flex w-full flex-col gap-6 lg:flex-row">
          <TopBox title="Top 50" list={data.filter((item, index) => index < 5)} />
          <TopBox title="Top 50" list={data.filter((item, index) => index < 5)} />
        </div>
        <TopAnalysis />
      </div>
      <div className="flex w-full flex-col gap-6 lg:flex-row xl:w-[35%] xl:flex-col">
        <TopBox title="Top 50" list={data.filter((item, index) => index < 3)} />
        <TopBox title="Top 50" list={data.filter((item, index) => index < 3)} />
      </div>
    </div>
  );
};
