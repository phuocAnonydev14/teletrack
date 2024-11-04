'use client';
import { CartesianGrid, Line, LineChart } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartData = [
  { date: 'January', percent: 18 },
  { date: 'February', percent: 30 },
  { date: 'March', percent: 23 },
  { date: 'April', percent: 15 },
  { date: 'May', percent: 20 },
  { date: 'June', percent: 21 },
  { date: 'July', percent: 25 },
];

const chartConfig = {
  percent: {
    label: 'Percent',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export const UserGrowthChart = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-y-2 px-2 text-center md:gap-y-3 md:px-5">
      <p className="translate-y-2 text-xl font-bold">Total Users Growth</p>
      <div className="h-full translate-y-5">
        <ChartContainer config={chartConfig} className="h-[130px]">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 4,
              right: 4,
            }}
          >
            <CartesianGrid vertical={false} />
            {/*<XAxis*/}
            {/*  dataKey="month"*/}
            {/*  tickLine={false}*/}
            {/*  axisLine={false}*/}
            {/*  tickMargin={8}*/}
            {/*  tickFormatter={(value) => value.slice(0, 3)}*/}
            {/*/>*/}
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Line
              dataKey="percent"
              type="linear"
              stroke="var(--color-percent)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </div>
    </div>
  );
};
