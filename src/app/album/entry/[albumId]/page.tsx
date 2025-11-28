import ScreenAlbumEntry from '@/feature/album-entry/components/ScreenAlbumEntry';
import { ApiReturns, EP } from '@/global/api/ep';
import { serverApi } from '@/global/utils/serverApi';
import { Metadata, ResolvingMetadata } from 'next';

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  let title = '';
  const { albumId } = await params;
  try {
    const { result } = await serverApi.get<ApiReturns['album.invitation']>({
      path: EP.album.invitation(albumId),
    });

    if (result?.title) title = result.title;
  } catch (e) {
    console.log(e);
  }

  return {
    title: `${title} | 앨범에 초대해요`,
    description: '치이이즈: 추억은 따끈할 때 제맛',
    openGraph: {
      title: `${title} | 앨범에 초대해요`,
      description: '치이이즈: 추억은 따끈할 때 제맛',
      url: `https://say-cheese.me/album/entry/${albumId}`,
      siteName: '치이이즈',
      images: [
        {
          url: '/og/invite_og.png',
          width: 1200,
          height: 630,
          alt: '치이이즈. 우리 공유앨범에 초대합니다. 일주일 뒤에는 앨범이 사라져요!',
        },
      ],
      locale: 'ko_KR',
      type: 'website',
    },
  };
}

interface PageProps {
  params: Promise<{ albumId: string }>;
}

export default async function Page({ params }: PageProps) {
  const { albumId } = await params;

  return <ScreenAlbumEntry albumId={albumId} />;
}
