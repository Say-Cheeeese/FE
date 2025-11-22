'use client';
import LotateAnimation from '@/../public/assets/upload/3Tags_Fill Album.json';
import CheckNoImgModal from '@/feature/upload/components/CheckNoImgModal';
import CustomHeader from '@/global/components/header/CustomHeader';
import dynamic from 'next/dynamic';
import { useGetAlbumInform } from '../hooks/useGetAlbumInform';
import AlbumInfoHeader from './AlbumInfoHeader';
import AvailableCountBubble from './AvailableCountBubble';
import UploadButton from './UploadButton';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

interface AlbumCard {
  imageUrl: string;
  nickname: string;
  profileUrl: string;
}

// ✅ API 연동 전까지는 상수로 유지
const MOCK_CARDS: AlbumCard[] = [];

interface UploadAlbumPageProps {
  albumId: string;
}

export default function UploadAlbumPage({ albumId }: UploadAlbumPageProps) {
  const { data } = useGetAlbumInform({ code: albumId });
  const cards = MOCK_CARDS; // ✅ 나중에 API 결과로 교체 예정
  const availableCount =
    (data?.maxParticipantCount ?? 0) - (data?.currentParticipantCount ?? 0);
  return (
    <div className='flex flex-col'>
      <CustomHeader title='앨범 채우기' border={false} />
      <main className='flex min-h-[calc(100dvh-72px)] flex-col items-center justify-between pt-6 pb-[calc(20px+env(safe-area-inset-bottom))]'>
        <div className='flex w-full flex-col items-center'>
          {data && (
            <AlbumInfoHeader photoCount={cards.length} albumData={data} />
          )}
          <Lottie
            animationData={LotateAnimation}
            loop
            autoplay
            className='mt-[6.1vh] h-full w-full'
          />
        </div>

        <div className='flex w-full flex-col items-center'>
          {data?.myRole !== 'MAKER' ? (
            <AvailableCountBubble availableCount={availableCount} />
          ) : (
            <span className='typo-body-sm-medium text-text-secondary mb-3'>
              Tip. 첫 업로드가 참여도를 두 배 넘게 끌려올려요
            </span>
          )}
          <UploadButton albumId={albumId} />
          <CheckNoImgModal
            albumId={albumId}
            trigger={
              <button
                type='button'
                className='typo-body-sm-medium text-text-subtler mt-3'
              >
                올릴 사진이 없어요
              </button>
            }
          />
        </div>
      </main>
    </div>
  );
}
