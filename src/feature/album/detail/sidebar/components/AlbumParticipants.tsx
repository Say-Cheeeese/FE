import { useGetAlbumInform } from '@/feature/upload/hooks/useGetAlbumInform';
import BottomSheetModal from '@/global/components/modal/BottomSheetModal';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import BottomSheetContentShare from './BottomSheetContentShare';
import ItemParticipant from './ItemParticipant';

interface AlbumParticipantsProps {
  albumId: string;
}

export default function AlbumParticipants({ albumId }: AlbumParticipantsProps) {
  const { data, isPending, isError } = useGetAlbumInform({ code: albumId });
  const [isEditMode, setIsEditMode] = useState(false);

  if (isPending) return null;
  if (isError) return null;
  if (!data) return null;

  // 편집 모드일 때는 나를 제외한 나머지 참여자만 필터링
  const filteredParticipants = isEditMode
    ? data.participants?.filter((p) => !p.isMe)
    : data.participants;

  return (
    <section className='bg-background-white rounded-[12px] px-5 pt-5 pb-7'>
      <div className='mb-3.5 flex items-center justify-between gap-3'>
        <div>
          <p className='typo-heading-sm-semibold text-text-subtle'>
            <span className='pr-2'>앨범 참가자</span>
            <span>{`${data.currentParticipantCount}/${data.maxParticipantCount}`}</span>
          </p>
        </div>
        <div className='flex gap-2'>
          {!data.isExpired && (
            <button
              onClick={() => setIsEditMode(!isEditMode)}
              type='button'
              className='typo-body-sm-medium text-text-subtle bg-button-tertiary-fill rounded-[4px] px-3 py-1.5'
            >
              {isEditMode ? '완료' : '편집'}
            </button>
          )}
        </div>
      </div>
      <div>
        {/* 편집 모드가 아닐 때 초대하기 버튼 */}
        {!isEditMode && !data.isExpired && (
          <BottomSheetModal
            trigger={
              <button
                type='button'
                className='flex w-full items-center gap-3 py-2'
              >
                <div className='flex h-9 w-9 items-center justify-center rounded-full bg-[#F1F2F3]'>
                  <Plus width={20} height={20} color='#000' />
                </div>
                <div className='typo-body-lg-medium text-text-subtler'>
                  초대하기
                </div>
              </button>
            }
          >
            <BottomSheetContentShare albumId={albumId} />
          </BottomSheetModal>
        )}
        {filteredParticipants?.map(({ isMe, name, profileImage, role }) => (
          <ItemParticipant
            key={`${name}-${profileImage}-${role}`}
            name={name ?? '참여자'}
            isMe={isMe}
            profileImage={profileImage}
            role={role}
            isEditMode={isEditMode}
          />
        ))}
      </div>
    </section>
  );
}
