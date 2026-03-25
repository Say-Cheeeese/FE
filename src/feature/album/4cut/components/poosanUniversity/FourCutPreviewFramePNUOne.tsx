'use client';

import type { ReactNode } from 'react';
import FourCutPaperoziFontStyle from '../FourCutPaperoziFontStyle';
import { scaleFourCutDesignPx } from '../fourCutFrameScale';

export interface FourCutPreviewFramePNUOneProps {
  widthPx: number;
  eventName?: string;
  eventDate?: string;
  isFinalized?: boolean;
  children: ReactNode;
}

/**
 * 부산대(PNU) 전용 네컷 프레임 — 레이아웃·타이포는 이 파일에서만 수정
 * (Svg4CutPNUOne 과 짝)
 */
export default function FourCutPreviewFramePNUOne({
  widthPx,
  eventName,
  eventDate,
  isFinalized = false,
  children,
}: FourCutPreviewFramePNUOneProps) {
  const fontSize = scaleFourCutDesignPx(8.2, widthPx);
  const nameBottom = scaleFourCutDesignPx(28, widthPx);
  const nameLeft = scaleFourCutDesignPx(12, widthPx);
  const dateBottom = scaleFourCutDesignPx(14, widthPx);
  const dateLeft = scaleFourCutDesignPx(12, widthPx);

  return (
    <div
      className='text-text-secondary relative font-medium'
      style={{
        fontSize,
        ...(isFinalized && {
          boxShadow: '0px 0px 25px 5px rgba(0, 0, 0, 0.08)',
        }),
      }}
    >
      {children}

      {eventName && (
        <span
          className='four-cut-paperozi absolute text-white'
          style={{
            bottom: nameBottom,
            left: nameLeft,
            fontSize,
          }}
        >
          {eventName}
        </span>
      )}

      {eventDate && (
        <span
          className='four-cut-paperozi absolute text-white'
          style={{
            bottom: dateBottom,
            left: dateLeft,
            fontSize,
          }}
        >
          {eventDate}
        </span>
      )}

      <FourCutPaperoziFontStyle />
    </div>
  );
}
