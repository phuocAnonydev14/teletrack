'use client';

import { AppInfo } from '@/app/apps/[slug]/components/AppInfo';
import { AppDetailChart } from '@/app/apps/[slug]/components/AppDetailChart';
import { teleService } from '@/services/tele.service';
import { useEffect, useState } from 'react';
import { AppDetail } from '@/types/app.type';

const fetchAppDetail = async (username: string) => {
  try {
    return (await teleService.getAppDetail(username))?.data;
  } catch (e) {
    return { data: null };
  }
};

export default function AppDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const [data, setData] = useState<AppDetail | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await fetchAppDetail(slug);
      setData(data);
    })();
  }, []);

  console.log('dâata', data);

  if (!data) return;
  return (
    <div className="flex flex-col gap-5 lg:gap-10">
      <AppInfo appDetail={data} />
      <AppDetailChart appDetail={data} />
    </div>
  );
}
