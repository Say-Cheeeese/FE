'use client';
import AlbumEmojiSelector from '@/feature/create-album/components/AlbumEmojiSelector';
import CreateAlbumList from '@/feature/create-album/components/CreateAlbumList';
import CustomHeader from '@/global/components/CustomHeader';
import React, { useState } from 'react';

export default function Page() {

  return (
    <div>
      <CustomHeader title='앨범 만들기' />
      <CreateAlbumList />
    </div>
  );
}
