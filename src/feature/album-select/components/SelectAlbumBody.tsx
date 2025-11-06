'use client';

import { useCheckImages } from '@/feature/create-album/hook/useCheckImages';
import { validateImages } from '@/feature/create-album/utils/validateImages';
import LongButton from '@/global/components/LongButton';
import { useImageStore } from '@/store/useImageStore';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

type ImageWithUrl = {
  id: string;
  file: File;
  url: string;
  isOversized: boolean;
};

export default function SelectAlbumBody() {
  const { albumId } = useParams() as { albumId: string };
  const { images } = useImageStore();
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [availableCount, setAvailableCount] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const { mutate: checkImagesMutate } = useCheckImages();

  const showToast = (message: string) => {
    setToast(message);
    const id = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(id);
  };
  console.log('images:', images);
  const processedImages = useMemo<ImageWithUrl[]>(() => {
    const validation = validateImages(images.map((img) => img.file));
    const oversizedSet = new Set(validation.oversizedFiles);

    return images.map((img) => ({
      id: img.id,
      file: img.file,
      url: URL.createObjectURL(img.file),
      isOversized: oversizedSet.has(img.file.name),
    }));
  }, [images]);

  const validImages = useMemo(
    () => processedImages.filter((img) => !img.isOversized),
    [processedImages],
  );

  const oversizedImages = useMemo(
    () => processedImages.filter((img) => img.isOversized),
    [processedImages],
  );

  // 초기 선택: 유효한 이미지만 선택
  useEffect(() => {
    setSelectedIds(new Set(validImages.map((img) => img.id)));
  }, [validImages]);

  // 서버 검증: oversizedFiles + availableCount 확인 후 토스트 표시
  useEffect(() => {
    const files = images.map((img) => img.file);
    if (!files.length || !albumId) return;

    checkImagesMutate(
      { files, albumId },
      {
        onSuccess: ({ oversizedFiles, availableCount }) => {
          setAvailableCount(availableCount);
          const msgs: string[] = [];
          if (oversizedFiles.length > 0) {
            msgs.push(
              `${oversizedFiles.length}장의 사진이 6MB를 초과하여 선택할 수 없습니다.`,
            );
          }
          if (files.length > availableCount) {
            msgs.push(`최대 ${availableCount}장까지 업로드할 수 있어요.`);
          }
          if (msgs.length) showToast(msgs.join(' '));
        },
        onError: () => {
          showToast('이미지 검증 중 오류가 발생했어요.');
        },
      },
    );
  }, [images, albumId, checkImagesMutate]);

  const toggleSelect = (id: string, isOversized: boolean) => {
    if (isOversized) return; // 6MB 초과는 선택 불가

    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className='w-full px-4'>
      <div className='mt-4 mb-3 flex justify-between'>
        <span className='typo-body-lg-regular text-text-subtle'>
          총 {images.length}장
        </span>
        <span className='typo-body-lg-medium text-text-subtle'>
          {selectedIds.size}/{availableCount ?? '-'}
        </span>
      </div>
      <div
        className='mb-[calc(76px+env(safe-area-inset-bottom))] grid grid-cols-3 gap-2 overflow-y-auto'
        style={{ height: 'calc(100vh - 96px)' }}
      >
        {processedImages.map((img) => {
          const isSelected = selectedIds.has(img.id);
          return (
            <div
              key={img.id}
              className='relative w-full'
              style={{ paddingTop: '100%' }} // 정사각형 박스
              onClick={() => toggleSelect(img.id, img.isOversized)}
            >
              <Image
                src={img.url}
                alt={`이미지 ${img.id}`}
                fill
                className={`absolute top-0 left-0 h-full w-full object-cover ${img.isOversized ? 'opacity-30' : ''} ${!isSelected && !img.isOversized ? 'opacity-50' : ''}`}
              />
              {img.isOversized && (
                <div className='absolute inset-0 flex items-center justify-center bg-black/50'>
                  <span className='text-body-sm-bold text-white'>6MB 초과</span>
                </div>
              )}
              {!img.isOversized && isSelected && (
                <div className='absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500'>
                  <span className='text-white'>✓</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <LongButton
        text={`앨범에 ${selectedIds.size}장 채우기`}
        noFixed={false}
      />
      {toast && (
        <div className='fixed bottom-6 left-1/2 z-[2000] -translate-x-1/2 rounded-md bg-black/80 px-4 py-2 text-white shadow-md'>
          {toast}
        </div>
      )}
    </div>
  );
}
