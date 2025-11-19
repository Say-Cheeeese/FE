import ScreenAlbum4Cut from '@/feature/album/4cut/components/ScreenAlbum4Cut';
import { ApiReturns, EP } from '@/global/api/ep';
import { serverApi } from '@/global/utils/serverApi';
import { Metadata, ResolvingMetadata } from 'next';

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  let makerName = '';
  const { albumId } = await params;
  try {
    const { result } = await serverApi.get<ApiReturns['album.invitation']>({
      path: EP.album.invitation(albumId),
    });

    if (result?.makerName) makerName = result.makerName;
  } catch (e) {
    console.log(e);
  }

  return {
    title: `치즈네컷이 궁금해요 | ${makerName}`,
    description: '메이커님 네컷 확정해주세요 (*´ｰ`*人)',
    openGraph: {
      title: `치즈네컷이 궁금해요 | ${makerName}`,
      description: '메이커님 네컷 확정해주세요 (*´ｰ`*人)',
      url: `https://say-cheese.me/album/4cut/${albumId}`,
      siteName: '치이이즈',
      images: [
        {
          url: '/og/toMaker_og.png',
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
  params: Promise<{
    albumId: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { albumId } = await params;
  return <ScreenAlbum4Cut albumId={albumId} />;
}
