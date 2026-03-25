import type { FourCutTemplateId } from './fourCutTemplateTypes';

/** 부산대(PNU) 전용 — 앨범 ID별 네컷 SVG 템플릿 */
const PNU_ALBUM_TEMPLATE_BY_ID: Readonly<Record<string, FourCutTemplateId>> = {
  '1f1277e1-ee95-6fd0-9aa0-cba45c137a2a': 'pnu_one',
  '1f1277e3-75a6-64b1-9aa0-cba45c137a2a': 'pnu_two',
  '1f1277e4-404e-62d2-9aa0-cba45c137a2a': 'pnu_three',
  '1f127ecc-5848-61a4-9583-b1e01df3644f': 'pnu_four',
  '1f127ece-f242-6d36-9583-b1e01df3644f': 'pnu_five',
  '1f127ecf-a23e-6187-9583-b1e01df3644f': 'pnu_six',
  '1f127ed0-47c5-6958-9583-b1e01df3644f': 'pnu_seven',
  '1f126985-3d35-65bf-9aa0-cba45c137a2a': 'pnu_eight',
};

export function getFourCutTemplateForAlbumId(
  albumId: string,
): FourCutTemplateId {
  const key = albumId.trim().toLowerCase();
  return PNU_ALBUM_TEMPLATE_BY_ID[key] ?? 'default';
}
