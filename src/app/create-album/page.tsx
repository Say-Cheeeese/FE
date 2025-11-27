'use client';
import CreateAlbumList from '@/feature/create-album/components/CreateAlbumList';
import CustomHeader from '@/global/components/header/CustomHeader';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  return (
    <div>
      <CustomHeader
        title='앨범 만들기'
        isShowBack={true}
        onBackClick={() => router.push('/main')}
      />
      <CreateAlbumList />
    </div>
  );
}
