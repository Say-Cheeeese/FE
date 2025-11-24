'use client';
import { useGetAlbumInvitation } from '@/feature/album/detail/hooks/useGetAlbumInvitation';
import Toast from '@/global/components/toast/Toast';
import { useCheckAuth } from '@/global/hooks/useCheckAuth';
import { buildQuery } from '@/global/utils/buildQuery';
import { convertUnicodeToEmoji } from '@/global/utils/convertEmoji';
import { formatExpirationTime } from '@/global/utils/time/formatExpirationTime';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface LetterContentProps {
  albumId: string;
}

export default function LetterContent({ albumId }: LetterContentProps) {
  const router = useRouter();
  const { data, isPending, isError } = useGetAlbumInvitation(albumId);
  const { isAuthed } = useCheckAuth();

  if (isPending) return null;
  if (isError) return null;
  if (!data) return null;

  const handleInviteAccept = async () => {
    try {
      if (isAuthed) {
        router.push(
          `/photo-share-entry/${albumId}${buildQuery({ isInvite: true })}`,
        );
      } else {
        router.push(
          `/login${buildQuery({ redirect: encodeURIComponent(`/photo-share-entry/${albumId}${buildQuery({ isInvite: true })}`) })}`,
        );
      }
    } catch (error) {
      Toast.alert('앨범 입장에 실패하였습니다');
    }
  };

  return (
    <>
      <header className='border-border-gray-lighter flex items-center gap-2 border-b px-5 py-5'>
        <Image
          src={data.makerProfileImage}
          width={32}
          height={32}
          alt={data.makerName}
          className='rounded-full'
        />
        <span className='typo-body-lg-semibold text-text-subtler'>
          {data.makerName}
        </span>
      </header>
      <section className='flex flex-col items-center py-8'>
        <div className='bg-element-gray-light mb-4 flex h-20 w-20 items-center justify-center rounded-full text-3xl'>
          <span>{convertUnicodeToEmoji(data.themeEmoji)}</span>
        </div>

        <h2 className='typo-heading-sm-semibold text-text-basic text-center'>
          {data.title}
        </h2>

        <p className='typo-body-sm-regular text-text-subtler pt-1'>
          {data.eventDate}
        </p>

        <span className='typo-caption-sm-medium text-text-basic-inverse bg-element-primary mt-3 inline-flex items-center rounded-full px-2.5 py-1'>
          앨범 소멸까지 {formatExpirationTime(data.expiredAt)}
        </span>

        <button
          onClick={handleInviteAccept}
          type='button'
          className='bg-button-primary-fill typo-body-lg-semibold text-text-inverse mt-8 w-[230px] rounded-[14px] px-6 py-3'
        >
          초대 수락하고 앨범 보기
        </button>
      </section>
    </>
  );
}
