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
import { CompareNavigate } from '@/components/chart/CompareNavigate';

interface CharProps {
  chartData: Record<any, any>[];
  chartConfig: ChartConfig;
  title: string;
  amount?: number;
  isCompare?: boolean;
  username?: string;
}

export function Chart(props: CharProps) {
  const { chartData, chartConfig, title, amount, isCompare, username } = props;
  const matches = useMediaQuery('(max-width: 728px)');
  const matchExtraSmall = useMediaQuery('(max-width: 400px)');
  const todayChange =
    chartData[chartData.length - 1]?.amount - chartData[chartData.length - 2]?.amount;
  const { difference } = calculateWeekDifference(chartData);

  console.log('chartData', chartData);

  return (
    <Card className="flex flex-col gap-5 rounded-xl bg-appInfoBg py-6 lg:gap-10">
      <div className="flex justify-between gap-3 px-5 lg:px-6">
        <div className="flex items-center justify-start gap-3 md:w-auto md:flex-row">
          <div className="w-max rounded-[5px] bg-secondary px-2 py-[3px] text-base font-semibold text-secondary-foreground lg:px-[10px] lg:py-[5px] lg:text-xl">
            <span>{title}</span>
          </div>
          <p className="text-lg font-bold lg:text-2xl">
            {amount && (matches ? formatNumber(amount) : formatNumberWithSpacing(amount))}
          </p>
        </div>
        {username && <CompareNavigate username={username} />}
      </div>
      <CardContent className="h-full overflow-hidden px-0 py-0">
        <div
          className={cn(
            'flex w-full justify-between gap-4 pl-6 pr-2',
            matchExtraSmall ? 'flex-col' : '',
            isCompare ? 'px-4 lg:px-6' : '',
          )}
        >
          <div className={cn('flex w-[30%] flex-col gap-2 md:w-[15%]', isCompare ? 'hidden' : '')}>
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
              'h-[150px] w-[70%] md:w-full lg:h-[300px]',
              isCompare || matchExtraSmall ? 'w-full' : '',
            )}
          >
            <AreaChart accessibilityLayer data={chartData} className="h-[300px] overflow-hidden">
              <>
                <CartesianGrid vertical={false} stroke="#B6B6B6" strokeDasharray={3} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => formatNumber(val, true)}
                  width={35}
                />
              </>
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
