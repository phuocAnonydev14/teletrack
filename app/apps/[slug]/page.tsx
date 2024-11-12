import { AppInfo } from '@/app/apps/[slug]/components/AppInfo';
import { AppDetailChart } from '@/app/apps/[slug]/components/AppDetailChart';
import { teleService } from '@/services/tele.service';
import { AppDetail } from '@/types/app.type';

const fetchAppDetail = async (username: string) => {
  try {
    return (await teleService.getAppDetail(username))?.data;
  } catch (e) {
    return null;
  }
};

export default async function AppDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const data: AppDetail | null = await fetchAppDetail(slug);

  if (!data) return;
  return (
    <div className="flex flex-col gap-5 lg:gap-10">
      <AppInfo appDetail={data} />
      <AppDetailChart appDetail={data} />
    </div>
  );
}
