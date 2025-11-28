import { EP } from '@/global/api/ep';
import ConfirmModal from '@/global/components/modal/ConfirmModal';
import { useQueryClient } from '@tanstack/react-query';
import { useDeleteAlbumPhotoMutation } from '../hooks/useDeleteAlbumPhotoMutation';
import { usePhotoDetailQuery } from '../hooks/usePhotoDetailQuery';

interface SectionPhotoDataProps {
  albumId: string;
  photoId: number;
  onAfterDelete?: () => void;
}

const formatKoreanDateTime = (isoString?: string): string => {
  if (!isoString) return '';

  // If the string doesn't end with Z and doesn't have a timezone offset, assume it's UTC
  const targetDate =
    !isoString.endsWith('Z') && !/[+-]\d{2}:\d{2}$/.test(isoString)
      ? `${isoString}Z`
      : isoString;

  const date = new Date(targetDate);
  if (Number.isNaN(date.getTime())) return '정보 없음';

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes().toString().padStart(2, '0');

  return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분`;
};

export default function SectionPhotoData({
  albumId,
  photoId,
  onAfterDelete,
}: SectionPhotoDataProps) {
  const queryClient = useQueryClient();
  const { data, isPending, isError } = usePhotoDetailQuery({
    albumId,
    photoId,
  });
  const { mutateAsync } = useDeleteAlbumPhotoMutation();

  if (isPending) return null;
  if (isError) return null;

  const handleDeleteClick = async () => {
    try {
      await mutateAsync({ albumId, photoId });
      queryClient.invalidateQueries({ queryKey: [EP.album.photos(albumId)] });
    } finally {
      onAfterDelete?.();
    }
  };

  return (
    <section className='typo-body-lg-medium flex flex-col gap-6 rounded-3xl bg-white py-2'>
      <dl className='flex flex-col gap-4 px-2'>
        <div className='flex items-center justify-between'>
          <dt className='text-text-subtle w-1/3'>업로드한 사람</dt>
          <dd className='text-text-subtler flex-1'>{data?.name}</dd>
        </div>
        <div className='flex items-center justify-between'>
          <dt className='text-text-subtle w-1/3'>촬영 시각</dt>
          <dd className='text-text-subtler flex-1'>
            {formatKoreanDateTime(data?.captureTime)}
          </dd>
        </div>
        <div className='flex items-center justify-between'>
          <dt className='text-text-subtle w-1/3'>업로드 시각</dt>
          <dd className='text-text-subtler flex-1'>
            {formatKoreanDateTime(data?.createdAt)}
          </dd>
        </div>
      </dl>

      {data?.canDelete && (
        <ConfirmModal
          title='사진을 삭제할까요?'
          description='지운 사진은 다시 복구할 수 없어요.'
          cancelText='취소'
          confirmText='삭제하기'
          confirmClassName='text-text-basic-inverse bg-button-accent-fill active:bg-button-accent-pressed active:text-basic-inverse'
          onConfirm={handleDeleteClick}
          trigger={
            <button
              type='button'
              className='bg-element-gray-lighter typo-body-1xl-semibold text-text-error w-full rounded-[8px] py-4'
            >
              사진 삭제하기
            </button>
          }
        />
      )}
    </section>
  );
}
