import { SelectApp } from '@/app/compare/components/SelectApp';
import { Chart } from '@/components/chart';
import { ChartConfig } from '@/components/ui/chart';

const chartData = [
  { month: 'January', desktop: 186, mobile: 80, ipad: 1000 },
  { month: 'February', desktop: 305, mobile: 200, ipad: 1000 },
  { month: 'March', desktop: 237, mobile: 120, ipad: 1000 },
  { month: 'April', desktop: 73, mobile: 190, ipad: 1000 },
  { month: 'May', desktop: 209, mobile: 130, ipad: 1000 },
  { month: 'June', desktop: 214, mobile: 140, ipad: 1000 },
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

export default function ComparePage() {
  return (
    <div className="flex flex-col gap-5">
      <SelectApp />
      <div className="flex flex-col gap-5">
        <Chart chartConfig={chartConfig} chartData={chartData} title="USERS" />
        <Chart chartConfig={chartConfig} chartData={chartData} title="SUBSCRIBERS" />
        <Chart chartConfig={chartConfig} chartData={chartData} title="FDV" />
      </div>
    </div>
  );
}
