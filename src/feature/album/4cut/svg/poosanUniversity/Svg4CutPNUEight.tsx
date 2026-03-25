'use client';

import { useId } from 'react';
import { applyPnuRichTemplateIds } from './pnuTemplateApplyIds';
import {
  PNU_EIGHT_DEFS,
  PNU_EIGHT_INNER_AFTER_PHOTOS,
} from './Svg4CutPNUEightStatic';

const PHOTO_SLOTS = [
  { x: 65, y: 149 },
  { x: 552, y: 78 },
  { x: 552, y: 789 },
  { x: 65, y: 860 },
] as const;

export interface Svg4CutPNUEightProps {
  width: number | `${number}`;
  height: number | `${number}`;
  photos?: ReadonlyArray<string | null | undefined>;
}

export default function Svg4CutPNUEight({
  photos,
  height,
  width,
}: Svg4CutPNUEightProps) {
  const reactId = useId().replace(/:/g, '');
  const clipId = `pnu8-clip-${reactId}`;
  const patternBgId = `pnu8-pattern-bg-${reactId}`;
  const patternBgInnerId = `pnu8-pattern-bg-inner-${reactId}`;
  const maskId = `pnu8-mask-${reactId}`;
  const patternQrId = `pnu8-pattern-qr-${reactId}`;
  const imageQrId = `pnu8-qr-img-${reactId}`;

  const photoSources = photos ?? [];
  const ids = {
    clipId,
    patternBgId,
    patternBgInnerId,
    maskId,
    patternQrId,
    imageQrId,
  };

  const innerHtml = applyPnuRichTemplateIds(PNU_EIGHT_INNER_AFTER_PHOTOS, ids);
  const defsHtml = applyPnuRichTemplateIds(PNU_EIGHT_DEFS, ids);

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
