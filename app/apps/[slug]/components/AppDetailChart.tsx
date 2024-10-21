import { Chart } from '@/components/chart';
import { ChartConfig } from '@/components/ui/chart';

const chartData = [
  { month: 'January', desktop: 186 },
  { month: 'February', desktop: 305 },
  { month: 'March', desktop: 237 },
  { month: 'April', desktop: 73 },
  { month: 'May', desktop: 209 },
  { month: 'June', desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: 'Desktop',
  },
  mobile: {
    label: 'Mobile',
  },
  ipad: {
    label: 'Mobile',
  },
} satisfies ChartConfig;

export const AppDetailChart = () => {
  return (
    <div className="flex flex-col gap-10">
      <Chart chartConfig={chartConfig} chartData={chartData} title="USERS" amount={57852147} />
      <Chart
        chartConfig={chartConfig}
        chartData={chartData}
        title="SUBSCRIBERS"
        amount={57852147}
      />
      <Chart chartConfig={chartConfig} chartData={chartData} title="FDV" amount={57852147} />
    </div>
  );
};
