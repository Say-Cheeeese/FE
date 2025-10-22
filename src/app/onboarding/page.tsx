import OnBoardingMain from '@/feature/onboarding/components/ProfileNameInput';
import ProfileImage from '@/feature/onboarding/components/ProfileImage';
import LogoHeader from '@/global/components/LogoHeader';
import ProfileNameInput from '@/feature/onboarding/components/ProfileNameInput';

export default function OnBoarding() {
  return (
    <div className='flex flex-col px-4'>
      <LogoHeader showLogin={false} />
      <ProfileImage />
      <ProfileNameInput />
    </div>
  );
}
