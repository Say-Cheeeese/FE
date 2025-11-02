import CustomHeader from '@/global/components/header/CustomHeader';
import ProfileSetting from './ProfileSetting';
import SettingButtons from './SettingButtons';

interface ScreenMypageProps {}

export default function ScreenMypage({}: ScreenMypageProps) {
  return (
    <>
      <CustomHeader title='설정' />
      <ProfileSetting />
      <SettingButtons />
    </>
  );
}
