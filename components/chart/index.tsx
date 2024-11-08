'use client';

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Card, CardContent } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { cn, formatNumber, formatNumberWithSpacing } from '@/lib/utils/utils';
import { useMediaQuery } from 'usehooks-ts';
import { calculateWeekDifference } from '@/lib/utils/calculateWithDate';

interface CharProps {
  chartData: Record<any, any>[];
  chartConfig: ChartConfig;
  title: string;
  amount?: number;
  isCompare?: boolean;
}

export function Chart(props: CharProps) {
  const { chartData, chartConfig, title, amount, isCompare } = props;
  const matches = useMediaQuery('(max-width: 728px)');
  const matchExtraSmall = useMediaQuery('(max-width: 345px)');
  const todayChange =
    chartData[chartData.length - 1]?.amount - chartData[chartData.length - 2]?.amount;
  const { difference } = calculateWeekDifference(chartData);

  return (
    <Card className="flex flex-col gap-5 rounded-xl bg-appInfoBg py-6 lg:gap-10">
      <div className="flex flex-row-reverse items-center justify-between gap-3 px-5 lg:flex-row lg:justify-start lg:px-6">
        <div className="w-max rounded-[5px] bg-secondary px-2 py-1 text-base font-semibold text-secondary-foreground lg:px-[10px] lg:py-[5px] lg:text-xl">
          {title}
        </div>
        <p className="text-lg font-bold lg:text-2xl">{amount && formatNumberWithSpacing(amount)}</p>
      </div>
      <CardContent className="h-full overflow-hidden px-0 py-0">
        <div
          className={cn(
            'flex w-full justify-between gap-y-2 px-6',
            matchExtraSmall ? 'flex-col' : '',
          )}
        >
          <div className={cn('flex flex-col gap-2 md:hidden', isCompare ? 'hidden' : '')}>
            <div className="flex justify-between gap-3">
              <p
                className={cn('font-semibold', todayChange < 0 ? 'text-red-500' : 'text-green-500')}
              >
                {todayChange < 0 ? '-' : '+'}
                {formatNumber(
                  chartData[chartData.length - 1]?.amount - chartData[chartData.length - 2]?.amount,
                  true,
                )}
              </p>
              <p className="font-medium text-gray-500">today</p>
            </div>
            <div className="flex justify-between gap-3">
              <p
                className={cn('font-semibold', difference < 0 ? 'text-red-500' : 'text-green-500')}
              >
                {difference < 0 ? '-' : '+'}
                {formatNumber(difference, true)}
              </p>
              <p className="font-medium text-gray-500">week</p>
            </div>
          </div>
          <ChartContainer
            config={chartConfig}
            className={cn(
              'h-[120px] w-[70%] md:w-full lg:h-[300px]',
              isCompare || matchExtraSmall ? 'w-full' : '',
            )}
          >
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
              className="h-[300px] overflow-hidden"
            >
              {(!matches || isCompare) && (
                <>
                  <CartesianGrid vertical={false} stroke="#B6B6B6" strokeDasharray={3} />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value}
                  />
                  {!matches && (
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickCount={3}
                      tickFormatter={(val) => formatNumber(val)}
                    />
                  )}
                </>
              )}
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator={'dot'} />} />
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
                    stackId={key}
                  />
                );
              })}
            </AreaChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
