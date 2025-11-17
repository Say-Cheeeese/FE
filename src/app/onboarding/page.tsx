import ScreenOnBoarding from '@/feature/onboarding/components/ScreenOnBoarding';
import Spinner from '@/global/components/Spinner';
import { Suspense } from 'react';

export default function OnBoardingPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <ScreenOnBoarding />
    </Suspense>
  );
}
