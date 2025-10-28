import CustomHeader from '@/global/components/CustomHeader';
import ProfileSetting from './ProfileSetting';

interface ScreenMypageProps {}

export default function ScreenMypage({}: ScreenMypageProps) {
  return (
    <>
      <CustomHeader title='설정' />
      <ProfileSetting />
    </>
  );
}
