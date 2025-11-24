'use client';

import { BodyPortal } from '@/global/components/portal/BodyPortal';
import type { RefObject } from 'react';
import Container4Cut from './Container4Cut';

interface Capture4CutPortalProps {
  captureRef: RefObject<HTMLDivElement | null>;
  visible: boolean;
  albumId: string;
  eventName?: string;
  eventDate?: string;
}

const Capture4CutPortal = ({
  captureRef,
  visible,
  albumId,
  eventName,
  eventDate,
}: Capture4CutPortalProps) => (
  <BodyPortal>
    <div
      ref={captureRef}
      className='pointer-events-none fixed top-0 left-0 select-none'
      style={{
        zIndex: -1,
        opacity: visible ? 1 : 0,
      }}
      aria-hidden
    >
      <Container4Cut
        albumId={albumId}
        eventName={eventName}
        eventDate={eventDate}
        scale={4}
      />
    </div>
  </BodyPortal>
);

export default Capture4CutPortal;
