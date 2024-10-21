import { AppInfo } from '@/app/apps/[slug]/components/AppInfo';
import { AppDetailChart } from '@/app/apps/[slug]/components/AppDetailChart';

export default function AppDetailPage() {
  return (
    <div className="flex flex-col gap-10">
      <AppInfo />
      <AppDetailChart />
    </div>
  );
}
