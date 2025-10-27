'use client';
import AlbumEmojiSelector from '@/feature/create-album/components/AlbumEmojiSelector';
import CustomHeader from '@/global/components/CustomHeader';
import React, { useState } from 'react';

export default function Page() {
  const [selectedEmoji, setSelectedEmoji] = useState('😊');

  return (
    <div>
      <CustomHeader title='앨범 만들기' />
      <AlbumEmojiSelector
        selectedEmoji={selectedEmoji}
        onEmojiSelect={setSelectedEmoji}
      />
    </div>
  );
}
