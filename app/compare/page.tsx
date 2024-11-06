'use client';

import { SelectApp } from '@/app/compare/components/SelectApp';
import { Chart } from '@/components/chart';
import { useEffect, useMemo, useState } from 'react';
import { AppHistory } from '@/types/app.type';
import { teleService } from '@/services/tele.service';

type DataOutput = {
  date: string;
  [key: string]: number | string;
};

type LabelObject = {
  [key: string]: {
    label: string;
  };
};

function transformData(
  data: (AppHistory & { username: string })[],
  attr: 'Bot' | 'Channel',
): DataOutput[] {
  const result: DataOutput[] = [];
  const dates = new Set<string>();

  data.forEach((item) => {
    Object.keys(item[attr]).forEach((date) => dates.add(date));
  });

  dates.forEach((date) => {
    const entry: DataOutput = { date };
    data.forEach((item) => {
      entry[item.username.replace('@', '')] = item[attr][date] ?? 0;
    });
    result.push(entry);
  });

  return result;
}

function getFormattedKeys(keys: string[]): LabelObject {
  const result: LabelObject = {};
  keys.forEach((key) => {
    result[key] = { label: key }; // Chuyển key thành chữ in hoa
  });
  return result;
}

export default function ComparePage() {
  const [results, setResults] = useState<string[]>([]);
  const [appList, setAppList] = useState<(AppHistory & { username: string })[]>([]);

  const handleFetchChartData = async () => {
    try {
      let overflowResult = '';
      appList.map((app) => {
        if (!results.includes(app.username)) {
          setAppList(appList.filter((item) => item.username !== app.username));
        }
      });
      results.map((result) => {
        if (!appList.map((app) => app.username).includes(result)) {
          overflowResult = result;
        }
      });
      if (overflowResult) {
        const { data } = await teleService.getAppHistory(overflowResult);
        setAppList((state) => [...state, { ...data.data, username: overflowResult }]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    handleFetchChartData();
  }, [results]);

  useEffect(() => {}, [appList]);

  const botMetrics = useMemo(() => transformData(appList, 'Bot'), [appList]);
  const channelMetrics = useMemo(() => transformData(appList, 'Channel'), [appList]);
  const chartConfig = getFormattedKeys([...appList.map((app) => app.username.replace('@', ''))]);

  return (
    <div className="flex flex-col gap-5">
      <SelectApp setResults={(val) => setResults(val)} results={results} />
      {results.length > 0 && (
        <div className="flex flex-col gap-5">
          <Chart isCompare chartConfig={chartConfig} chartData={botMetrics} title="USERS" />
          <Chart
            isCompare
            chartConfig={chartConfig}
            chartData={channelMetrics}
            title="SUBSCRIBERS"
          />
          {/*<Chart chartConfig={chartConfig} chartData={chartData} title="FDV" />*/}
        </div>
      )}
    </div>
  );
}
