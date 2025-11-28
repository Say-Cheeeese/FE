import CreateComplete from '@/feature/create-album/components/CreateComplete';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '앨범 생성 완료 | 치이이즈',
  description: '앨범 생성이 완료되었습니다. 친구들과 추억을 공유해보세요.',
  openGraph: {
    title: '앨범 생성 완료 | 치이이즈',
    description: '앨범 생성이 완료되었습니다. 친구들과 추억을 공유해보세요.',
  },
};

export default async function Page({
  params,
}: {
  params: Promise<{ albumId: string }>;
}) {
  const { albumId } = await params;
  return <CreateComplete albumId={albumId} />;
}
