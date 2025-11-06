'use client';

import { useCheckImages } from '@/feature/create-album/hook/useCheckImages';
import { validateImages } from '@/feature/create-album/utils/validateImages';
import LongButton from '@/global/components/LongButton';
import PhotoBox from '@/global/components/photo/PhotoBox';
import { AlbumToastList } from '@/global/components/toast/AlbumToast';
import { useImageStore } from '@/store/useImageStore';
import { useParams, useRouter } from 'next/navigation';
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
  const router = useRouter();

  // images가 없으면 업로드 페이지로 이동
  useEffect(() => {
    if (images.length === 0 && albumId) {
      router.push(`/album/upload/${albumId}`);
    }
  }, [images, albumId, router]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [availableCount, setAvailableCount] = useState<number | null>(null);
  const [toasts, setToasts] = useState<string[]>([]);
  const { mutate: checkImagesMutate } = useCheckImages();

  const showToast = (message: string) => {
    setToasts((prev) => [...prev, message]);
    // setTimeout(() => {
    //   setToasts((prev) => prev.slice(1));
    // }, 2000);
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
              `6MB를 초과한 사진 ${oversizedFiles.length}장이 제외되었어요`,
            );
          }
          if (files.length > availableCount) {
            msgs.push('지금 앨범에 담을 수 있는 만큼만 선택되었어요');
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
          {selectedIds.size}/{availableCount}
        </span>
      </div>
      <div
        className='mb-[calc(76px+env(safe-area-inset-bottom))] grid grid-cols-3 gap-2 overflow-y-auto'
        style={{ height: 'calc(100vh - 96px)' }}
      >
        {processedImages.map((img) => {
          const isSelected = selectedIds.has(img.id);
          return (
            <div key={img.id} className='relative aspect-square w-full'>
              <PhotoBox
                imageSrc={img.url}
                imageAlt={`이미지 ${img.id}`}
                pressed={isSelected}
                disabled={img.isOversized}
                onPress={() => toggleSelect(img.id, img.isOversized)}
              />
              {img.isOversized && (
                <div className='pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-black/50'>
                  <span className='typo-body-sm-bold text-white'>6MB 초과</span>
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
      {toasts.length > 0 && <AlbumToastList toasts={toasts} />}
    </div>
  );
}
