import { useGetAlbumInform } from '@/feature/upload/hooks/useGetAlbumInform';
import BottomSheetModal from '@/global/components/modal/BottomSheetModal';
import { GA_EVENTS } from '@/global/constants/gaEvents';
import { trackGaEvent } from '@/global/utils/trackGaEvent';
import BottomSheetContentShare from './BottomSheetContentShare';
import ItemParticipant from './ItemParticipant';

interface AlbumParticipantsProps {
  albumId: string;
}

export default function AlbumParticipants({ albumId }: AlbumParticipantsProps) {
  const { data, isPending, isError } = useGetAlbumInform({ code: albumId });

  if (isPending) return null;
  if (isError) return null;
  if (!data) return null;

  const accessType = data.myRole;

  const handleClick = () => {
    if (!accessType) {
      trackGaEvent(GA_EVENTS.click_invite, {
        album_id: albumId,
        access_type: accessType === 'MAKER' ? 'creator' : 'member',
      });
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
        {!data.isExpired && (
          <BottomSheetModal
            trigger={
              <button
                type='button'
                className='typo-body-sm-medium text-text-primary bg-button-primary-fill rounded-[4px] px-3 py-1.5'
                onClick={handleClick}
              >
                친구 초대
              </button>
            }
          >
            <BottomSheetContentShare
              albumId={albumId}
              accessType={accessType}
            />
          </BottomSheetModal>
        )}
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
