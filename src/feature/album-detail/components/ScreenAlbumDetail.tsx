import BottomSheetModal from '@/global/components/modal/BottomSheetModal';

import ItemMemberData from './ItemMemberData';
import SectionPhotoData from './SectionPhotoData';

interface ScreenAlbumDetailProps {
  albumId: string;
}

export default function ScreenAlbumDetail({ albumId }: ScreenAlbumDetailProps) {
  const mockMembers = [
    {
      id: 'member-1',
      profileImageUrl: '/assets/onboarding/smile1.svg',
      nickname: '테스트',
      isMe: true,
      isMaker: true,
    },
    {
      id: 'member-2',
      profileImageUrl: '/assets/onboarding/smile2.svg',
      nickname: '코코',
      isMe: true,
      isMaker: false,
    },
    {
      id: 'member-3',
      profileImageUrl: '/assets/onboarding/smile3.svg',
      nickname: '멜로',
      isMe: false,
      isMaker: false,
    },
    {
      id: 'member-4',
      profileImageUrl: '/assets/onboarding/smile4.svg',
      nickname: '차차',
      isMe: false,
      isMaker: false,
    },
    {
      id: 'member-5',
      profileImageUrl: '/assets/onboarding/smile1.svg',
      nickname: '도도',
      isMe: false,
      isMaker: false,
    },
    {
      id: 'member-6',
      profileImageUrl: '/assets/onboarding/smile2.svg',
      nickname: '라라',
      isMe: false,
      isMaker: false,
    },
  ];

  return (
    <>
      <BottomSheetModal title={'띱 6개'} trigger={<button>btn</button>}>
        <div className='flex flex-col'>
          {mockMembers.map((member) => (
            <ItemMemberData
              key={member.id}
              profileImageUrl={member.profileImageUrl}
              nickname={member.nickname}
              isMe={member.isMe}
              isMaker={member.isMaker}
            />
          ))}
        </div>
      </BottomSheetModal>

      <BottomSheetModal title={'사진 정보'} trigger={<button>button2</button>}>
        <SectionPhotoData />
      </BottomSheetModal>
    </>
  );
}
