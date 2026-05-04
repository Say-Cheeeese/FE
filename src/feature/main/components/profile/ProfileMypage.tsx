'use client';
import { DEFAULT_PROFILE_IMAGE } from '@/global/constants/images';
import { Pencil } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useGetUserMe } from '../../hooks/useGetUserMe';

interface ProfileMypageProps {}

export default function ProfileMypage({}: ProfileMypageProps) {
  const router = useRouter();
  const { data } = useGetUserMe();

  return (
    <section className='px-5 py-6'>
      <div className='flex gap-4'>
        <div className='flex items-center justify-center overflow-hidden rounded-full'>
          <img
            src={data?.profileImage ?? DEFAULT_PROFILE_IMAGE}
            alt='프로필사진'
            width={80}
            height={80}
            fetchPriority='low'
          />
        </div>

        <div className='flex-1'>
          <div className='mb-1 flex items-center'>
            <div className='flex items-center gap-1.5'>
              <span className='typo-body-lg-semibold text-text-basic'>
                {data?.name ?? '사용자'}
              </span>
              <Link href='/profile/edit' aria-label='프로필 수정'>
                <div className='flex h-5 w-5 items-center justify-center rounded-full bg-[#F1F2F3]'>
                  <Pencil size={14} color='#424349' strokeWidth={2} />
                </div>
              </Link>
            </div>
          </div>
          <div className='grid grid-cols-3 gap-8'>
            <div className='flex flex-col'>
              <span className='typo-heading-sm-semibold text-text-basic'>
                {data?.albumCount ?? 0}
              </span>
              <span className='typo-body-sm-regular text-text-subtle'>
                앨범 수
              </span>
            </div>
            <div className='flex flex-col'>
              <span className='text-text-basic typo-heading-sm-semibold'>
                {data?.photoCount ?? 0}
              </span>
              <span className='typo-body-sm-regular text-text-subtle'>
                올린 사진
              </span>
            </div>
            <div className='flex flex-col'>
              <span className='typo-heading-sm-semibold text-text-basic'>
                {data?.likesCount ?? 0}
              </span>
              <span className='typo-body-sm-regular text-text-subtle'>
                받은 띱
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
