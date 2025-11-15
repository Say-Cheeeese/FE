import BottomSheetModal from '@/global/components/modal/BottomSheetModal';
import Toast from '@/global/components/toast/Toast';
import { copyToClipboard } from '@/global/utils/copyToClipboard';
import { shareKakao } from '@/global/utils/shareKakao';
import { Copy, Ellipsis, QrCode } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useGetAlbumParticipants } from '../hooks/useGetAlbumParticipants';
import ItemParticipant from './ItemParticipant';

interface AlbumParticipantsProps {
  albumId: string;
}

export default function AlbumParticipants({ albumId }: AlbumParticipantsProps) {
  const router = useRouter();
  const { data, isPending, isError } = useGetAlbumParticipants(albumId);

  if (isPending) return null;
  if (isError) return null;
  if (!data) return null;

  const handleKakaoClick = (): void => {
    shareKakao({
      title: '앨범에 초대해요',
      description: '치이이즈: 추억은 따끈할 때 제맛',
      imageUrl: `${process.env.NEXT_PUBLIC_CLIENT_URL}/assets/og/og_kakao.png`,
      link: `${process.env.NEXT_PUBLIC_CLIENT_URL}/album/entry/${albumId}`,
    });
  };

  const handleMoreClick = (): void => {
    const albumEntryUrl = `${process.env.NEXT_PUBLIC_CLIENT_URL}/album/entry/${albumId}`;
    const shareData = {
      title: `우리 공유앨범에 초대합니다 - 치이이즈`,
      text: '일주일 뒤에는 앨범이 사라져요!',
      url: albumEntryUrl,
    };

    if (navigator.share) {
      navigator.share(shareData);
    } else {
      Toast.alert('이 기능을 지원하지 않는 브라우저입니다.');
    }
  };

  return (
    <section className='rounded-2xl bg-white px-5 py-8'>
      <div className='mb-3.5 flex items-center justify-between gap-3'>
        <div>
          <p className='typo-heading-sm-semibold text-text-subtle'>
            <span className='pr-2'>앨범 참가자</span>
            <span>{`${data.currentParticipantCount}/${data.maxParticipantCount}`}</span>
          </p>
        </div>
        <BottomSheetModal
          trigger={
            <button
              type='button'
              className='typo-body-sm-medium text-text-primary bg-button-primary-fill rounded-[4px] px-3 py-1.5'
            >
              친구 초대
            </button>
          }
        >
          <div className='mx-6 mt-6 mb-10'>
            <div className='pb-8'>
              <h3 className='typo-heading-md-bold text-text-basic mb-1'>
                친구 초대하기
              </h3>
              <span className='typo-body-lg-medium text-text-subtle'>
                사진이 채워지는 동안 친구에게 앨범을 공유해보세요.
              </span>
            </div>
            <div className='typo-body-sm-semibold flex justify-between'>
              <button
                type='button'
                onClick={handleKakaoClick}
                className='flex flex-col items-center justify-center'
              >
                <img
                  src='/icon/icon_kakao.png'
                  alt='카카오톡'
                  width={58}
                  height={58}
                  className='rounded-full'
                />
                <span>카카오톡</span>
              </button>
              <button
                type='button'
                onClick={() => {
                  router.push(`/album/qrcode/${albumId}`);
                }}
                className='flex flex-col items-center justify-center'
              >
                <div className='flex h-[58px] w-[58px] items-center justify-center rounded-full bg-[#fff2c2]'>
                  <QrCode
                    width={24}
                    height={24}
                    color='var(--color-icon-basic)'
                  />
                </div>
                <span>QR코드</span>
              </button>
              <button
                type='button'
                onClick={() => {
                  copyToClipboard(
                    `${process.env.NEXT_PUBLIC_CLIENT_URL}/album/entry/${albumId}`,
                  );
                  Toast.alert('링크가 복사되었습니다.');
                }}
                className='flex flex-col items-center justify-center'
              >
                <div className='flex h-[58px] w-[58px] items-center justify-center rounded-full bg-[#fff2c2]'>
                  <Copy
                    width={24}
                    height={24}
                    color='var(--color-icon-basic)'
                  />
                </div>
                <span>링크복사</span>
              </button>
              <button
                type='button'
                onClick={handleMoreClick}
                className='flex flex-col items-center justify-center'
              >
                <div className='flex h-[58px] w-[58px] items-center justify-center rounded-full bg-[#fff2c2]'>
                  <Ellipsis
                    width={24}
                    height={24}
                    color='var(--color-icon-basic)'
                  />
                </div>
                <span>더보기</span>
              </button>
            </div>
          </div>
        </BottomSheetModal>
      </div>
      <div>
        {data.participants?.map(({ isMe, name, profileImage, role }, index) => (
          <ItemParticipant
            key={index}
            name={name ?? '참여자'}
            isMe={isMe}
            profileImage={profileImage}
            role={role}
          />
        ))}
      </div>
    </section>
  );
}
