'use client';

import { SelectApp } from '@/app/compare/components/SelectApp';
import { Chart } from '@/components/chart';
import { useEffect, useMemo, useState } from 'react';
import { AppHistory } from '@/types/app.type';
import { teleService } from '@/services/tele.service';
import { useQueryState } from 'nuqs';

type DataOutput = {
  date: string;
  [key: string]: number | string;
};

type LabelObject = {
  [key: string]: {
    label: string;
  };
};

function formatDate(date: string): string {
  const [year, month, day] = date.split('-');
  return `${month}/${day}`;
}

function transformData(
  data: (AppHistory & { username: string })[],
  attr: 'Bot' | 'Channel',
): DataOutput[] {
  const result: DataOutput[] = [];
  const dates = new Set<string>();

  data.forEach((item) => {
    Object.keys(item[attr]).forEach((date) => {
      dates.add(date);
    });
  });

  dates.forEach((date) => {
    const entry: DataOutput = { date: formatDate(date) };
    data.forEach((item) => {
      entry[item.username.replace('@', '')] = item[attr][date] ?? 0;
    });
    result.push(entry);
  });

  return result.sort((a, b) => {
    const [monthA, dayA] = a.date.split('/').map(Number);
    const [monthB, dayB] = b.date.split('/').map(Number);

    return monthA - monthB || dayA - dayB;
  });
}

function getFormattedKeys(keys: string[]): LabelObject {
  const result: LabelObject = {};
  keys.forEach((key) => {
    result[key] = { label: key };
  });
  return result;
}

export default function ComparePage() {
  const [results, setResults] = useState<string[]>([]);
  const [appQuery, setAppQuery] = useQueryState('app');
  const [appList, setAppList] = useState<(AppHistory & { username: string })[]>([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleGetAppQuery = () => {
    try {
      if (!appQuery) return;
      const res = JSON.parse(appQuery);
      setResults(res || []);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    handleGetAppQuery();
  }, [appQuery]);

  useEffect(() => {
    handleFetchChartData().finally();
  }, [handleFetchChartData, results]);

  const chartConfig = useMemo(
    () => getFormattedKeys([...appList.map((app) => app.username.replace('@', ''))]),
    [appList],
  );
  const botMetrics = useMemo(() => transformData(appList, 'Bot'), [appList]);
  const channelMetrics = useMemo(() => transformData(appList, 'Channel'), [appList]);

  return (
    <div className="flex flex-col gap-5">
      <SelectApp
        setResults={(val) => {
          setAppQuery(JSON.stringify(val)).finally();
          setResults(val);
        }}
        results={results}
      />
      <div className="flex flex-wrap items-center gap-3">
        {appList
          .filter((item, index) => appList.indexOf(item) === index)
          .map((app) => app.username.replace('@', ''))
          .map((app, index) => {
            const indexColor = index + 1;
            return (
              <div key={app} className="flex items-center gap-1">
                <div
                  className={`h-6 w-6 rounded-sm border-2 border-black`}
                  style={{ backgroundColor: `hsl(var(--chart-${indexColor}))` }}
                />
                <p>{app}</p>
              </div>
            );
          })}
      </div>

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
