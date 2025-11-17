'use client';
import CustomHeader from '@/global/components/header/CustomHeader';
import LongButton from '@/global/components/LongButton';
import ConfirmModal from '@/global/components/modal/ConfirmModal';
import Toast from '@/global/components/toast/Toast';
import BubbleHint from '@/global/components/tooltip/BubbleTooltip';
import PersonSvg from '@/global/svg/PersonSvg';
import { Download, LucideIcon, Menu, Send } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Container4Cut from './Container4Cut';

interface ScreenAlbum4CutProps {
  albumId: string;
}

export default function ScreenAlbum4Cut({ albumId }: ScreenAlbum4CutProps) {
  const router = useRouter();
  const [isConfirmed, setIsConfirmed] = useState(false);
  // TODO : maker 여부 api통해 확인
  const isMaker = false;

  const handleConfirm = () => {
    // TODO : 치즈네컷 확정
    setIsConfirmed(true);
  };

  const handleDownload = () => {
    // TODO : 다운로드 로직
    console.log('다운로드 클릭');
  };

  const handleShare = () => {
    // TODO : 공유 로직
    console.log('공유하기 클릭');
  };

  return (
    <>
      <CustomHeader
        isShowBack
        title='김수한무거북이와두루미삼천'
        rightContent={
          <div className='flex gap-4'>
            <button
              type='button'
              onClick={() => router.push(`/album/detail/${albumId}/sidebar`)}
            >
              <Menu width={24} height={24} color='var(--color-icon-basic)' />
            </button>
          </div>
        }
      />
      <section className='absolute top-[46%] left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center'>
        <div className='typo-body-lg-semibold mb-2'>현재 TOP 4 사진</div>
        <Container4Cut albumId={albumId} />
      </section>

      <div className='fixed bottom-5 flex w-full max-w-[430px] flex-col items-center px-4'>
        {isMaker ? (
          <>
            {isConfirmed ? (
              <div className='flex w-full justify-center gap-3'>
                <ActionButton
                  icon={Download}
                  text='다운로드'
                  onClick={handleDownload}
                />
                <ActionButton
                  icon={Send}
                  text='공유하기'
                  onClick={handleShare}
                />
              </div>
            ) : (
              <>
                <div className='typo-body-sm-semibold flex items-center gap-2 pb-3'>
                  <span>띱 진행상황</span>
                  <div className='flex items-center'>
                    <span className='p-[5px]'>
                      <PersonSvg />
                    </span>
                    <span>7 / 8 명</span>
                  </div>
                </div>
                <ConfirmModal
                  trigger={<LongButton text='사진 확정하기' noFixed />}
                  title='이대로 확정하시겠어요?'
                  description='예쁜 치즈네컷을 만들어드릴게요'
                  confirmText='확정하기'
                  onConfirm={handleConfirm}
                />
              </>
            )}
          </>
        ) : (
          <div className=''>
            <BubbleHint
              message='📸 사진 확정 권한은 메이커에게만 있어요'
              className='absolute bottom-18 left-1/2 w-full -translate-x-1/2'
            />
            <LongButton
              text='메이커에게 조르기'
              onClick={async () => {
                // TODO : share api 모듈화 및 개선
                if (navigator.share) {
                  try {
                    await navigator.share({
                      title: `'졸업식'앨범에 대한 치즈네컷을 선정해주세요`,
                      text: '이유정님이 임민서 메이커님에게 조르기를 요청했어요!',
                      url: 'https://say-cheese.me/album/4cut/1',
                    });
                  } catch (err) {
                    console.error('공유 취소 또는 실패:', err);
                    Toast.alert(
                      '공유에 실패하였습니다. 다시한번 시도해주세요.',
                    );
                  }
                } else {
                  Toast.alert(
                    '이 브라우저는 공유하기 기능을 지원하지 않습니다.',
                  );
                }
              }}
            />
          </div>
        )}
      </div>
    </>
  );
}

interface ActionButtonProps {
  icon: LucideIcon;
  text: string;
  onClick: () => void;
}

const ActionButton = ({ icon: Icon, text, onClick }: ActionButtonProps) => (
  <button
    type='button'
    onClick={onClick}
    className='bg-button-tertiary-fill text-text-subtle flex flex-1 items-center justify-center gap-1 rounded-[8px] py-[15px]'
  >
    <Icon width={24} height={24} color='var(--color-icon-basic)' />
    <span className='typo-body-1xl-semibold'>{text}</span>
  </button>
);
