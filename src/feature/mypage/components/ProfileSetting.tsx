'use client';
import { useGetUserMe } from '@/feature/main/hooks/useGetUserMe';
import { DEFAULT_PROFILE_IMAGE } from '@/global/constants/images';

interface ProfileSettingProps {}

export default function ProfileSetting({}: ProfileSettingProps) {
  const { data } = useGetUserMe();

  return (
    <section className='border-divider-gray-light border-b-[6px]'>
      <div className='bg-white px-5 py-6'>
        <div className='flex items-center gap-4'>
          <div className='h-20 w-20 overflow-hidden rounded-full'>
            <img
              src={data?.profileImage ?? DEFAULT_PROFILE_IMAGE}
              alt='프로필 이미지'
              width={80}
              height={80}
              className='h-full w-full object-cover'
            />
          </div>

          <div className='flex flex-col gap-[2px]'>
            <h2 className='typo-heading-sm-semibold text-text-basic'>
              {data?.name}
            </h2>
            <p className='typo-body-lg-regular text-text-disabled'>email</p>
          </div>
        </div>
      </div>
    </section>
  );
}
