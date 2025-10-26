import Image from 'next/image';

interface ProfileMypageProps {}

export default function ProfileMypage({}: ProfileMypageProps) {
  return (
    <section className='mx-auto max-w-[430px] px-5 py-4'>
      <div className='flex items-center gap-4'>
        <div className='flex w-20 items-center justify-center overflow-hidden rounded-full'>
          <Image
            src='/assets/onboarding/smile1.svg'
            alt='프로필사진'
            width={80}
            height={80}
            priority
          />
        </div>

        <div className='flex-1'>
          <div className='mb-2'>
            <span className='text-body-lg-semibold text-gray-900'>제리</span>
          </div>

          <div className='grid grid-cols-3 gap-6'>
            <div className='flex flex-col'>
              <span className='text-heading-sm-semibold text-text-basic'>
                21
              </span>
              <span className='text-body-sm-regular text-gray-500'>
                앨범 수
              </span>
            </div>
            <div className='flex flex-col'>
              <span className='text-text-basic text-heading-sm-semibold'>
                203
              </span>
              <span className='text-body-sm-regular text-gray-500'>
                올린 사진
              </span>
            </div>
            <div className='flex flex-col'>
              <span className='text-heading-sm-semibold text-text-basic'>
                441
              </span>
              <span className='text-body-sm-regular text-gray-500'>
                받은 띱
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
