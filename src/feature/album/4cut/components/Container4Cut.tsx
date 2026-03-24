'use client';

import { useBase64Images } from '@/global/hooks/useBase64Images';
import { useMemo } from 'react';
import Svg4Cut from '../svg/Svg4Cut';
import Svg4CutPNUOne from '../svg/poosanUniversity/Svg4CutPNUOne';
import { use4CutPreviewQuery } from '../hooks/use4CutPreviewQuery';
import FourCutPreviewFrameDefault from './FourCutPreviewFrameDefault';
import {
  FOUR_CUT_BASE_ASPECT_RATIO,
  FOUR_CUT_BASE_WIDTH,
} from './fourCutLayoutConstants';
import FourCutPreviewFramePNUOne from './poosanUniversity/FourCutPreviewFramePNUOne';
import type { FourCutTemplateId } from './fourCutTemplateTypes';

export interface Container4CutProps {
  albumId: string;
  eventName?: string;
  eventDate?: string;
  scale?: number;
  width?: number;
  isFinalized?: boolean;
  /** 기본 프레임 vs 부산대(PNU) 등 — 프레임·SVG 컴포넌트가 함께 바뀜 */
  template?: FourCutTemplateId;
}

export default function Container4Cut({
  albumId,
  eventDate,
  eventName,
  scale = 1,
  width,
  isFinalized = false,
  template = 'default',
}: Container4CutProps) {
  // TODO : openapi type이 이상해서 임시 any처리. 백엔드랑 협의 필요
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data }: any = use4CutPreviewQuery(albumId);

  const images = useMemo(() => {
    return (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data?.previewPhotos?.map((item: any) => item.imageUrl) ??
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data?.photos?.map((item: any) => item.imageUrl) ??
      []
    );
  }, [data]);

  const { base64List } = useBase64Images({ imageUrls: images });

  const calculatedWidth = width ?? FOUR_CUT_BASE_WIDTH * scale;
  const calculatedHeight = calculatedWidth * FOUR_CUT_BASE_ASPECT_RATIO;

  const frameCommon = {
    widthPx: calculatedWidth,
    eventName,
    eventDate,
    isFinalized,
  };

  const svgCommon = {
    width: calculatedWidth,
    height: calculatedHeight,
    photos: base64List,
  };

  if (template === 'pnu_one') {
    return (
      <FourCutPreviewFramePNUOne {...frameCommon}>
        <Svg4CutPNUOne {...svgCommon} />
      </FourCutPreviewFramePNUOne>
    );
  }

  return (
    <FourCutPreviewFrameDefault {...frameCommon}>
      <Svg4Cut {...svgCommon} />
    </FourCutPreviewFrameDefault>
  );
}
