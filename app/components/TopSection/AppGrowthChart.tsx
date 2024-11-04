'use client';

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

export const description = 'A radial chart with stacked sections';
const chartData = [{ month: 'january', increase: 1260, decrease: 570 }];
const chartConfig = {
  increase: {
    label: 'Increase',
    color: 'hsl(var(--chart-2))',
  },
  decrease: {
    label: 'Decrease',
    color: 'hsl(var(--chart-3))',
  },
} satisfies ChartConfig;

export const AppGrowthChart = () => {
  const totalVisitors = chartData[0].increase + chartData[0].decrease;

  return (
    <div className="flex h-full w-full translate-y-3 flex-col gap-y-2 px-2 text-center md:gap-y-3 md:px-5">
      <p className="translate-y-2 text-xl font-bold">Total Apps Tracked</p>
      <div className="">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[150px] w-full max-w-[250px] translate-y-5"
        >
          <RadialBarChart data={chartData} endAngle={180} innerRadius={68} outerRadius={100}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Apps
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="increase"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-increase)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="decrease"
              fill="var(--color-decrease)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </div>
    </div>
  );
};
