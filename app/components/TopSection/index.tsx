'use client';

import { TopBox } from '@/components/common/TopBox';
import { teleService } from '@/services/tele.service';
import { AppTrack } from '@/types/app.type';
import { TopAnalysis } from '@/app/components/TopSection/TopAnalysis';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    partialVisibilityGutter: 40,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    partialVisibilityGutter: 30,
  },
};

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
    <div className="mb-[50px] flex w-full flex-col gap-x-6 lg:mb-0 xl:flex-row">
      <div className="block lg:hidden">
        <Carousel
          partialVisible={true}
          responsive={responsive}
          className="gap-4"
          customLeftArrow={<></>}
          customRightArrow={<></>}
        >
          <TopBox title="Top Search" list={data.filter((item, index) => index < 3)} />
          <TopBox title="Top Bookmark" list={data.filter((item, index) => index < 3)} />
          <TopBox title="Top Weeky Gainers" list={data.filter((item, index) => index < 3)} />
          <TopBox title="Top Weekly Losers" list={data.filter((item, index) => index < 3)} />
        </Carousel>
      </div>
      <div className="flex w-full flex-col gap-6 xl:w-[65%]">
        <div className="hidden h-[50%] w-full flex-1 flex-col gap-6 lg:flex lg:flex-row">
          <TopBox title="Top Search" list={data.filter((item, index) => index < 3)} />
          <TopBox title="Top Bookmark" list={data.filter((item, index) => index < 3)} />
        </div>
        <div className="h-[50%]">
          <TopAnalysis />
        </div>
      </div>
      <div className="hidden w-full flex-col gap-6 lg:flex lg:flex-row xl:w-[35%] xl:flex-col">
        <TopBox title="Top Weeky Gainers" list={data.filter((item, index) => index < 3)} />
        <TopBox title="Top Weekly Losers" list={data.filter((item, index) => index < 3)} />
      </div>
    </div>
  );
};
