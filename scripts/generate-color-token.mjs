import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

function toKebabCase(input) {
  return String(input)
    .replaceAll(/[^a-zA-Z0-9]+/g, '-')
    .replaceAll(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase()
    .replaceAll(/-{2,}/g, '-')
    .replaceAll(/^-|-$/g, '');
}

function isColorToken(node) {
  return (
    node &&
    typeof node === 'object' &&
    'value' in node &&
    'type' in node &&
    node.type === 'color'
  );
}

function isTypedToken(node) {
  return node && typeof node === 'object' && 'value' in node && 'type' in node;
}

function isPlainObject(value) {
  return value && typeof value === 'object' && !Array.isArray(value);
}

function flattenColorTokens(
  root,
  pathParts = [],
  out = [],
  pathToVarMap = new Map(),
  refPrefixSegments = [],
  refParts = [],
) {
  if (!root || typeof root !== 'object') return { tokens: out, pathToVarMap };

  if (isColorToken(root)) {
    const variableName = `--${toKebabCase(pathParts.join('-'))}`;
    out.push({ name: variableName, value: root.value });
    // Save mapping from dotted path (e.g. Color.Blue.500) to variable name (e.g. --color-blue-500)
    const dottedKey = pathParts.join('.');
    pathToVarMap.set(dottedKey, variableName);
    return { tokens: out, pathToVarMap };
  }

  for (const [key, value] of Object.entries(root)) {
    const nextPath = [...pathParts, toKebabCase(key)];
    // Track JSON reference path using original keys only (no kebab-case)
    const nextRefParts = [...refParts, key];
    if (isColorToken(value)) {
      const varName = `--${toKebabCase(nextPath.join('-'))}`;
      out.push({ name: varName, value: value.value });
      const refKey = [...refPrefixSegments, ...nextRefParts].join('.');
      const canonicalRefKey = refKey
        .split('.')
        .map((part) => part.replaceAll(' ', ''))
        .join('.');
      pathToVarMap.set(refKey, varName);
      pathToVarMap.set(canonicalRefKey, varName);
    } else if (value && typeof value === 'object') {
      flattenColorTokens(
        value,
        nextPath,
        out,
        pathToVarMap,
        refPrefixSegments,
        nextRefParts,
      );
    }
  }
  return { tokens: out, pathToVarMap };
}

function flattenSemanticTokens(root, pathParts = [], out = []) {
  if (!root || typeof root !== 'object') return out;
  if (isTypedToken(root)) {
    out.push({ path: pathParts, value: root.value, type: root.type });
    return out;
  }
  for (const [key, value] of Object.entries(root)) {
    flattenSemanticTokens(value, [...pathParts, toKebabCase(key)], out);
  }
  return out;
}

function resolveReferenceValue(value, pathToVarMap) {
  if (typeof value !== 'string') return null;
  const match = value.match(/^\{([^}]+)\}$/);
  if (!match) return null;
  let ref = match[1]; // e.g., Color.Blue.500
  // Try direct key first
  if (pathToVarMap.has(ref)) return `var(${pathToVarMap.get(ref)})`;
  // Try normalized key (remove spaces and normalize case of first segment)
  const parts = ref.split('.');
  if (parts.length > 0) parts[0] = parts[0].trim();
  const canonical = parts.map((p) => p.replaceAll(' ', '')).join('.');
  if (pathToVarMap.has(canonical)) return `var(${pathToVarMap.get(canonical)})`;
  // Last attempt: lower-cased, kebab combined map
  const lower = parts.map((p) => p.toLowerCase()).join('.');
  if (pathToVarMap.has(lower)) return `var(${pathToVarMap.get(lower)})`;
  return null;
}

// Map common weight names to numeric values

function toPx(value) {
  if (typeof value === 'number') return `${value}px`;
  if (typeof value === 'string')
    return /px$/.test(value) ? value : `${value}px`;
  return String(value);
}

function collectTextPrimitives(primitiveRoot) {
  const textRoot = {};
  if (!isPlainObject(primitiveRoot)) return textRoot;

  const fontRoot = primitiveRoot.font;
  if (!isPlainObject(fontRoot)) return textRoot;

  // Extract font family
  const fontFamily = fontRoot.family?.pretendard?.value;
  if (fontFamily) {
    textRoot.font = { fontFamily };
  }

  // Extract font weights
  const fontWeights = {};
  if (isPlainObject(fontRoot.weight)) {
    for (const [wKey, wVal] of Object.entries(fontRoot.weight)) {
      if (isTypedToken(wVal)) {
        fontWeights[wKey] = wVal.value;
      }
    }
  }

  // Extract sizes and line heights
  const sizes = fontRoot.size || {};
  const lineHeights = fontRoot['line height'] || {};
  const letterSpacings = fontRoot['letter spacing'] || {};

  // Create font tokens for each size
  for (const [sizeKey, sizeObj] of Object.entries(sizes)) {
    if (!isTypedToken(sizeObj)) continue;

    const sizeValue = sizeObj.value;
    const lineHeightObj = lineHeights[sizeKey];
    const letterSpacingObj = letterSpacings[sizeKey];

    const sizeName = `size-${sizeKey}`;
    textRoot[sizeName] = {
      fontSize: toPx(sizeValue),
    };

    if (isTypedToken(lineHeightObj)) {
      textRoot[sizeName].lineHeight = toPx(lineHeightObj.value);
    }

    if (isTypedToken(letterSpacingObj)) {
      textRoot[sizeName].letterSpacing = toPx(letterSpacingObj.value);
    }
  }

  // Add font weights to textRoot
  if (Object.keys(fontWeights).length > 0) {
    textRoot.weight = { fontWeight: fontWeights };
  }

  return textRoot;
}

function buildTextRootCss(textRoot) {
  const lines = [];
  for (const [groupName, groupVal] of Object.entries(textRoot)) {
    if (groupName === 'font' && groupVal.fontFamily) {
      lines.push(`  --font-family-primary: ${groupVal.fontFamily};`);
    }
    if (groupName === 'weight' && groupVal.fontWeight) {
      for (const [wKey, wVal] of Object.entries(groupVal.fontWeight)) {
        lines.push(`  --font-weight-${wKey}: ${wVal};`);
      }
    }
    if (groupName.startsWith('size-')) {
      const sizeKey = groupName.replace('size-', '');
      if (groupVal.fontSize) {
        lines.push(`  --font-size-${sizeKey}: ${groupVal.fontSize};`);
      }
      if (groupVal.lineHeight) {
        lines.push(`  --line-height-${sizeKey}: ${groupVal.lineHeight};`);
      }
      if (groupVal.letterSpacing) {
        lines.push(`  --letter-spacing-${sizeKey}: ${groupVal.letterSpacing};`);
      }
    }
  }
  return lines;
}

function buildTextThemeCss(textRoot) {
  const lines = [];
  for (const [groupName, groupVal] of Object.entries(textRoot)) {
    if (groupName === 'font' && groupVal.fontFamily) {
      lines.push(`  --font-primary: var(--font-family-primary);`);
    }
    if (groupName.startsWith('size-')) {
      const sizeKey = groupName.replace('size-', '');
      if (groupVal.fontSize) {
        lines.push(`  --text-${sizeKey}: var(--font-size-${sizeKey});`);
      }
      if (groupVal.lineHeight) {
        lines.push(`  --leading-${sizeKey}: var(--line-height-${sizeKey});`);
      }
      if (groupVal.letterSpacing) {
        lines.push(
          `  --tracking-${sizeKey}: var(--letter-spacing-${sizeKey});`,
        );
      }
    }
  }
  return lines;
}

// 새로운 typography utility 생성: token.json의 title/body/heading/caption 등 스타일 네이밍 기반
function buildTypographyUtilitiesCssFromToken(token) {
  const lines = [];
  const start = '/* generated-typography-utilities:start */';
  const end = '/* generated-typography-utilities:end */';
  lines.push(start);

  // 지원하는 스타일 그룹 (global에서)
  const styleGroups = ['title', 'heading', 'body', 'caption'];

  // fontSize/weight 매핑용
  const sizeMap = {
    0: '12',
    1: '13',
    2: '14',
    3: '15',
    4: '16',
    5: '17',
    6: '18',
    7: '20',
    8: '24',
    9: '28',
    10: '32',
    11: '36',
    12: '40',
    13: '44',
  };

  const weightMap = {
    'pretendard-0': '700',
    'pretendard-1': '600',
    'pretendard-2': '500',
    'pretendard-3': '400',
  };

  // 그룹별 유틸리티 생성
  for (const group of styleGroups) {
    const groupObj = token[group];
    if (!groupObj) continue;

    for (const sizeKey of Object.keys(groupObj)) {
      const sizeObj = groupObj[sizeKey];
      for (const weightKey of Object.keys(sizeObj)) {
        const styleObj = sizeObj[weightKey];
        if (!styleObj || styleObj.type !== 'typography') continue;

        const value = styleObj.value;

        // 클래스명: text-{group}-{sizeKey}-{weightKey}
        // ex) @utility text-body-lg-semibold { … }
        const utilityName = `@utility text-${group}-${sizeKey}-${weightKey} {`;
        lines.push(utilityName);

        // font-family
        if (value.fontFamily) {
          lines.push(`  font-family: var(--font-primary);`);
        }

        // font-weight
        let weightValue = '400';
        if (value.fontWeight) {
          const weightRef = value.fontWeight;
          if (weightRef.includes('pretendard-0')) weightValue = '700';
          else if (weightRef.includes('pretendard-1')) weightValue = '600';
          else if (weightRef.includes('pretendard-2')) weightValue = '500';
          else if (weightRef.includes('pretendard-3')) weightValue = '400';
          lines.push(`  font-weight: ${weightValue};`);
        }

        // font-size
        let actualSize = '16';
        if (value.fontSize) {
          const sizeRef = value.fontSize;
          const sizeMatch = sizeRef.match(/fontSize\.(\d+)/);
          if (sizeMatch) {
            actualSize = sizeMap[sizeMatch[1]] || '16';
            lines.push(`  font-size: var(--font-size-${actualSize});`);
          }
        }

        // letter-spacing
        if (value.letterSpacing && !value.letterSpacing.includes('0')) {
          lines.push(`  letter-spacing: var(--letter-spacing-0);`);
        }

        // line-height
        if (value.lineHeight) {
          const lineRef = value.lineHeight.match(/(\d+)/);
          if (lineRef) {
            lines.push(`  line-height: var(--line-height-${lineRef[1]});`);
          }
        }

        lines.push('}');
        lines.push(''); // 줄바꿈

        // 추가: text-{size}-{weight} 형태의 단순 버전도 생성
        const simpleUtility = `@utility text-${actualSize}-${weightValue} {`;
        lines.push(simpleUtility);
        if (value.fontFamily) {
          lines.push(`  font-family: var(--font-primary);`);
        }
        lines.push(`  font-weight: ${weightValue};`);
        lines.push(`  font-size: var(--font-size-${actualSize});`);
        lines.push('}');
        lines.push('');
      }
    }
  }

  lines.push(end);
  return lines;
}

async function main() {
  const projectRoot = process.cwd();
  const inputPath = resolve(projectRoot, 'src/app/token.json');
  const globalsPath = resolve(projectRoot, 'src/app/globals.css');

  const raw = await readFile(inputPath, 'utf8');
  const tokens = JSON.parse(raw);

  const primitiveMode = tokens['primitive/Mode 1'] || {};
  const primitive = primitiveMode?.color;
  if (!primitive) {
    console.error(
      'No primitive color tokens found at "primitive/Mode 1" → "color"',
    );
  }

  const { tokens: colorVars, pathToVarMap } = flattenColorTokens(
    primitive,
    ['color'],
    [],
    new Map(),
    ['color'],
    [],
  );

  // Use semantic/Mode 1 as the main semantic tokens
  const semanticRoot = tokens['semantic/Mode 1'];
  const semanticTokens = semanticRoot
    ? flattenSemanticTokens(semanticRoot)
    : [];

  // Collect text primitives from primitive/Mode 1 (excluding Color)
  const textPrimitives = collectTextPrimitives(primitiveMode);

  // typography utility를 token.json의 스타일 네이밍 기반으로 생성
  const typographyUtilityLines = buildTypographyUtilitiesCssFromToken(
    tokens.global || {},
  );

  // Read globals.css to inject tokens
  let globalsCss = await readFile(globalsPath, 'utf8');

  // Remove any tokens.css import if exists
  globalsCss = globalsCss.replace(
    /\n?@import\s+["']\.\.\/styles\/tokens\.css["'];?\n?/g,
    '\n',
  );

  // Helper to find block range by selector start index
  function findBlockRange(source, startIndexOfBrace) {
    let depth = 0;
    for (let i = startIndexOfBrace; i < source.length; i++) {
      const ch = source[i];
      if (ch === '{') depth++;
      else if (ch === '}') {
        depth--;
        if (depth === 0) {
          return { start: startIndexOfBrace, end: i };
        }
      }
    }
    return null;
  }

  // Locate top-level :root block (first occurrence)
  const rootSelRegex = /:root\s*\{/g;
  const rootSelMatch = rootSelRegex.exec(globalsCss);
  if (!rootSelMatch) {
    throw new Error('Could not find :root block in src/app/globals.css');
  }
  const rootBlock = findBlockRange(
    globalsCss,
    rootSelMatch.index + rootSelMatch[0].length - 1,
  );
  if (!rootBlock) throw new Error('Failed to parse :root block');

  // Prepare primitive color tokens content
  const primitiveStart = '/* generated-color-tokens:start */';
  const primitiveEnd = '/* generated-color-tokens:end */';
  const primitiveLines = [primitiveStart];
  for (const { name, value } of colorVars) {
    primitiveLines.push(`  ${name}: ${value};`);
  }
  primitiveLines.push(primitiveEnd);
  const primitiveBlock = '\n' + primitiveLines.join('\n') + '\n';

  // Prepare primitive text tokens content
  const textStart = '/* generated-text-tokens:start */';
  const textEnd = '/* generated-text-tokens:end */';
  const textLines = [textStart, ...buildTextRootCss(textPrimitives), textEnd];
  const textBlock = '\n' + textLines.join('\n') + '\n';

  // Replace or insert into :root block
  const rootContent = globalsCss.slice(rootBlock.start + 1, rootBlock.end);
  const existingPrimitiveRe = new RegExp(
    primitiveStart.replace(/[/*]/g, (m) => `\\${m}`) +
      '[\\s\\S]*?' +
      primitiveEnd.replace(/[/*]/g, (m) => `\\${m}`),
    'm',
  );
  let newRootContent;
  if (existingPrimitiveRe.test(rootContent)) {
    newRootContent = rootContent.replace(
      existingPrimitiveRe,
      primitiveBlock.trim(),
    );
  } else {
    newRootContent = rootContent.replace(/\n\s*\}$/, '') + primitiveBlock + '}';
    // The '}' will be re-added when we reconstruct full content below; ensure no duplicate
    newRootContent = newRootContent.replace(/\}\s*$/, '');
  }

  // Reconstruct globals with updated :root
  globalsCss =
    globalsCss.slice(0, rootBlock.start + 1) +
    newRootContent +
    globalsCss.slice(rootBlock.end);

  // Inject or replace text tokens in :root
  const rootSelMatch2 = /:root\s*\{/g.exec(globalsCss);
  if (!rootSelMatch2) throw new Error(':root disappeared unexpectedly');
  const rootBlock2 = findBlockRange(
    globalsCss,
    rootSelMatch2.index + rootSelMatch2[0].length - 1,
  );
  const rootContent2 = globalsCss.slice(rootBlock2.start + 1, rootBlock2.end);
  const existingTextRe = new RegExp(
    textStart.replace(/[/*]/g, (m) => `\\${m}`) +
      '[\\s\\S]*?' +
      textEnd.replace(/[/*]/g, (m) => `\\${m}`),
    'm',
  );
  let newRootContent2;
  if (existingTextRe.test(rootContent2)) {
    newRootContent2 = rootContent2.replace(existingTextRe, textBlock.trim());
  } else {
    newRootContent2 = rootContent2.replace(/\n\s*\}$/, '') + textBlock + '}';
    newRootContent2 = newRootContent2.replace(/\}\s*$/, '');
  }
  globalsCss =
    globalsCss.slice(0, rootBlock2.start + 1) +
    newRootContent2 +
    globalsCss.slice(rootBlock2.end);

  // Locate @theme inline block
  const themeRegex = /@theme\s+inline\s*\{/g;
  const themeMatch = themeRegex.exec(globalsCss);
  if (!themeMatch) {
    throw new Error(
      'Could not find "@theme inline {" block in src/app/globals.css',
    );
  }
  const themeBlock = findBlockRange(
    globalsCss,
    themeMatch.index + themeMatch[0].length - 1,
  );
  if (!themeBlock) throw new Error('Failed to parse @theme inline block');

  // Prepare semantic tokens (without 'semantic' prefix) to go into @theme inline
  const semanticStart = '/* generated-semantic-tokens:start */';
  const semanticEnd = '/* generated-semantic-tokens:end */';
  const semanticLines = [semanticStart];
  for (const { path, value, type } of semanticTokens) {
    if (type !== 'color') continue;
    const varName = `--${toKebabCase(path.join('-'))}`; // e.g., --color-bg-interactive-primary
    const refValue = resolveReferenceValue(value, pathToVarMap);
    const finalValue = refValue ?? value;
    semanticLines.push(`  ${varName}: ${finalValue};`);
  }
  semanticLines.push(semanticEnd);
  const semanticBlock = '\n' + semanticLines.join('\n') + '\n';

  // Prepare typography theme tokens
  const typoStart = '/* generated-typography-tokens:start */';
  const typoEnd = '/* generated-typography-tokens:end */';
  const typoLines = [typoStart, ...buildTextThemeCss(textPrimitives), typoEnd];
  const typoBlock = '\n' + typoLines.join('\n') + '\n';

  const themeContent = globalsCss.slice(themeBlock.start + 1, themeBlock.end);
  const existingSemanticRe = new RegExp(
    semanticStart.replace(/[/*]/g, (m) => `\\${m}`) +
      '[\\s\\S]*?' +
      semanticEnd.replace(/[/*]/g, (m) => `\\${m}`),
    'm',
  );
  let newThemeContent;
  if (existingSemanticRe.test(themeContent)) {
    newThemeContent = themeContent.replace(
      existingSemanticRe,
      semanticBlock.trim(),
    );
  } else {
    newThemeContent =
      themeContent.replace(/\n\s*\}$/, '') + semanticBlock + '}';
    newThemeContent = newThemeContent.replace(/\}\s*$/, '');
  }

  globalsCss =
    globalsCss.slice(0, themeBlock.start + 1) +
    newThemeContent +
    globalsCss.slice(themeBlock.end);

  // Inject or replace typography theme tokens
  const themeMatch2 = /@theme\s+inline\s*\{/g.exec(globalsCss);
  if (!themeMatch2) throw new Error('@theme inline disappeared unexpectedly');
  const themeBlock2 = findBlockRange(
    globalsCss,
    themeMatch2.index + themeMatch2[0].length - 1,
  );
  const themeContent2 = globalsCss.slice(
    themeBlock2.start + 1,
    themeBlock2.end,
  );
  const existingTypoRe = new RegExp(
    typoStart.replace(/[/*]/g, (m) => `\\${m}`) +
      '[\\s\\S]*?' +
      typoEnd.replace(/[/*]/g, (m) => `\\${m}`),
    'm',
  );
  let newThemeContent2;
  if (existingTypoRe.test(themeContent2)) {
    newThemeContent2 = themeContent2.replace(existingTypoRe, typoBlock.trim());
  } else {
    newThemeContent2 = themeContent2.replace(/\n\s*\}$/, '') + typoBlock + '}';
    newThemeContent2 = newThemeContent2.replace(/\}\s*$/, '');
  }

  globalsCss =
    globalsCss.slice(0, themeBlock2.start + 1) +
    newThemeContent2 +
    globalsCss.slice(themeBlock2.end);

  // Inject or replace typography utilities at file root
  const utilStart = '/* generated-typography-utilities:start */';
  const utilEnd = '/* generated-typography-utilities:end */';
  const utilBlock = typographyUtilityLines.join('\n') + '\n';
  const utilRe = new RegExp(
    utilStart.replace(/[/*]/g, (m) => `\\${m}`) +
      '[\\s\\S]*?' +
      utilEnd.replace(/[/*]/g, (m) => `\\${m}`),
    'm',
  );
  if (utilRe.test(globalsCss)) {
    globalsCss = globalsCss.replace(utilRe, utilBlock.trim());
  } else {
    // Append at end of file with a preceding newline
    globalsCss = globalsCss.replace(/\s*$/, '\n' + utilBlock);
  }

  // body에 font-family 자동 생성/치환
  const bodyFontFamily = 'font-family: var(--font-pretendard);';
  const bodyRe = /body\s*\{[^}]*\}/m;
  if (bodyRe.test(globalsCss)) {
    globalsCss = globalsCss.replace(bodyRe, (match) => {
      // 기존 font-family 라인 치환 또는 추가
      if (/font-family:[^;]+;/.test(match)) {
        return match.replace(/font-family:[^;]+;/, bodyFontFamily);
      }
      // font-family가 없으면 추가
      return match.replace(/\}/, `  ${bodyFontFamily}\n}`);
    });
  } else {
    // body 블록이 없으면 새로 추가
    globalsCss += `\nbody {\n  ${bodyFontFamily}\n}`;
  }

  await writeFile(globalsPath, globalsCss, 'utf8');
  console.log(`Updated ${globalsPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
