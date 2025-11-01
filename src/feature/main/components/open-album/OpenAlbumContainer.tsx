'use client';
import { useState } from 'react';
import ButtonMore from './ButtonMore';
import OpenAlbum from './OpenAlbum';
import ToggleAlbumType, { AlbumType } from './ToggleAlbumType';

interface OpenAlbumContainerProps {}

export default function OpenAlbumContainer({}: OpenAlbumContainerProps) {
  const [albumType, setAlbumType] = useState<AlbumType>('all');

  return (
    <section className='mb-16 px-5'>
      <h2 className='typo-heading-md-semibold pb-4'>열린 앨범 4</h2>
      <ToggleAlbumType
        value={albumType}
        onChange={(next) => setAlbumType(next)}
      />
      <div className='mb-5 flex flex-col gap-5'>
        <OpenAlbum
          author='맹소현'
          date='2025.08.23'
          expirationTime='3일 2시간'
          joinedMembers={7}
          totalMembers={8}
          title='큐시즘 MT'
          thumbnails={[
            'https://fastly.picsum.photos/id/1/200/300.jpg?hmac=jH5bDkLr6Tgy3oAg5khKCHeunZMHq0ehBZr6vGifPLY',
            'https://fastly.picsum.photos/id/1/200/300.jpg?hmac=jH5bDkLr6Tgy3oAg5khKCHeunZMHq0ehBZr6vGifPLY',
            'https://fastly.picsum.photos/id/1/200/300.jpg?hmac=jH5bDkLr6Tgy3oAg5khKCHeunZMHq0ehBZr6vGifPLY',
          ]}
        />
        <OpenAlbum
          author='맹소현'
          date='2025.08.23'
          expirationTime='3일 2시간'
          joinedMembers={7}
          totalMembers={8}
          title='큐시즘 MT'
          thumbnails={[
            'https://fastly.picsum.photos/id/1/200/300.jpg?hmac=jH5bDkLr6Tgy3oAg5khKCHeunZMHq0ehBZr6vGifPLY',
            'https://fastly.picsum.photos/id/1/200/300.jpg?hmac=jH5bDkLr6Tgy3oAg5khKCHeunZMHq0ehBZr6vGifPLY',
          ]}
        />
      </div>
      <ButtonMore />
    </section>
  );
}
