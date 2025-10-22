'use client';
import Image from 'next/image';
import KakaoSignupButton from '@/feature/login/components/KakaoSignupButton';
import EmojiModal from '@/feature/login/components/EmoJiModal';
import { useState } from 'react';

export default function LoginPage() {
  const [showEmojiModal, setShowEmojiModal] = useState(false);

  const handleEmojiClick = (emojiData: { emoji: string }) => {
    console.log('선택된 이모지:', emojiData);
    setShowEmojiModal(false);
  };
  return (
    <div className='flex flex-col h-screen px-4 w-full'>
      <div className='flex flex-col items-center gap-[17px] w-full mt-[173px] flex-1'>
        <Image
          src='/assets/login/cheese-icon.svg'
          width={120}
          height={120}
          alt='치즈 아이콘'
        />
        <Image
          src='/assets/login/cheese-logo.svg'
          width={120}
          height={120}
          alt='치즈 아이콘'
        />
        <span className='text-body-lg-semibold text-text-subtle'>
          우리가 특별한 순간을 기억하는 법
        </span>
      </div>
      <div className='flex flex-col gap-2 mb-[171px] mt-10'>
        <div className='flex flex-col items-center justify-center'>
          <div
            className='py-2 pl-[14px] bg-surface-inverse w-[177px] h-9 rounded-full cursor-pointer'
            onClick={() => setShowEmojiModal(true)}
          >
            <span className='text-body-sm-semibold text-text-basic-inverse flex items-center gap-1'>
              ⚡️3초만에 빠른 회원가입
            </span>
          </div>
          <Image
            src='/assets/login/reverse-triangle-black.svg'
            width={14}
            height={8}
            alt='삼각형'
          />
        </div>
        <KakaoSignupButton />
      </div>

      <EmojiModal
        show={showEmojiModal}
        onClose={() => setShowEmojiModal(false)}
        onEmojiClick={handleEmojiClick}
      />
    </div>
  );
}
