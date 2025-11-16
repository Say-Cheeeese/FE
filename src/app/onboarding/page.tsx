import OnBoardingScreen from '@/feature/onboarding/components/OnBoardingScreen';
import Spinner from '@/global/components/Spinner';
import { Suspense } from 'react';

export default function OnBoardingPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <OnBoardingScreen />
    </Suspense>
  );
}
