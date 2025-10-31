'use client';

import exifr from 'exifr'; // ★ 추가
import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';

function generateUUID() {
  if (window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }
  // fallback
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const FILE_SIZE = 2000;

type PreviewItem = {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string; // object URL
  pickedAt: number; // URL 만든 시점 (performance.now) - 디코드 시간 계산용
  createdAt: number; // EXIF(또는 lastModified) 기반 "이미지 생성/촬영 시각"
  createdAtSource: 'exif' | 'file'; // 출처
  loadedAt?: number; // <img> onLoad 시점 (performance.now)
  width?: number;
  height?: number;
};
//  용량계산
function formatBytes(n: number) {
  const u = ['B', 'KB', 'MB', 'GB'];
  let i = 0;
  let v = n;
  while (v >= 1024 && i < u.length - 1) {
    v /= 1024;
    i++;
  }
  return `${v.toFixed(1)} ${u[i]}`;
}
//  날짜 포맷팅
function formatDate(ts: number) {
  const d = new Date(ts);
  // 예: 2025-10-29 11:22:33
  const pad = (x: number) => String(x).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

// EXIF에서 생성시각(촬영시각)을 가져오되, 없으면 file.lastModified로 폴백
async function getImageCreatedMs(
  file: File,
): Promise<{ ts: number; source: 'exif' | 'file' }> {
  try {
    const tags = await exifr.parse(file, {
      pick: ['DateTimeOriginal', 'CreateDate', 'ModifyDate'],
      translateValues: true,
    });

    // 우선순위: DateTimeOriginal > CreateDate > ModifyDate
    const dt: Date | undefined =
      (tags?.DateTimeOriginal as Date | undefined) ??
      (tags?.CreateDate as Date | undefined) ??
      (tags?.ModifyDate as Date | undefined);

    if (dt && typeof dt.getTime === 'function') {
      const ms = dt.getTime();
      if (!Number.isNaN(ms)) return { ts: ms, source: 'exif' };
    }
  } catch {}
  // 스크린샷/편집본/소셜 다운로드 등 EXIF 없음 → 파일 시스템 타임스탬프 사용
  return { ts: file.lastModified, source: 'file' };
}

export default function UploadPreview100() {
  const [items, setItems] = useState<PreviewItem[]>([]);
  const [limit, setLimit] = useState(FILE_SIZE);
  const [loadingCount, setLoadingCount] = useState(0);

  useEffect(() => {
    return () => {
      items.forEach((it) => URL.revokeObjectURL(it.url));
    };
  }, []);

  async function handlePick(e: ChangeEvent<HTMLInputElement>) {
    const fl = e.target.files;
    console.log('이벤트 발생', fl);
    if (!fl) return;

    const files = Array.from(fl)
      .filter((f) => f.type.startsWith('image/'))
      .slice(0, limit);

    // 이전 미리보기 정리
    setItems((prev) => {
      prev.forEach((p) => URL.revokeObjectURL(p.url));
      return [];
    });

    // EXIF 읽기 + 프리뷰 구성 병렬 처리
    const next: PreviewItem[] = await Promise.all(
      files.map(async (f) => {
        const { ts, source } = await getImageCreatedMs(f);
        return {
          id: `${f.name}-${generateUUID()}`, // 중복 파일명 대비
          name: f.name,
          size: f.size,
          type: f.type,
          url: URL.createObjectURL(f),
          pickedAt: performance.now(),
          createdAt: ts,
          createdAtSource: source,
        };
      }),
    );

    setItems(next);
    setLoadingCount(next.length);
  }

  function onImgLoad(i: number, ev: SyntheticEvent<HTMLImageElement>) {
    const el = ev.currentTarget;
    const loadedAt = performance.now();
    setItems((prev) => {
      const cp = [...prev];
      const it = cp[i];
      if (!it) return prev;
      cp[i] = {
        ...it,
        loadedAt,
        width: el.naturalWidth,
        height: el.naturalHeight,
      };
      return cp;
    });
    setLoadingCount((c) => Math.max(0, c - 1));
  }

  const totalBytes = items.reduce((a, b) => a + b.size, 0);
  const loadedItems = items.filter((i) => i.loadedAt);
  const avgDecodeMs = loadedItems.length
    ? Math.round(
        loadedItems.reduce(
          (a, b) => a + Math.max(0, b.loadedAt! - b.pickedAt),
          0,
        ) / loadedItems.length,
      )
    : 0;

  return (
    <div className='mx-auto max-w-6xl space-y-6 p-6'>
      <h1 className='text-2xl font-bold'>
        이미지 {FILE_SIZE}장 동시 업로드(미리보기) 테스트
      </h1>

      <div className='space-y-4 rounded-2xl border p-4'>
        <div className='grid gap-3 sm:grid-cols-3'>
          <div>
            <label className='block text-sm font-medium'>최대 선택 개수</label>
            <input
              type='number'
              min={1}
              max={FILE_SIZE}
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              className='w-full rounded-xl border px-3 py-2'
            />
          </div>
          <div className='flex items-end gap-3 sm:col-span-2'>
            <label
              htmlFor='file-input'
              className='flex w-60 cursor-pointer items-center justify-center rounded-xl border border-gray-400 bg-black px-3 py-2 text-white hover:bg-gray-800'
            >
              이미지 선택
            </label>
            <input
              id='file-input'
              type='file'
              accept='image/*'
              multiple
              onChange={handlePick}
              className='hidden'
            />
          </div>
        </div>

        <div className='grid grid-cols-2 gap-4 rounded-xl bg-gray-50 p-4 text-sm sm:grid-cols-4'>
          <div>
            총 개수: <b>{items.length}</b>
          </div>
          {/* <div>로딩 중 개수: <b>{loadingCount}</b></div> */}
          <div>
            총 용량: <b>{formatBytes(totalBytes)}</b>
          </div>
          <div>
            평균 디코드: <b>{avgDecodeMs} ms</b>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className='columns-3 gap-2 sm:columns-3 lg:columns-4'>
        {items.map((it, i) => (
          <figure
            key={it.id}
            className='mb-4 break-inside-avoid rounded-xl border p-2'
          >
            <img
              src={it.url}
              alt={it.name}
              loading='lazy'
              decoding='async'
              onLoad={(e) => onImgLoad(i, e)}
              className='max-h-[320px] w-full rounded-lg object-cover'
            />
            <figcaption className='mt-2 text-xs text-gray-600'>
              <div className='truncate' title={it.name}>
                {it.name}
              </div>
              <div className='mt-1 flex flex-col gap-0.5'>
                <span>
                  {formatBytes(it.size)} · {it.width ?? '-'}×{it.height ?? '-'}
                </span>
                <span>
                  생성시각:{' '}
                  <b title={String(it.createdAt)}>{formatDate(it.createdAt)}</b>
                  <span className='ml-1 text-[10px] text-gray-500'>
                    ({it.createdAtSource === 'exif' ? 'EXIF' : '파일시스템'})
                  </span>
                </span>
                {/* 디코드 시간 보려면 주석 해제
                {it.loadedAt && (
                  <span>{Math.max(0, Math.round(it.loadedAt - it.pickedAt))} ms</span>
                )} */}
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
