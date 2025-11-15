'use client';
import { useGetAlbumInvitation } from '@/feature/album/detail/hooks/useGetAlbumInvitation';
import { convertUnicodeToEmoji } from '@/global/utils/convertEmoji';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface FullSizeLetterProps {
  albumId: string;
}

export default function FullSizeLetter({ albumId }: FullSizeLetterProps) {
  const router = useRouter();

  const { data, isPending, isError } = useGetAlbumInvitation(albumId);

  if (isPending) return null;
  if (isError) return null;

  return (
    <>
      {/* 편지지 */}
      <div className='border-border-primary-lighter relative z-10 mx-9 mt-20 rounded-[20px] border bg-white pb-100 shadow-[0_12px_40px_rgba(0,0,0,0.08)]'>
        <header className='border-border-gray-lighter flex items-center gap-2 border-b px-5 py-5'>
          <Image
            src={data?.makerProfileImage ?? '/icon/error-image.svg'}
            width={32}
            height={32}
            alt={data?.makerName ?? '프로필 사진'}
            className='rounded-full'
          />
          <span className='typo-body-lg-semibold text-text-subtler'>맹쏘</span>
        </header>

        <section className='flex flex-col items-center py-8'>
          <div className='bg-element-gray-light mb-4 flex h-20 w-20 items-center justify-center rounded-full text-3xl'>
            <span>
              {data?.themeEmoji
                ? convertUnicodeToEmoji(data?.themeEmoji)
                : '😀'}
            </span>
          </div>

          <h2 className='typo-heading-sm-semibold text-text-basic text-center'>
            {data?.title}
          </h2>

          <p className='typo-body-sm-regular text-text-subtler pt-1'>
            {data?.eventDate}
          </p>

          <span className='typo-caption-sm-medium text-text-basic-inverse bg-element-primary mt-3 inline-flex items-center rounded-full px-2.5 py-1'>
            {/* TODO : 삭제까지 얼마나 남았는지 백엔드로부터 받아야함. */}
            앨범 소멸까지 2시간 5분
          </span>

          <button
            onClick={() => router.push(`/album/upload/${albumId}`)}
            type='button'
            className='bg-button-primary-fill typo-body-lg-semibold text-text-inverse mt-8 w-[230px] rounded-[14px] px-6 py-3'
          >
            초대 수락하고 앨범 보기
          </button>
        </section>
      </div>

      {/* 뒷편지봉투 svg */}
      <svg
        className='fixed bottom-0 left-0 z-0 w-full'
        viewBox='0 0 393 400'
        preserveAspectRatio='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M0 164.5L196.5 0L393 164.5L393 399.5H0.000184298L0 164.5Z'
          fill='var(--color-element-letter)'
        />
      </svg>
      {/* 앞편지봉투 svg */}
      <img
        src='/assets/album/letter-full-size.svg'
        alt='편지 배경'
        className='fixed bottom-[-10px] z-20 w-full object-cover'
      />
    </>
  );
}
