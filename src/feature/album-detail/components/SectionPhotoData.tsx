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

const mockPhotoInfo = {
  uploaderName: '임민서',
  takenAt: '2025-06-03T23:59:00Z',
  uploadedAt: '2025-06-04T23:59:00Z',
};

interface SectionPhotoDataProps {}

export default function SectionPhotoData({}: SectionPhotoDataProps) {
  return (
    <section className='text-body-lg-medium flex flex-col gap-6 rounded-3xl bg-white px-3 py-2'>
      <dl className='flex flex-col gap-4'>
        <div className='flex items-center justify-between'>
          <dt className='text-text-subtle'>업로드한 사람</dt>
          <dd className='text-text-subtler'>{mockPhotoInfo.uploaderName}</dd>
        </div>
        <div className='flex items-center justify-between'>
          <dt className='text-text-subtle'>촬영 시각</dt>
          <dd className='text-text-subtler'>
            {formatKoreanDateTime(mockPhotoInfo.takenAt)}
          </dd>
        </div>
        <div className='flex items-center justify-between'>
          <dt className='text-text-subtle'>업로드 시각</dt>
          <dd className='text-text-subtler'>
            {formatKoreanDateTime(mockPhotoInfo.uploadedAt)}
          </dd>
        </div>
      </dl>

      <button
        type='button'
        className='bg-element-gray-lighter text-body-1xl-semibold text-text-error w-full rounded-xl py-4'
      >
        사진 삭제하기
      </button>
    </section>
  );
}
