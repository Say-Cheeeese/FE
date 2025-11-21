import ScreenTerm from '@/feature/term/ScreenTerm';
import Spinner from '@/global/components/Spinner';
import { Suspense } from 'react';

export default function TermPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <ScreenTerm />
    </Suspense>
  );
}
