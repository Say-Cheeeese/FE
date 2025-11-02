import BottomSheetModal from '@/global/components/modal/BottomSheetModal';
import { Download, Heart, Info } from 'lucide-react';
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
    <section className='mx-10 flex justify-around'>
      <BottomSheetModal
        title={'사진 정보'}
        trigger={
          <button>
            <Info width={24} height={24} color='white' />
          </button>
        }
      >
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
      <button>
        <Download width={24} height={24} color='white' />
      </button>
      <BottomSheetModal
        title={'띱 6개'}
        trigger={
          <button className='text-text-basic-inverse typo-body-lg-semibold flex gap-1'>
            <Heart width={24} height={24} color='white' />
            <span>0</span>
          </button>
        }
      >
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
    </section>
  );
}
