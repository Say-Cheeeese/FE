'use client';

import type { ReactNode } from 'react';
import FourCutPaperoziFontStyle from './FourCutPaperoziFontStyle';
import { scaleFourCutDesignPx } from './fourCutFrameScale';

export interface FourCutPreviewFrameDefaultProps {
  widthPx: number;
  eventName?: string;
  eventDate?: string;
  isFinalized?: boolean;
  children: ReactNode;
}

/** 기본 치즈 네컷 프레임 (Svg4Cut용) */
export default function FourCutPreviewFrameDefault({
  widthPx,
  eventName,
  eventDate,
  isFinalized = false,
  children,
}: FourCutPreviewFrameDefaultProps) {
  const fontSize = scaleFourCutDesignPx(7.963, widthPx);
  const nameBottom = scaleFourCutDesignPx(7.4, widthPx);
  const nameLeft = scaleFourCutDesignPx(9.6, widthPx);
  const dateBottom = scaleFourCutDesignPx(7.4, widthPx);
  const dateRight = scaleFourCutDesignPx(10.4, widthPx);

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
          className='four-cut-paperozi absolute'
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
          className='four-cut-paperozi absolute'
          style={{
            bottom: dateBottom,
            right: dateRight,
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
