'use client';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ProfileImage from '@/feature/onboarding/components/ProfileImage';
import LogoHeader from '@/global/components/LogoHeader';
import ProfileNameInput from '@/feature/onboarding/components/ProfileNameInput';
import { ProfileAgree } from '@/feature/onboarding/components/ProfileAgree';
import { TermContent } from '@/feature/onboarding/components/TermContent';
import TermHeader from '@/feature/onboarding/components/TermHeader';

export default function OnBoarding() {
  const searchParams = useSearchParams();
  const termType = searchParams.get('term');
  const currentTerm = termType
    ? TermContent[termType as keyof typeof TermContent]
    : null;
  // 프로필 이미지 상태
  const [selectedImage, setSelectedImage] = useState<string>('smile1.svg');

  // 닉네임 상태
  const [nickname, setNickname] = useState<string>('');

  // 동의 상태
  const [agreements, setAgreements] = useState<Record<string, boolean>>({
    terms: false,
    privacy: false,
    thirdParty: false,
    marketing: false,
  });

  // 필수 동의 항목 체크
  const requiredAgreements = ['terms', 'privacy', 'thirdParty'];
  const isRequiredAgreed = requiredAgreements.every((key) => agreements[key]);

  // 모든 필수 입력 완료 확인
  const isFormComplete =
    selectedImage && nickname.trim() !== '' && isRequiredAgreed;

  const handleSubmit = () => {
    if (isFormComplete) {
      console.log('가입 완료:', {
        selectedImage,
        nickname,
        agreements,
      });
      // 가입 완료 API 호출 등
    }
  };

  // 약관 상세가 있을 때 렌더링
  if (currentTerm) {
    return (
      <div className='bg-white min-h-screen'>
        <TermHeader title={currentTerm.title} />
        <div className='pt-[100px] px-5 pb-20 h-full'>
          <currentTerm.content />
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col px-4'>
      <LogoHeader showLogin={false} />
      <ProfileImage
        selectedImage={selectedImage}
        onImageSelect={setSelectedImage}
      />
      <ProfileNameInput nickname={nickname} onNicknameChange={setNickname} />
      <ProfileAgree
        agreements={agreements}
        onAgreementsChange={setAgreements}
      />
      <button
        className={`fixed left-1/2 -translate-x-1/2 bottom-5 h-14 rounded-[8px] w-[calc(100%-32px)] max-w-[368px] ${
          isFormComplete
            ? 'bg-button-primary-fill cursor-pointer'
            : 'bg-button-disabled-fill cursor-not-allowed'
        }`}
        onClick={handleSubmit}
        disabled={!isFormComplete}
      >
        <span
          className={`text-body-1xl-semibold ${
            isFormComplete ? 'text-text-primary' : 'text-text-disabled'
          }`}
        >
          가입 완료하기
        </span>
      </button>
    </div>
  );
}
