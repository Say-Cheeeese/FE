import BottomSheetModal from '@/global/components/modal/BottomSheetModal';
import ConfirmModal from '@/global/components/modal/ConfirmModal';
import ItemMemberData from './ItemMemberData';
import SectionPhotoData from './SectionPhotoData';

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

interface FooterPhotoDetailProps {}

export default function FooterPhotoDetail({}: FooterPhotoDetailProps) {
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
        <SectionPhotoData
          photoInfo={{
            uploaderName: '임민서',
            takenAt: '2025-06-03T23:59:00Z',
            uploadedAt: '2025-06-04T23:59:00Z',
          }}
          isShowDeleteButton
          onDeleteClick={() => console.log('삭제 버튼 클릭!')}
        />
      </BottomSheetModal>
      <ConfirmModal
        title='사진을 삭제할까요?'
        description='지운 사진은 다시 복구할 수 없어요.'
        cancelText='취소'
        confirmText='삭제하기'
        trigger={<button>버튼</button>}
      />
    </>
  );
}
