'use client';

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Input } from '@/components/ui/input';
import { formatNumberWithSpacing } from '@/lib/utils';

interface CharProps {
  chartData: Record<any, any>[];
  chartConfig: ChartConfig;
  title: string;
  amount?: number;
}

export function Chart(props: CharProps) {
  const { chartData, chartConfig, title, amount } = props;

  return (
    <Card className="rounded-xl bg-[#252C33]">
      <CardHeader className="mb-5">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-max rounded-[5px] bg-secondary px-[10px] py-[5px] text-2xl font-bold text-secondary-foreground">
              {title}
            </div>
            <p className="text-3xl font-bold">{amount && formatNumberWithSpacing(amount)}</p>
          </div>
          <div className="flex items-center gap-1">
            <Input type="radio" checked />
            Daily
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="h-full overflow-hidden px-0">
        <ChartContainer config={chartConfig} className="h-[300px] w-full px-2 md:px-6">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
            className="h-[300px] overflow-hidden"
          >
            <CartesianGrid vertical={false} stroke="#B6B6B6" strokeDasharray={3} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} tickCount={3} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
            <defs>
              {Object.keys(chartConfig).map((key, index) => {
                return (
                  <linearGradient key={index + 1} id={key} x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor={`hsl(var(--chart-${index + 1}))`}
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor={`hsl(var(--chart-${index + 1}))`}
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                );
              })}
            </defs>
            {Object.keys(chartConfig).map((key, index) => {
              return (
                <Area
                  key={key}
                  dataKey={key}
                  type="natural"
                  fill={`url(#${key})`}
                  fillOpacity={0.4}
                  stroke={`hsl(var(--chart-${index + 1}))`}
                  stackId="a"
                />
              );
            })}
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
