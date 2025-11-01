interface PhotoInfo {
  uploaderName: string;
  takenAt: string;
  uploadedAt: string;
}

interface SectionPhotoDataProps {
  /** 사진 정보 */
  photoInfo: PhotoInfo;
  /** 삭제 버튼 표시 여부 */
  isShowDeleteButton?: boolean;
  /** 삭제 버튼 클릭 시 실행되는 콜백 */
  onDeleteClick?: () => void;
}

const formatKoreanDateTime = (isoString: string): string => {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return '정보 없음';

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes().toString().padStart(2, '0');

  return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분`;
};

export default function SectionPhotoData({
  photoInfo,
  isShowDeleteButton = false,
  onDeleteClick,
}: SectionPhotoDataProps) {
  return (
    <section className='text-body-lg-medium flex flex-col gap-6 rounded-3xl bg-white px-3 py-2'>
      <dl className='flex flex-col gap-4'>
        <div className='flex items-center justify-between'>
          <dt className='text-text-subtle'>업로드한 사람</dt>
          <dd className='text-text-subtler'>{photoInfo.uploaderName}</dd>
        </div>
        <div className='flex items-center justify-between'>
          <dt className='text-text-subtle'>촬영 시각</dt>
          <dd className='text-text-subtler'>
            {formatKoreanDateTime(photoInfo.takenAt)}
          </dd>
        </div>
        <div className='flex items-center justify-between'>
          <dt className='text-text-subtle'>업로드 시각</dt>
          <dd className='text-text-subtler'>
            {formatKoreanDateTime(photoInfo.uploadedAt)}
          </dd>
        </div>
      </dl>

      {isShowDeleteButton && (
        <button
          type='button'
          onClick={onDeleteClick}
          className='bg-element-gray-lighter text-body-1xl-semibold text-text-error w-full rounded-xl py-4'
        >
          사진 삭제하기
        </button>
      )}
    </section>
  );
}
