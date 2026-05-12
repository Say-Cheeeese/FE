'use client';

import BottomSheetModal from '@/global/components/modal/BottomSheetModal';
import { buildQuery } from '@/global/utils/buildQuery';

import KakaoSignupButton from '@/feature/login/components/KakaoSignupButton';

interface LoginDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  albumId: string;
}

export default function LoginDrawer({
  open,
  onOpenChange,
  albumId,
}: LoginDrawerProps) {
  const redirectUrl = `/photo/entry/${albumId}${buildQuery({ isInvite: true })}`;

  return (
    <BottomSheetModal
      open={open}
      onOpenChange={onOpenChange}
      trigger={null}
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
        {/* Illustration placeholder - In a real app, this would be an Image component or a specialized SVG component */}
        <div className='relative flex h-[150px] w-[150px] items-center justify-center'>
          {/* Complex illustration would go here. For now, representing it with a stylized container as described in Figma. */}
          <div className='bg-element-gray-light flex h-full w-full items-center justify-center rounded-3xl shadow-[0_3px_37.5px_rgba(224,153,0,0.1)]'>
            <span className='text-6xl'>🧀</span>
          </div>
        </div>

        {/* Action Area */}
        <div className='flex w-full flex-col items-center gap-2 pb-1'>
          <KakaoSignupButton redirect={redirectUrl} />

          <p className='text-text-subtler mt-2 text-center text-[10px] leading-[18px] font-normal'>
            계속하면 [이용약관] 및 [개인정보처리방침]에 동의하는 것으로
            간주됩니다.
          </p>
        </div>
      </div>
    </BottomSheetModal>
  );
}
