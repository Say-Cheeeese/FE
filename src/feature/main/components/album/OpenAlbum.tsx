'use client';
import { useState } from 'react';
import ToggleAlbumType, { AlbumType } from './ToggleAlbumType';

interface OpenAlbumProps {}

export default function OpenAlbum({}: OpenAlbumProps) {
  const [albumType, setAlbumType] = useState<AlbumType>('all');

  return (
    <section className='px-5'>
      <h2 className='text-heading-md-semibold pb-4'>열린 앨범 4</h2>
      <ToggleAlbumType
        value={albumType}
        onChange={(next) => setAlbumType(next)}
      />
    </section>
  );
}
