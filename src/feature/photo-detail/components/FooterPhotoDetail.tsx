import BottomSheetModal from '@/global/components/modal/BottomSheetModal';
import ConfirmModal from '@/global/components/modal/ConfirmModal';
import { Download, Heart, Info } from 'lucide-react';
import { useState } from 'react';
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
  const [isDeep, setIsDeep] = useState(false);
  const [deepCount, setDeepCount] = useState(0);

  const handleDeepToggle = () => {
    setIsDeep((prev) => !prev);
    setDeepCount((prev) => (isDeep ? prev - 1 : prev + 1));
  };

  return (
    <section className='mx-10 flex shrink-0 justify-around py-5'>
      <BottomSheetModal
        title={'사진 정보'}
        trigger={
          <button className='flex w-12 justify-center'>
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

      {/* UT를 위한 임시 모달 추가 */}
      <ConfirmModal
        title={'성공하였습니다. 확인을 누른 후, 브라우저 창을 닫아주세요.'}
        trigger={
          <button className='flex w-12 justify-center'>
            <Download width={24} height={24} color='white' />
          </button>
        }
      />
      <div className='typo-body-lg-semibold flex w-12 justify-center gap-1'>
        <button type='button' onClick={handleDeepToggle}>
          <Heart
            width={24}
            height={24}
            fill={isDeep ? 'var(--color-icon-primary)' : 'transparent'}
            color={
              isDeep ? 'var(--color-icon-primary)' : 'var(--color-icon-inverse)'
            }
          />
        </button>

        <BottomSheetModal
          title={`띱 ${deepCount}개`}
          trigger={
            <button>
              <span
                className={`${isDeep ? 'text-text-brand' : 'text-text-basic-inverse'}`}
              >
                {deepCount}
              </span>
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
      </div>
    </section>
  );
}
