'use client';

import { useId } from 'react';
import {
  PNU_FIVE_DEFS,
  PNU_FIVE_INNER_AFTER_PHOTOS,
} from './Svg4CutPNUFiveStatic';
import { applyPnuRichTemplateIds } from './pnuTemplateApplyIds';

const PHOTO_SLOTS = [
  { x: 65, y: 149 },
  { x: 552, y: 78 },
  { x: 552, y: 789 },
  { x: 65, y: 860 },
] as const;

type PhotoUrl = string | null | undefined;

export interface Svg4CutPNUFiveProps {
  width: number | `${number}`;
  height: number | `${number}`;
  photos?: ReadonlyArray<PhotoUrl>;
}

export default function Svg4CutPNUFive({
  photos,
  height,
  width,
}: Svg4CutPNUFiveProps) {
  const reactId = useId().replace(/:/g, '');
  const clipId = `pnu5-clip-${reactId}`;
  const patternBgId = `pnu5-pattern-bg-${reactId}`;
  const patternBgInnerId = `pnu5-pattern-bg-inner-${reactId}`;
  const maskId = `pnu5-mask-${reactId}`;
  const patternQrId = `pnu5-pattern-qr-${reactId}`;
  const imageQrId = `pnu5-qr-img-${reactId}`;

  const photoSources = photos ?? [];
  const ids = {
    clipId,
    patternBgId,
    patternBgInnerId,
    maskId,
    patternQrId,
    imageQrId,
  };

  const innerHtml = applyPnuRichTemplateIds(PNU_FIVE_INNER_AFTER_PHOTOS, ids);
  const defsHtml = applyPnuRichTemplateIds(PNU_FIVE_DEFS, ids);

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
