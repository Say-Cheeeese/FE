'use client';
import CreateAlbumList from '@/feature/create-album/components/CreateAlbumList';
import CustomHeader from '@/global/components/header/CustomHeader';

export default function Page() {
  return (
    <div>
      <CustomHeader title='앨범 만들기' />
      <CreateAlbumList />
    </div>
  );
}
