'use client';

import { useCheckImages } from '@/feature/create-album/hook/useCheckImages';
import { validateImages } from '@/feature/create-album/utils/validateImages';
import LongButton from '@/global/components/LongButton';
import PhotoBox from '@/global/components/photo/PhotoBox';
import { AlbumToastList } from '@/global/components/toast/AlbumToast';
import { usePresignedAndUploadToNCP } from '@/global/hooks/usePresignedAndUploadToNCP';
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
  // presignedAndUploadToNCP를 직접 사용
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

  // usePresignedAndUploadToNCP 훅 사용
  const { mutate: uploadMutate, isPending: isUploading } =
    usePresignedAndUploadToNCP({
      onSuccess: (result) => {
        if (result.failed > 0) {
          showToast(`${result.failed}개 파일 업로드에 실패했어요`);
        } else {
          showToast('모든 사진이 성공적으로 업로드되었어요!');
          // 업로드 성공 시 메인으로 이동
          router.push(`/album/${albumId}/main`);
        }
      },
      onError: () => {
        showToast('Presigned URL 발급 또는 업로드에 실패했어요');
      },
    });

  const showToast = (message: string | string[]) => {
    const messages = Array.isArray(message) ? message : [message];
    messages.forEach((msg) => {
      setToasts((prev) => {
        const next = [...prev, msg];
        const idx = next.length - 1;
        setTimeout(() => {
          setToasts((current) => {
            // idx 위치의 토스트만 제거
            return current.filter((_, i) => i !== idx);
          });
        }, 2000);
        return next;
      });
    });
  };
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

  // const oversizedImages = useMemo(
  //   () => processedImages.filter((img) => img.isOversized),
  //   [processedImages],
  // );

  // 초기 선택: 유효한 이미지 중 availableCount만큼만 선택
  useEffect(() => {
    if (!validImages.length) {
      setSelectedIds(new Set());
      return;
    }
    // availableCount가 없거나 validImages가 availableCount 이하면 전체 선택
    if (!availableCount || validImages.length <= availableCount) {
      setSelectedIds(new Set(validImages.map((img) => img.id)));
    } else {
      // availableCount보다 많으면 앞에서부터 availableCount개만 선택
      setSelectedIds(
        new Set(validImages.slice(0, availableCount).map((img) => img.id)),
      );
    }
  }, [validImages, availableCount]);

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
          if (msgs.length) showToast(msgs);
        },
        onError: () => {
          showToast('이미지 검증 중 오류가 발생했어요.');
        },
      },
    );
  }, [images, albumId, checkImagesMutate]);

  const toggleSelect = (
    id: string,
    isOversized: boolean,
    nextSelected?: boolean,
  ) => {
    if (isOversized) return; // 6MB 초과는 선택 불가

    setSelectedIds((prev) => {
      const updated = new Set(prev);
      if (typeof nextSelected === 'boolean') {
        if (nextSelected) updated.add(id);
        else updated.delete(id);
        return updated;
      }
      // fallback: toggle
      if (updated.has(id)) updated.delete(id);
      else updated.add(id);
      return updated;
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
        className='scrollbar-hide mb-[calc(76px+env(safe-area-inset-bottom))] grid grid-cols-3 gap-[3.5px] overflow-y-auto'
        style={{ maxHeight: 'calc(100vh - 96px)' }}
      >
        {processedImages.map((img) => {
          const isSelected = selectedIds.has(img.id);
          return (
            <div key={img.id} className='relative aspect-square w-full'>
              <div className='absolute inset-0'>
                <PhotoBox
                  imageSrc={img.url}
                  imageAlt={`이미지 ${img.id}`}
                  pressed={isSelected}
                  disabled={img.isOversized}
                  onPress={(next) => {
                    toggleSelect(img.id, img.isOversized, next);
                  }}
                  onDisabledPress={() => {
                    showToast('사진이 6MB를 초과해 업로드할 수 없어요');
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <LongButton
        text={`앨범에 ${selectedIds.size}장 채우기`}
        noFixed={false}
        disabled={isUploading}
        onClick={() => {
          const selectedFiles = processedImages.filter((img) =>
            selectedIds.has(img.id),
          );
          const fileInfos = selectedFiles.map((img) => ({
            fileName: img.file.name,
            fileSize: img.file.size,
            contentType: img.file.type,
          }));
          const files = selectedFiles.map((img) => img.file);

          uploadMutate({
            albumCode: albumId,
            fileInfos,
            files,
          });
        }}
      />
      {toasts.length > 0 && <AlbumToastList toasts={toasts} />}
    </div>
  );
}
