'use client';
import { ProfileAgree } from '@/feature/onboarding/components/ProfileAgree';
import ProfileImage from '@/feature/onboarding/components/ProfileImage';
import { TermContent } from '@/feature/onboarding/components/TermContent';
import CustomHeader from '@/global/components/header/CustomHeader';
import LogoHeader from '@/global/components/header/LogoHeader';
import LongButton from '@/global/components/LongButton';
import XInput from '@/global/components/XInput';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function OnBoardingClient() {
  const searchParams = useSearchParams();
  const termType = searchParams.get('term');
  const currentTerm =
    termType && Object.prototype.hasOwnProperty.call(TermContent, termType)
      ? TermContent[termType as keyof typeof TermContent]
      : null;
  // 프로필 이미지 상태
  const [selectedImage, setSelectedImage] = useState<string>('smile1.svg');

  // 쿼리스트링에서 name 추출
  const nameFromQuery = searchParams.get('name') || '';
  // 닉네임 상태 (쿼리 name이 있으면 기본값으로)
  const [nickname, setNickname] = useState<string>(
    decodeURIComponent(nameFromQuery),
  );

  // 닉네임 에러 상태
  const [nicknameError, setNicknameError] = useState<string>('');

  // 닉네임 변경 핸들러 (validation 포함)
  const handleNicknameChange = (value: string) => {
    // 한글(완성형+자음+모음), 영문, 숫자, 공백만 허용하는 정규식
    const validPattern = /^[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9 ]*$/;

    if (!validPattern.test(value)) {
      setNicknameError('10글자 이내의 한글, 영문, 숫자만 쓸 수 있어요');
    } else {
      setNicknameError('');
    }

    setNickname(value);
  };

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
    selectedImage &&
    nickname.trim() !== '' &&
    nicknameError === '' &&
    isRequiredAgreed;

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
      <div className='min-h-screen bg-white'>
        <CustomHeader title={currentTerm.title} isShowBack={true} />
        <div className='h-full px-5 pt-[24px] pb-20'>
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
      <XInput
        label='이름'
        value={nickname}
        onChange={handleNicknameChange}
        placeholder='친구들이 알아볼 수 있도록 설정해주세요'
        error={nicknameError}
        maxLength={10}
      />

      <ProfileAgree
        agreements={agreements}
        onAgreementsChange={setAgreements}
      />
      <LongButton
        text='가입 완료하기'
        disabled={!isFormComplete}
        onClick={handleSubmit}
        bottomGap={20}
        sideGap={16}
      />
    </div>
  );
}
