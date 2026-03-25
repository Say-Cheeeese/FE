'use client';

import { useId } from 'react';
import {
  PNU_SEVEN_DEFS,
  PNU_SEVEN_INNER_AFTER_PHOTOS,
} from './Svg4CutPNUSevenStatic';
import { applyPnuRichTemplateIds } from './pnuTemplateApplyIds';

const PHOTO_SLOTS = [
  { x: 65, y: 149 },
  { x: 552, y: 78 },
  { x: 552, y: 789 },
  { x: 65, y: 860 },
] as const;

type PhotoUrl = string | null | undefined;

export interface Svg4CutPNUSevenProps {
  width: number | `${number}`;
  height: number | `${number}`;
  photos?: ReadonlyArray<PhotoUrl>;
}

export default function Svg4CutPNUSeven({
  photos,
  height,
  width,
}: Svg4CutPNUSevenProps) {
  const reactId = useId().replace(/:/g, '');
  const clipId = `pnu7-clip-${reactId}`;
  const patternBgId = `pnu7-pattern-bg-${reactId}`;
  const patternBgInnerId = `pnu7-pattern-bg-inner-${reactId}`;
  const maskId = `pnu7-mask-${reactId}`;
  const patternQrId = `pnu7-pattern-qr-${reactId}`;
  const imageQrId = `pnu7-qr-img-${reactId}`;

  const photoSources = photos ?? [];
  const ids = {
    clipId,
    patternBgId,
    patternBgInnerId,
    maskId,
    patternQrId,
    imageQrId,
  };

  const innerHtml = applyPnuRichTemplateIds(PNU_SEVEN_INNER_AFTER_PHOTOS, ids);
  const defsHtml = applyPnuRichTemplateIds(PNU_SEVEN_DEFS, ids);

  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 1080 1920'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
    >
      <g clipPath={`url(#${clipId})`}>
        {PHOTO_SLOTS.map((pos, i) => {
          if (!photoSources[i]) return null;
          return (
            <image
              key={i}
              href={photoSources[i]}
              x={pos.x}
              y={pos.y}
              width='463'
              height='689'
              preserveAspectRatio='xMidYMid slice'
            />
          );
        })}
        <g dangerouslySetInnerHTML={{ __html: innerHtml }} />
      </g>
      <defs dangerouslySetInnerHTML={{ __html: defsHtml }} />
    </svg>
  );
}
