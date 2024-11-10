'use client';

import { Chart } from '@/components/chart';
import { ChartConfig } from '@/components/ui/chart';
import { AppDetail, AppHistory } from '@/types/app.type';
import { useParams } from 'next/navigation';
import { teleService } from '@/services/tele.service';
import { useEffect, useState } from 'react';
import { CompareNavigate } from '@/components/chart/CompareNavigate';

const chartConfig = {
  date: {
    label: 'DATE',
  },
  amount: {
    label: 'AMOUNT',
  },
} satisfies ChartConfig;

interface AppDetailChartProps {
  appDetail: AppDetail;
}

export const AppDetailChart = (props: AppDetailChartProps) => {
  const { appDetail } = props;
  const { slug } = useParams();
  const [history, setHistory] = useState<AppHistory | null>(null);

  const handleFetchChartData = async () => {
    try {
      const { data } = await teleService.getAppHistory(slug.toString());
      setHistory(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    handleFetchChartData().finally();
  }, [slug]);

  if (!history) return;
  const username = appDetail.Bot.username.replace('@', '');

  return (
    <div className="flex flex-col gap-5 lg:gap-10">
      <Chart
        chartConfig={chartConfig}
        chartData={Object.entries(history.Bot).map(([date, amount]) => ({ date, amount }))}
        title="USERS"
        amount={appDetail.Bot.users}
        username={username}
      />
      <Chart
        chartConfig={chartConfig}
        chartData={Object.entries(history.Channel).map(([date, amount]) => ({ date, amount }))}
        title="SUBSCRIBERS"
        amount={appDetail.Channel.users}
        username={username}
      />
      {/*<Chart chartConfig={chartConfig} chartData={chartData} title="FDV" amount={57852147} />*/}
    </div>
  );
};
