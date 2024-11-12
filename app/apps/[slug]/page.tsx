import { AppInfo } from '@/app/apps/[slug]/components/AppInfo';
import { AppDetailChart } from '@/app/apps/[slug]/components/AppDetailChart';
import { teleService } from '@/services/tele.service';
import { AppDetail } from '@/types/app.type';
import { Metadata, ResolvingMetadata } from 'next';
import { getLogoUrl } from '@/lib/utils/image.util';

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const fetchAppDetail = async (username: string) => {
  try {
    return (await teleService.getAppDetail(username))?.data;
  } catch (e) {
    return null;
  }
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const slug = params.slug;
  const data: AppDetail | null = await fetchAppDetail(slug);
  if (!data)
    return {
      title: 'App',
      openGraph: {
        images: [],
      },
      description:
        'Explore app on Telegram. Track engagement, growth, and channel metrics on Tgecko.',
    };

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];
  const logo = getLogoUrl(data.Bot.username.replace('@', ''));

  return {
    // title: data?.Name || 'App',
    openGraph: {
      images: [logo, ...previousImages],
      description: `Explore ${data.Name} on Telegram. Track engagement, growth, and channel metrics on Tgecko.`,
      title: data.Name,
    },
    twitter: {
      images: [logo, ...previousImages],
      description: `Explore ${data.Name} on Telegram. Track engagement, growth, and channel metrics on Tgecko.`,
      title: data.Name,
    },
    description: `Explore ${data.Name} on Telegram. Track engagement, growth, and channel metrics on Tgecko.`,
    // icons: [logo],
    keywords: [
      data.Name,
      data?.Bot.username || '',
      'Tgecko',
      'analytics',
      'Telegram mini apps tracker',
      'Mini app performance',
      'Active user statistics',
    ],
  };
}

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
