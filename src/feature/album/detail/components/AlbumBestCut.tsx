import LongButton from '@/global/components/LongButton';
import BubbleTooltip from '@/global/components/tooltip/BubbleTooltip';
import { useABTestGroup } from '@/global/hooks/useABTestGroup';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AlbumBestCutPhotoList from './AlbumBestCutPhotoList';

import { AlbumDetailMode } from './ScreenAlbumDetail';

const BEST_CUT_TOOLTIP_DISMISSED_KEY = 'best-cut-tooltip-dismissed';

interface AlbumBestCutProps {
  albumId: string;
  photoCount?: number;
  mode: AlbumDetailMode;
}

export default function AlbumBestCut({
  albumId,
  photoCount,
  mode,
}: AlbumBestCutProps) {
  const router = useRouter();
  const abGroup = useABTestGroup();
  const [isBubbleVisible, setIsBubbleVisible] = useState(false);

  useEffect(() => {
    const dismissed =
      window.localStorage.getItem(BEST_CUT_TOOLTIP_DISMISSED_KEY) === 'true';

    setIsBubbleVisible(!dismissed);
  }, []);

  const handleCloseBubble = () => {
    window.localStorage.setItem(BEST_CUT_TOOLTIP_DISMISSED_KEY, 'true');
    setIsBubbleVisible(false);
  };

  if (photoCount === undefined || photoCount === 0) return null;

  return (
    <section className='rounded-xl bg-white'>
      <h2 className='typo-body-lg-semibold text-text-subtle mb-2'>
        앨범 베스트컷
      </h2>

      <div className='mb-3'>
        <AlbumBestCutPhotoList albumId={albumId} />
      </div>

      <div className='relative'>
        <LongButton
          text={
            abGroup === 'A'
              ? '네컷사진 미리보기'
              : abGroup === 'B'
                ? '네컷사진 만들기'
                : '네컷사진 확정하기'
          }
          onClick={() => {
            handleCloseBubble();
            router.push(`/album/4cut/${albumId}`);
          }}
          noFixed
          disabled={photoCount < 4}
          height={48}
        />

        {isBubbleVisible && mode !== 'select' && (
          <BubbleTooltip
            message={
              <span className='flex items-center gap-2 whitespace-nowrap'>
                잠깐! 귀여운데 한 번만 보고가요
                <button
                  type='button'
                  aria-label='버블 닫기'
                  onClick={handleCloseBubble}
                  className='text-text-basic-inverse'
                >
                  <X size={16} />
                </button>
              </span>
            }
            className='absolute top-[calc(100%+10px)] left-1/2 z-10 -translate-x-1/2'
            bubbleClassName='rounded-full bg-surface-inverse px-4 py-2 shadow-none'
            messageClassName='text-text-basic-inverse'
            tailClassName='bg-surface-inverse shadow-none'
            tailPosition='top'
            showBorder={false}
          />
        )}
      </div>
    </section>
  );
}
