'use client';

import type { ReactNode } from 'react';
import FourCutPaperoziFontStyle from '../FourCutPaperoziFontStyle';
import { scaleFourCutDesignPx } from '../fourCutFrameScale';

export interface FourCutPreviewFramePNUThreeProps {
  widthPx: number;
  eventName?: string;
  eventDate?: string;
  isFinalized?: boolean;
  children: ReactNode;
}

/**
 * 부산대(PNU) 네컷 템플릿 3 — 밝은 배경·아이콘 톤에 맞춘 타이포
 * (`Svg4CutPNUThree` 와 짝)
 */
export default function FourCutPreviewFramePNUThree({
  widthPx,
  eventName,
  eventDate,
  isFinalized = false,
  children,
}: FourCutPreviewFramePNUThreeProps) {
  const fontSize = scaleFourCutDesignPx(8.2, widthPx);
  const nameBottom = scaleFourCutDesignPx(28, widthPx);
  const nameLeft = scaleFourCutDesignPx(12, widthPx);
  const dateBottom = scaleFourCutDesignPx(14, widthPx);
  const dateLeft = scaleFourCutDesignPx(12, widthPx);

  return (
    <div
      className='border-border-primary text-text-secondary relative border font-medium'
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
          className='four-cut-paperozi absolute text-[#18191B]'
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
          className='four-cut-paperozi absolute text-[#18191B]'
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
