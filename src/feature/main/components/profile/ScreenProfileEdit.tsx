'use client';
import ProfileImage from '@/feature/onboarding/components/ProfileImage';
import { useGetAllProfiles } from '@/feature/onboarding/hooks/useGetAllProfile';
import CustomHeader from '@/global/components/header/CustomHeader';
import LongButton from '@/global/components/LongButton';
import Toast from '@/global/components/toast/Toast';
import XInput from '@/global/components/XInput';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useGetUserMe } from '../../hooks/useGetUserMe';
import { useUpdateName, useUpdateProfileImage } from '../../hooks/useUpdateProfile';

export default function ScreenProfileEdit() {
  const router = useRouter();
  const { data } = useGetUserMe();
  const { data: profileImages } = useGetAllProfiles();
  const [name, setName] = useState(data?.name ?? '');
  const [selectedImage, setSelectedImage] = useState<string>('');

  const { mutateAsync: updateName } = useUpdateName();
  const { mutateAsync: updateProfileImage } = useUpdateProfileImage();
  const [isUpdating, setIsUpdating] = useState(false);

  // 데이터가 로드되면 초기값 설정
  useEffect(() => {
    if (data?.name && !name) {
      setName(data.name);
    }

    // 현재 프로필 이미지 URL과 일치하는 코드를 찾아 selectedImage 초기화
    if (data?.profileImage && profileImages?.opts && !selectedImage) {
      const match = profileImages.opts.find(opt => opt.profileImageUrl === data.profileImage);
      if (match?.imageCode) {
        setSelectedImage(match.imageCode);
      }
    }
  }, [data, profileImages, name, selectedImage]);

  const initialImageCode = data?.profileImage && profileImages?.opts
    ? profileImages.opts.find(opt => opt.profileImageUrl === data.profileImage)?.imageCode
    : '';

  const isNameChanged = name !== data?.name;
  const isImageChanged = selectedImage !== initialImageCode && selectedImage !== '';
  const isChanged = isNameChanged || isImageChanged;

  const handleSubmit = async () => {
    if (!isChanged || isUpdating) return;

    setIsUpdating(true);
    try {
      const promises = [];

      if (isNameChanged) {
        promises.push(updateName({ name }));
      }

      if (isImageChanged) {
        promises.push(updateProfileImage({ imageCode: selectedImage }));
      }

      await Promise.all(promises);
      Toast.check('정보가 수정되었습니다.');
    } catch (error) {
      Toast.alert('수정에 실패했습니다. 다시 시도해주세요.');
      console.error('Update failed:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <main className='min-h-screen bg-white'>
      <CustomHeader
        title='프로필 편집'
        isShowBack
        onBackClick={() => router.push('/main')}
      />

      <section className='px-4 pt-10 pb-[100px]'>
        <div className='flex flex-col items-center gap-10'>

          {/* 프로필 이미지 수정 영역 (onboarding 컴포넌트 재사용) */}
          <ProfileImage
            selectedImage={selectedImage}
            onImageSelect={setSelectedImage}
          />

          <div className='flex w-full max-w-[361px] flex-col gap-6'>
            <XInput
              label='이름'
              value={name}
              onChange={setName}
              placeholder='이름을 입력하세요'
            />

            {/* 전화번호 (데이터가 있을 경우에만 노출, 수정 불가) */}
            {(data as any)?.phoneNumber && (
              <XInput
                label='전화번호'
                value={(data as any).phoneNumber}
                onChange={() => {}}
                disabled
                showClear={false}
              />
            )}

            {/* 카카오계정 (수정 불가) */}
            <XInput
              label='카카오계정'
              value={data?.email ?? ''}
              onChange={() => {}}
              disabled
              showClear={false}
              placeholder='카카오계정 정보가 없습니다'
            />
          </div>
        </div>
      </section>

      <LongButton
        text={isUpdating ? '수정 중...' : '정보 수정하기'}
        disabled={!name.trim() || !isChanged || isUpdating}
        onClick={handleSubmit}
      />
    </main>
  );
}
