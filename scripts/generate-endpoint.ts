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

type Route = { path: string; method: string };

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

// ...위쪽 동일

type Schema =
  | {
      type?: string;
      enum?: any[];
      items?: Schema;
      properties?: Record<string, Schema>;
      required?: string[];
      allOf?: Schema[];
      oneOf?: Schema[];
      anyOf?: Schema[];
      $ref?: string;
      additionalProperties?: boolean | Schema;
      description?: string;
    }
  | any;

// [ADD] OpenAPI 확장
type OpenAPI = {
  paths: Record<
    string,
    Record<
      string,
      {
        operationId?: string;
        tags?: string[];
        summary?: string;
        description?: string;
        parameters?: Array<{
          name: string;
          in: 'path' | 'query' | 'header' | 'cookie';
          required?: boolean;
          schema?: Schema;
        }>;
        requestBody?: {
          content?: Record<string, { schema?: Schema }>;
        };
        responses?: Record<
          string,
          {
            description?: string;
            content?: Record<string, { schema?: Schema }>;
          }
        >;
      }
    >
  >;
  components?: {
    schemas?: Record<string, Schema>;
  };
};

// [ADD] 파스칼 케이스 유틸(안전하게 이름 정리)
function toPascalCase(s: string) {
  return s
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join('');
}

// [ADD] Components 타입 이름 규칙 (Schema 접미사)
function componentTypeName(raw: string) {
  return `${toPascalCase(raw)}Schema`;
}

// [CHANGE] $ref 해석 시 components 타입명 치환
function resolveRef(ref: string) {
  // '#/components/schemas/Foo' 형태만 지원
  const parts = ref.split('/');
  const raw = parts[parts.length - 1];
  return componentTypeName(raw); // <-- 여기!
}

// [CHANGE] components.schemas -> 타입 생성 시 이름 변경
function generateComponentsTypes(components: Record<string, Schema>): string {
  const lines: string[] = [];
  Object.entries(components).forEach(([name, schema]) => {
    const ts = schemaToTs(schema, components, name);
    const outName = componentTypeName(name); // <-- 여기!

    const isObjectLike = /^\{\s/.test(ts);
    if (isObjectLike) {
      lines.push(`export interface ${outName} ${ts}`);
    } else {
      lines.push(`export type ${outName} = ${ts};`);
    }
  });
  return lines.join('\n');
}
// [ADD] 스키마 -> TS 변환기 (기본형/enum/array/object/$ref)
function schemaToTs(
  schema: Schema | undefined,
  components: Record<string, Schema>,
  inlineNameHint?: string,
): string {
  if (!schema) return 'unknown';

  // $ref
  if (schema.$ref) {
    return resolveRef(schema.$ref);
  }

  // allOf (간단히 & 교차)
  if (schema.allOf && schema.allOf.length > 0) {
    return schema.allOf.map((s: any) => schemaToTs(s, components)).join(' & ');
  }

  // oneOf/anyOf (간단히 union)
  if (
    (schema.oneOf && schema.oneOf.length) ||
    (schema.anyOf && schema.anyOf.length)
  ) {
    const arr = (schema.oneOf ?? schema.anyOf)!;
    return arr.map((s: any) => schemaToTs(s, components)).join(' | ');
  }

  // enum
  if (schema.enum && schema.enum.length) {
    return schema.enum
      .map((v: any) => (typeof v === 'string' ? JSON.stringify(v) : `${v}`))
      .join(' | ');
  }

  const t = schema.type;

  if (
    t === 'string' ||
    t === 'number' ||
    t === 'integer' ||
    t === 'boolean' ||
    t === 'null'
  ) {
    if (t === 'integer') return 'number';
    return t === 'null' ? 'null' : t;
  }

  if (t === 'array') {
    const it = schema.items ? schemaToTs(schema.items, components) : 'unknown';
    return `${it}[]`;
  }

  if (t === 'object' || schema.properties || schema.additionalProperties) {
    const props = schema.properties ?? {};
    const req = new Set(schema.required ?? []);
    const body: string[] = [];

    for (const [k, v] of Object.entries(props)) {
      const optional = req.has(k) ? '' : '?';
      body.push(
        `${JSON.stringify(k)}${optional}: ${schemaToTs(v, components, k)};`,
      );
    }

    // index signature
    if (schema.additionalProperties) {
      const ap =
        schema.additionalProperties === true
          ? 'unknown'
          : schemaToTs(schema.additionalProperties, components);
      body.push(`[key: string]: ${ap};`);
    }

    return `{ ${body.join(' ')} }`;
  }

  // fallback
  return 'unknown';
}

// [ADD] 응답 스키마 추출(200/201/2xx 우선)
function pickSuccessResponseSchema(op: any): Schema | undefined {
  const res = op.responses || {};
  const codes = Object.keys(res).sort(); // 안정
  const prefer = [
    '200',
    '201',
    ...codes.filter((c) => /^2\d\d$/.test(c) && c !== '200' && c !== '201'),
  ];
  for (const code of prefer) {
    const content = res[code]?.content;
    if (!content) continue;
    // JSON 우선
    const jsonKey =
      Object.keys(content).find((k) => k.includes('json')) ||
      Object.keys(content)[0];
    const sch = content[jsonKey]?.schema;
    if (sch) return sch;
  }
  return undefined;
}

// [ADD] 이름 규칙: 그룹+함수명 기반 Response 타입명
function responseTypeName(group: keyof typeof EP_SKELETON, fn: string) {
  const g = String(group);
  const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
  return `${cap(g)}${cap(fn)}Response`;
}

// [ADD] 2패스: 타입 별칭/인터페이스 모아 쓰고, ApiReturns는 마지막에
function buildAllOperationTypesAndApiReturns(
  groups: typeof EP_SKELETON,
  spec: OpenAPI,
) {
  const components = spec.components?.schemas ?? {};
  const typeDecls: string[] = [];
  const apiReturns: string[] = ['export interface ApiReturns {'];

  (Object.keys(EP_SKELETON) as Array<keyof typeof EP_SKELETON>).forEach(
    (group) => {
      const routes = sortByDesiredOrder(groups[group]);
      routes.forEach(({ path: p, method }) => {
        const fn = desiredNameFor(p, method);
        if (!fn) return;
        const op = spec.paths[p]?.[method];
        if (!op) return;

        const respSchema = pickSuccessResponseSchema(op);
        if (!respSchema) return;

        const typeName = responseTypeName(group, fn);
        const ts = schemaToTs(respSchema, components, typeName);
        const isObjectLike = /^\{\s/.test(ts);

        if (isObjectLike) {
          typeDecls.push(`export interface ${typeName} ${ts}["result"];`);
        } else {
          typeDecls.push(`export type ${typeName} = ${ts}["result"];`);
        }

        apiReturns.push(
          `  ${JSON.stringify(`${group}.${fn}`)}: ${typeName}; // ${method.toUpperCase()} ${p}`,
        );
      });
    },
  );

  apiReturns.push('}');
  return { typeDecls: typeDecls.join('\n'), apiReturns: apiReturns.join('\n') };
}

// --- main
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

  // [ADD] components.shema 타입 생성
  const componentsTypes = generateComponentsTypes(
    spec.components?.schemas ?? {},
  );

  // [ADD] 각 오퍼레이션 응답 타입 + ApiReturns 인터페이스
  const { typeDecls, apiReturns } = buildAllOperationTypesAndApiReturns(
    groups,
    spec,
  );

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

/* =======================
 * Generated Types
 * ======================= */

// --- Components
${componentsTypes}

// --- Operation Response Types
${typeDecls}

// --- Mapping: 'group.fn' -> Response Type
${apiReturns}
`;

  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  fs.writeFileSync(OUT_FILE, content, 'utf8');
  console.log(`[generate-ep] Wrote ${OUT_FILE}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
