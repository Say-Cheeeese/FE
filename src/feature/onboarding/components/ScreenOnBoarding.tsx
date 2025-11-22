'use client';
import { ProfileAgree } from '@/feature/onboarding/components/ProfileAgree';
import ProfileImage from '@/feature/onboarding/components/ProfileImage';
import { useOnBoardingMutation } from '@/feature/onboarding/hooks/useOnBoardingMutation';
import LogoHeader from '@/global/components/header/LogoHeader';
import LongButton from '@/global/components/LongButton';
import Toast from '@/global/components/toast/Toast';
import XInput from '@/global/components/XInput';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function ScreenOnBoarding() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectedImage, setSelectedImage] = useState<string>('P1');

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

  const { mutate, status } = useOnBoardingMutation();
  const isLoading = status === 'pending';

  const handleSubmit = () => {
    if (!isFormComplete || isLoading) return;
    mutate(
      {
        name: nickname,
        imageCode: selectedImage,
        isServiceAgreement: agreements.terms,
        isUserInfoAgreement: agreements.privacy,
        isMarketingAgreement: agreements.marketing,
        isThirdPartyAgreement: agreements.thirdParty,
      },
      {
        onSuccess: () => {
          router.push('/onboarding/complete');
        },
        onError: (error) => {
          Toast.alert('가입에 실패했어요. 잠시 후 다시 시도해주세요.');
          console.error('온보딩 실패:', error);
        },
      },
    );
  };

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
        text={isLoading ? '가입 처리 중...' : '가입 완료하기'}
        disabled={!isFormComplete || isLoading}
        onClick={handleSubmit}
        bottomGap={20}
        sideGap={16}
      />
    </div>
  );
}
