import { AppTrackTable } from '@/app/components/table/AppTrackTable';

export default function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const currentFeat = searchParams?.q || '';

  return (
    <div className="flex flex-col">
      <AppTrackTable />
    </div>
  );
}
