'use client';

import Image from 'next/image';
import BottomSheetModal from '@/global/components/modal/BottomSheetModal';
import { buildQuery } from '@/global/utils/buildQuery';

import KakaoSignupButton from '@/feature/login/components/KakaoSignupButton';

interface LoginDrawerProps {
  trigger?: React.ReactNode;
  albumId: string;
}

export default function LoginDrawer({
  trigger,
  albumId,
}: LoginDrawerProps) {
  const redirectUrl = `/photo/entry/${albumId}${buildQuery({ isInvite: true })}`;

  return (
    <BottomSheetModal
      trigger={trigger}
      showHandle={false}
      className='max-h-none'
      contentClassName='pt-10 pb-5 px-6'
      title={
        <>
          빠르게 로그인하고 <br /> 치이이즈 앨범에 입장할게요
        </>
      }
    >
      <div className='flex flex-col items-center gap-[32px]'>
        {/* Illustration */}
        <Image
          src='/assets/login/cheese-icon.svg'
          width={150}
          height={150}
          alt='Login Illustration'
        />

        {/* Action Area */}
        <div className='flex w-full flex-col items-center gap-2 pb-1'>
          <KakaoSignupButton redirect={redirectUrl} entrySource='invitation' />

          <p className='text-text-subtler mt-2 text-center text-[10px] leading-[18px] font-normal'>
            계속하면 [이용약관] 및 [개인정보처리방침]에 동의하는 것으로
            간주됩니다.
          </p>
        </div>
      </div>
    </BottomSheetModal>
  );
}
