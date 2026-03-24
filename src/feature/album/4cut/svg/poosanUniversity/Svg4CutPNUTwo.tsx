'use client';

import { useId } from 'react';
import {
  PNU_TWO_DEFS,
  PNU_TWO_INNER_AFTER_PHOTOS,
} from './Svg4CutPNUTwoStatic';

/** viewBox 1080×1920 — PNU One과 동일 슬롯: TL → TR → BR → BL */
const PHOTO_SLOTS = [
  { x: 65, y: 149 },
  { x: 552, y: 78 },
  { x: 552, y: 789 },
  { x: 65, y: 860 },
] as const;

type PhotoUrl = string | null | undefined;

export interface Svg4CutPNUTwoProps {
  width: number | `${number}`;
  height: number | `${number}`;
  photos?: ReadonlyArray<PhotoUrl>;
}

function applyPnuTemplateIds(
  markup: string,
  ids: { clipId: string; patternId: string; imageId: string },
): string {
  return markup
    .replace(/\{\{CLIP_ID\}\}/g, ids.clipId)
    .replace(/\{\{PATTERN_ID\}\}/g, ids.patternId)
    .replace(/\{\{IMAGE_ID\}\}/g, ids.imageId);
}

export default function Svg4CutPNUTwo({
  photos,
  height,
  width,
}: Svg4CutPNUTwoProps) {
  const reactId = useId().replace(/:/g, '');
  const clipId = `pnu2-clip-${reactId}`;
  const patternId = `pnu2-pattern-${reactId}`;
  const imageId = `pnu2-qr-${reactId}`;

  const photoSources = photos ?? [];
  const ids = { clipId, patternId, imageId };

  const innerHtml = applyPnuTemplateIds(PNU_TWO_INNER_AFTER_PHOTOS, ids);
  const defsHtml = applyPnuTemplateIds(PNU_TWO_DEFS, ids);

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
