'use client';
import React, { useState } from 'react';
import AlbumEmojiSelector from './AlbumEmojiSelector';

export default function CreateAlbumList() {
  const [selectedEmoji, setSelectedEmoji] = useState('😊');

  return (
    <div className='mt-[113px]'>
      <AlbumEmojiSelector
        selectedEmoji={selectedEmoji}
        onEmojiSelect={setSelectedEmoji}
      />
    </div>
  );
}
