interface SectionPhotoDataProps {
  name?: string;
  captureTime?: string;
  createdAt?: string;
}

// 촬영 시각: 사진 EXIF 시간 그대로 표시 (타임존 변환 안 함)
const formatCaptureTime = (isoString?: string): string => {
  if (!isoString) return '';

  // ISO 문자열에서 직접 파싱 (타임존 변환 없이)
  const match = isoString.match(
    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/,
  );
  if (!match) return '정보 없음';

  const [, year, month, day, hour, minute] = match;

  return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분`;
};

// 업로드 시각: UTC를 로컬 시간(KST)으로 변환
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
  name,
  captureTime,
  createdAt,
}: SectionPhotoDataProps) {
  return (
    <section className='typo-body-lg-medium flex flex-col gap-4 rounded-3xl bg-white px-2 py-2'>
      <dl className='flex flex-col gap-4'>
        <div className='flex items-center justify-between'>
          <dt className='text-text-subtle w-1/3'>업로드한 사람</dt>
          <dd className='text-text-subtler flex-1'>{name}</dd>
        </div>
        <div className='flex items-center justify-between'>
          <dt className='text-text-subtle w-1/3'>촬영 시각</dt>
          <dd className='text-text-subtler flex-1'>
            {formatCaptureTime(captureTime)}
          </dd>
        </div>
        <div className='flex items-center justify-between'>
          <dt className='text-text-subtle w-1/3'>업로드 시각</dt>
          <dd className='text-text-subtler flex-1'>
            {formatKoreanDateTime(createdAt)}
          </dd>
        </div>
      </dl>
    </section>
  );
}
