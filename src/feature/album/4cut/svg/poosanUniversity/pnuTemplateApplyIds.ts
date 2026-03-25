/** PNU Three 이상 템플릿 — `Svg4CutPNUThreeStatic` 과 동일 플레이스홀더 치환 */
export type PnuRichTemplateIds = {
  clipId: string;
  patternBgId: string;
  patternBgInnerId: string;
  maskId: string;
  patternQrId: string;
  imageQrId: string;
};

export function applyPnuRichTemplateIds(
  markup: string,
  ids: PnuRichTemplateIds,
): string {
  return markup
    .replace(/\{\{CLIP_ID\}\}/g, ids.clipId)
    .replace(/\{\{PATTERN_BG_ID\}\}/g, ids.patternBgId)
    .replace(/\{\{PATTERN_BG_INNER_ID\}\}/g, ids.patternBgInnerId)
    .replace(/\{\{MASK_ID\}\}/g, ids.maskId)
    .replace(/\{\{PATTERN_QR_ID\}\}/g, ids.patternQrId)
    .replace(/\{\{IMAGE_QR_ID\}\}/g, ids.imageQrId);
}
