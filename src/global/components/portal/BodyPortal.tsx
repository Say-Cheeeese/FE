'use client';

import type { ReactNode, ReactPortal } from 'react';
import { createPortal } from 'react-dom';

interface BodyPortalProps {
  children: ReactNode;
  container?: Element;
}

/** Render children into a DOM container (defaults to document.body) */
export function BodyPortal({
  children,
  container,
}: BodyPortalProps): ReactPortal | null {
  if (typeof document === 'undefined') return null;

  return createPortal(children, container ?? document.body);
}
