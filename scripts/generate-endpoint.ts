// scripts/generate-ep.ts
// Usage:
//  npx ts-node scripts/generate-ep.ts
//  npx ts-node scripts/generate-ep.ts https://dev.say-cheese.me/v3/api-docs
//
// Output:
//  src/api/ep.ts (EP only + PhotoSorting type)

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const SPEC_URL = process.argv[2] || 'https://dev.say-cheese.me/v3/api-docs';
const OUT_FILE = path.join(process.cwd(), 'src/global/api/ep.ts');

type OpenAPI = {
  paths: Record<
    string,
    {
      [method: string]: {
        operationId?: string;
        tags?: string[];
        summary?: string;
        description?: string;
        parameters?: Array<{
          name: string;
          in: 'path' | 'query' | 'header' | 'cookie';
          required?: boolean;
          schema?: { type?: string; enum?: string[] };
        }>;
      };
    }
  >;
};

type Route = { path: string; method: string };

function uniq<T>(arr: T[]) {
  return Array.from(new Set(arr));
}

// --- 그룹 매핑 (경로 prefix 기반 강제 매핑) ---
function groupKeyByPath(p: string): keyof typeof EP_SKELETON {
  if (p.startsWith('/v1/global/')) return 'global';
  if (p.startsWith('/v1/auth/')) return 'auth';
  if (p.startsWith('/v1/user/')) return 'user';
  if (p.startsWith('/v1/cheese4cut/')) return 'cheese4cut';
  if (p.startsWith('/v1/album/')) return 'album';
  if (p.startsWith('/v1/photo/')) return 'photo';
  if (p.startsWith('/internal/')) return 'internal';
  // 기본값: album로 (실제 스펙 상 여기에 안걸림)
  return 'album';
}

// --- 원하는 함수명 규칙 (정확 매핑) ---
function desiredNameFor(pathStr: string, method: string): string | null {
  // Global
  if (pathStr === '/v1/global/health-check') return 'health';

  // Auth
  if (pathStr === '/v1/auth/logout') return 'logout';
  if (pathStr === '/v1/auth/reissue') return 'reissue';
  if (pathStr === '/v1/auth/exchange') return 'exchange';

  // User
  if (pathStr === '/v1/user/agreement') return 'agreement';
  if (pathStr === '/v1/user/me/profile') return 'updateProfile';

  // Album
  if (pathStr === '/v1/album' && method === 'post') return 'create';
  if (/^\/v1\/album\/\{code\}\/enter$/.test(pathStr)) return 'enter';
  if (/^\/v1\/album\/\{code\}\/photos$/.test(pathStr)) return 'photos';
  if (/^\/v1\/album\/\{code\}\/photos\/\{photoId\}$/.test(pathStr))
    return 'photoDetail';
  if (/^\/v1\/album\/\{code\}\/photos\/liked$/.test(pathStr))
    return 'likedPhotos';
  if (/^\/v1\/album\/\{code\}\/participants$/.test(pathStr))
    return 'participants';
  if (/^\/v1\/album\/\{code\}\/invitation$/.test(pathStr)) return 'invitation';
  if (/^\/v1\/album\/\{code\}\/available-count$/.test(pathStr))
    return 'availableCount';

  // Photo
  if (/^\/v1\/photo\/\{photoId\}\/liked$/.test(pathStr)) return 'like';
  if (/^\/v1\/photo\/\{photoId\}\/unliked$/.test(pathStr)) return 'unlike';
  if (pathStr === '/v1/photo/report') return 'reportUploadResult';
  if (pathStr === '/v1/photo/presigned-url') return 'presignedUpload';
  if (pathStr === '/v1/photo/download-url') return 'presignedDownload';

  // Cheese4cut
  if (/^\/v1\/cheese4cut\/\{code\}\/presigned-url$/.test(pathStr))
    return 'presignedUpload';
  if (/^\/v1\/cheese4cut\/\{code\}\/fixed$/.test(pathStr)) return 'finalize';
  if (/^\/v1\/cheese4cut\/\{code\}\/preview$/.test(pathStr)) return 'preview';

  // Internal
  if (pathStr === '/internal/thumbnail/complete') return 'thumbnailComplete';

  return null; // 그 외는 생성 안 함 (요구사항 범위 밖)
}

// --- 함수 시그니처 (경로 파라미터) ---
function paramsSignatureFor(pathStr: string): string {
  // 원하는 타입 시그니처를 정확히 강제
  if (/^\/v1\/album\/\{code\}\/photos\/\{photoId\}$/.test(pathStr)) {
    return '(code: string, photoId: number)';
  }
  if (
    /^\/v1\/album\/\{code\}\//.test(pathStr) ||
    /^\/v1\/cheese4cut\/\{code\}\//.test(pathStr)
  ) {
    return '(code: string)';
  }
  if (/^\/v1\/photo\/\{photoId\}\//.test(pathStr)) {
    return '(photoId: number)';
  }
  return '()';
}

// --- 바디: 템플릿 문자열 경로 ---
function pathTemplateToTs(pathStr: string): string {
  // {param} -> ${param}
  return '`' + pathStr.replace(/{([^}]+)}/g, '${$1}') + '`';
}

// EP 골격 (키 순서 고정)
const EP_SKELETON = {
  global: [] as Route[],
  auth: [] as Route[],
  user: [] as Route[],
  album: [] as Route[],
  photo: [] as Route[],
  cheese4cut: [] as Route[],
  internal: [] as Route[],
};

function sortByDesiredOrder(routes: Route[]) {
  // 그냥 path 기준 정렬(안정적)
  return routes.slice().sort((a, b) => a.path.localeCompare(b.path));
}

function renderGroup(name: keyof typeof EP_SKELETON, routes: Route[]): string {
  const lines: string[] = [];

  // 원하는 엔드포인트만 뽑아 이름 매칭
  sortByDesiredOrder(routes).forEach(({ path: p, method }) => {
    const fn = desiredNameFor(p, method);
    if (!fn) return; // 스펙엔 있지만 요구사항에 없는 건 스킵

    const sig = paramsSignatureFor(p);
    const pathExpr = pathTemplateToTs(p);

    lines.push(`    ${fn}: ${sig} => ${pathExpr},`);
  });

  return `  ${name}: {\n${lines.join('\n')}\n  }`;
}

async function main() {
  console.log(`[generate-ep] Fetching spec: ${SPEC_URL}`);
  const res = await fetch(SPEC_URL);
  if (!res.ok) {
    console.error(
      `[generate-ep] Failed to fetch spec: ${res.status} ${res.statusText}`,
    );
    process.exit(1);
  }

  const spec = (await res.json()) as OpenAPI;
  const groups = JSON.parse(JSON.stringify(EP_SKELETON)) as typeof EP_SKELETON;

  Object.entries(spec.paths).forEach(([p, methods]) => {
    Object.keys(methods).forEach((m) => {
      const method = m.toLowerCase();
      if (
        !['get', 'post', 'put', 'patch', 'delete', 'options', 'head'].includes(
          method,
        )
      )
        return;
      const g = groupKeyByPath(p);
      groups[g].push({ path: p, method });
    });
  });

  const content = `/* AUTO-GENERATED FILE. DO NOT EDIT.
 * Generated by scripts/generate-ep.ts
 */

export const EP = {
${(Object.keys(EP_SKELETON) as Array<keyof typeof EP_SKELETON>)
  .map((g) => renderGroup(g, groups[g]))
  .join(',\n')}
} as const;

// 선택지 Enum(정렬)
export type PhotoSorting = 'POPULAR' | 'CAPTURED_AT' | 'CREATED_AT';
`;

  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  fs.writeFileSync(OUT_FILE, content, 'utf8');
  console.log(`[generate-ep] Wrote ${OUT_FILE}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
