'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import SelectAlbumBody from '@/feature/album-select/components/SelectAlbumBody';
import CustomHeader from '@/global/components/header/CustomHeader';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function Page() {
  const [modalOpen, setModalOpen] = useState(false);
  const confirmedRef = useRef(false);
  const router = useRouter();
  const params = useParams();
  const albumId = params?.albumId;

  // data-scroll-locked 속성 제거
  useEffect(() => {
    const removeScrollLock = () => {
      const body = document.body;
      if (body.hasAttribute('data-scroll-locked')) {
        body.removeAttribute('data-scroll-locked');
      }
    };

    removeScrollLock();
    const interval = setInterval(removeScrollLock, 100);

    return () => {
      clearInterval(interval);
      removeScrollLock();
    };
  }, []);

  // 뒤로가기(브라우저/하드웨어) 감지
  useEffect(() => {
    const handler = () => {
      if (!confirmedRef.current) {
        setModalOpen(true);
        history.pushState(null, '', location.href); // 뒤로가기 무효화
      }
    };

    // 초기 히스토리 상태 추가
    history.pushState(null, '', location.href);
    window.addEventListener('popstate', handler);

    return () => {
      window.removeEventListener('popstate', handler);
    };
  }, []);

  const handleConfirm = () => {
    confirmedRef.current = true;
    setModalOpen(false);
    console.log('나가기');
    if (albumId) {
      window.location.replace(`/album/upload/${albumId}`);
    }
  };

  const handleCancel = () => {
    // 히스토리 상태 다시 추가만 수행
    history.pushState(null, '', location.href);
  };

  const handleOpenChange = (open: boolean) => {
    setModalOpen(open);
    if (!open) {
      // 모달이 닫힐 때 (바깥 클릭, ESC 등)
      handleCancel();
    }
  };

  return (
    <div>
      <CustomHeader
        title='앨범 채우기'
        isShowBack={true}
        onBackClick={() => setModalOpen(true)}
      />
      <SelectAlbumBody />

      <AlertDialog open={modalOpen} onOpenChange={handleOpenChange}>
        <AlertDialogContent className='rounded-[20px]!'>
          <AlertDialogHeader className='pb-6'>
            <AlertDialogTitle className='typo-heading-sm-semibold text-text-basic pt-4'>
              앨범 채우기를 그만둘까요?
            </AlertDialogTitle>
            <AlertDialogDescription className='typo-body-lg-regular text-text-subtle whitespace-pre-line'>
              사진을 앨범에 채우기 전이에요.{'\n'}지금 나가면 다시 사진을
              불러와야 해요.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className='grid grid-cols-2'>
            <AlertDialogCancel
              onClick={handleCancel}
              className='bg-button-tertiary-fill typo-body-lg-semibold! text-text-subtle! flex h-12 items-center justify-center border-none px-5 py-2.5 hover:bg-neutral-200'
            >
              취소
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirm}
              className='bg-button-primary-fill active:bg-button-primary-fill-pressed active:text-text-primary typo-body-lg-semibold! text-text-primary! flex h-12 items-center justify-center px-5 py-2.5 transition-colors duration-100'
            >
              나가기
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
