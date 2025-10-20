import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

function toKebabCase(input) {
  return String(input)
    .replaceAll(/[^a-zA-Z0-9]+/g, "-")
    .replaceAll(/([a-z0-9])([A-Z])/g, "$1-$2")
    .toLowerCase()
    .replaceAll(/-{2,}/g, "-")
    .replaceAll(/^-|-$/g, "");
}

function isColorToken(node) {
  return (
    node &&
    typeof node === "object" &&
    "value" in node &&
    "type" in node &&
    node.type === "color"
  );
}

function isTypedToken(node) {
  return node && typeof node === "object" && "value" in node && "type" in node;
}

function isPlainObject(value) {
  return value && typeof value === "object" && !Array.isArray(value);
}

function flattenColorTokens(
  root,
  pathParts = [],
  out = [],
  pathToVarMap = new Map(),
  refPrefixSegments = [],
  refParts = []
) {
  if (!root || typeof root !== "object") return { tokens: out, pathToVarMap };

  if (isColorToken(root)) {
    const variableName = `--${toKebabCase(pathParts.join("-"))}`;
    out.push({ name: variableName, value: root.value });
    // Save mapping from dotted path (e.g. Color.Blue.500) to variable name (e.g. --color-blue-500)
    const dottedKey = pathParts.join(".");
    pathToVarMap.set(dottedKey, variableName);
    return { tokens: out, pathToVarMap };
  }

  for (const [key, value] of Object.entries(root)) {
    const nextPath = [...pathParts, toKebabCase(key)];
    // Track JSON reference path using original keys only (no kebab-case)
    const nextRefParts = [...refParts, key];
    if (isColorToken(value)) {
      const varName = `--${toKebabCase(nextPath.join("-"))}`;
      out.push({ name: varName, value: value.value });
      const refKey = [...refPrefixSegments, ...nextRefParts].join(".");
      const canonicalRefKey = refKey
        .split(".")
        .map((part) => part.replaceAll(" ", ""))
        .join(".");
      pathToVarMap.set(refKey, varName);
      pathToVarMap.set(canonicalRefKey, varName);
    } else if (value && typeof value === "object") {
      flattenColorTokens(
        value,
        nextPath,
        out,
        pathToVarMap,
        refPrefixSegments,
        nextRefParts
      );
    }
  }
  return { tokens: out, pathToVarMap };
}

function flattenSemanticTokens(root, pathParts = [], out = []) {
  if (!root || typeof root !== "object") return out;
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
  if (typeof value !== "string") return null;
  const match = value.match(/^\{([^}]+)\}$/);
  if (!match) return null;
  let ref = match[1]; // e.g., Color.Blue.500
  // Try direct key first
  if (pathToVarMap.has(ref)) return `var(${pathToVarMap.get(ref)})`;
  // Try normalized key (remove spaces and normalize case of first segment)
  const parts = ref.split(".");
  if (parts.length > 0) parts[0] = parts[0].trim();
  const canonical = parts.map((p) => p.replaceAll(" ", "")).join(".");
  if (pathToVarMap.has(canonical)) return `var(${pathToVarMap.get(canonical)})`;
  // Last attempt: lower-cased, kebab combined map
  const lower = parts.map((p) => p.toLowerCase()).join(".");
  if (pathToVarMap.has(lower)) return `var(${pathToVarMap.get(lower)})`;
  return null;
}

// Map common weight names to numeric values

function toPx(value) {
  if (typeof value === "number") return `${value}px`;
  if (typeof value === "string")
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
  const lineHeights = fontRoot["line height"] || {};
  const letterSpacings = fontRoot["letter spacing"] || {};

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
    if (groupName === "font" && groupVal.fontFamily) {
      lines.push(`  --font-family-primary: ${groupVal.fontFamily};`);
    }
    if (groupName === "weight" && groupVal.fontWeight) {
      for (const [wKey, wVal] of Object.entries(groupVal.fontWeight)) {
        lines.push(`  --font-weight-${wKey}: ${wVal};`);
      }
    }
    if (groupName.startsWith("size-")) {
      const sizeKey = groupName.replace("size-", "");
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
    if (groupName === "font" && groupVal.fontFamily) {
      lines.push(`  --font-primary: var(--font-family-primary);`);
    }
    if (groupName.startsWith("size-")) {
      const sizeKey = groupName.replace("size-", "");
      if (groupVal.fontSize) {
        lines.push(`  --text-${sizeKey}: var(--font-size-${sizeKey});`);
      }
      if (groupVal.lineHeight) {
        lines.push(`  --leading-${sizeKey}: var(--line-height-${sizeKey});`);
      }
      if (groupVal.letterSpacing) {
        lines.push(
          `  --tracking-${sizeKey}: var(--letter-spacing-${sizeKey});`
        );
      }
    }
  }
  return lines;
}

function buildTypographyUtilitiesCss(textRoot) {
  const lines = [];
  const start = "/* generated-typography-utilities:start */";
  const end = "/* generated-typography-utilities:end */";
  lines.push(start);

  const weights = textRoot.weight?.fontWeight || {};
  const hasFamily = Boolean(textRoot.font?.fontFamily);

  for (const [groupName, groupVal] of Object.entries(textRoot)) {
    if (!groupName.startsWith("size-")) continue;

    const sizeKey = groupName.replace("size-", "");
    const classBase = `text-${sizeKey}`;
    const props = [];

    if (groupVal.fontSize) {
      props.push(`  font-size: var(--text-${sizeKey});`);
    }
    if (groupVal.lineHeight) {
      props.push(`  line-height: var(--leading-${sizeKey});`);
    }
    if (hasFamily) {
      props.push(`  font-family: var(--font-primary);`);
    }
    if (groupVal.letterSpacing) {
      props.push(`  letter-spacing: var(--tracking-${sizeKey});`);
    }

    // base utility without explicit weight
    lines.push(`@utility ${classBase} {`);
    lines.push(...props);
    lines.push(`}`);

    // utilities per weight
    for (const [weightName] of Object.entries(weights)) {
      const className = `${classBase}-${weightName}`;
      lines.push(`@utility ${className} {`);
      lines.push(...props);
      lines.push(`  font-weight: var(--font-weight-${weightName});`);
      lines.push(`}`);
    }
  }

  lines.push(end);
  return lines;
}

async function main() {
  const projectRoot = process.cwd();
  const inputPath = resolve(projectRoot, "src/app/token.json");
  const globalsPath = resolve(projectRoot, "src/app/globals.css");

  const raw = await readFile(inputPath, "utf8");
  const tokens = JSON.parse(raw);

  const primitiveMode = tokens["primitive/Mode 1"] || {};
  const primitive = primitiveMode?.color;
  if (!primitive) {
    console.error(
      'No primitive color tokens found at "primitive/Mode 1" → "color"'
    );
  }

  const { tokens: colorVars, pathToVarMap } = flattenColorTokens(
    primitive,
    ["color"],
    [],
    new Map(),
    ["color"],
    []
  );

  // Use semantic/Mode 1 as the main semantic tokens
  const semanticRoot = tokens["semantic/Mode 1"];
  const semanticTokens = semanticRoot
    ? flattenSemanticTokens(semanticRoot)
    : [];

  // Collect text primitives from primitive/Mode 1 (excluding Color)
  const textPrimitives = collectTextPrimitives(primitiveMode);

  // Read globals.css to inject tokens
  let globalsCss = await readFile(globalsPath, "utf8");

  // Remove any tokens.css import if exists
  globalsCss = globalsCss.replace(
    /\n?@import\s+["']\.\.\/styles\/tokens\.css["'];?\n?/g,
    "\n"
  );

  // Helper to find block range by selector start index
  function findBlockRange(source, startIndexOfBrace) {
    let depth = 0;
    for (let i = startIndexOfBrace; i < source.length; i++) {
      const ch = source[i];
      if (ch === "{") depth++;
      else if (ch === "}") {
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
    throw new Error("Could not find :root block in src/app/globals.css");
  }
  const rootBlock = findBlockRange(
    globalsCss,
    rootSelMatch.index + rootSelMatch[0].length - 1
  );
  if (!rootBlock) throw new Error("Failed to parse :root block");

  // Prepare primitive color tokens content
  const primitiveStart = "/* generated-color-tokens:start */";
  const primitiveEnd = "/* generated-color-tokens:end */";
  const primitiveLines = [primitiveStart];
  for (const { name, value } of colorVars) {
    primitiveLines.push(`  ${name}: ${value};`);
  }
  primitiveLines.push(primitiveEnd);
  const primitiveBlock = "\n" + primitiveLines.join("\n") + "\n";

  // Prepare primitive text tokens content
  const textStart = "/* generated-text-tokens:start */";
  const textEnd = "/* generated-text-tokens:end */";
  const textLines = [textStart, ...buildTextRootCss(textPrimitives), textEnd];
  const textBlock = "\n" + textLines.join("\n") + "\n";

  // Replace or insert into :root block
  const rootContent = globalsCss.slice(rootBlock.start + 1, rootBlock.end);
  const existingPrimitiveRe = new RegExp(
    primitiveStart.replace(/[/*]/g, (m) => `\\${m}`) +
      "[\\s\\S]*?" +
      primitiveEnd.replace(/[/*]/g, (m) => `\\${m}`),
    "m"
  );
  let newRootContent;
  if (existingPrimitiveRe.test(rootContent)) {
    newRootContent = rootContent.replace(
      existingPrimitiveRe,
      primitiveBlock.trim()
    );
  } else {
    newRootContent = rootContent.replace(/\n\s*\}$/, "") + primitiveBlock + "}";
    // The '}' will be re-added when we reconstruct full content below; ensure no duplicate
    newRootContent = newRootContent.replace(/\}\s*$/, "");
  }

  // Reconstruct globals with updated :root
  globalsCss =
    globalsCss.slice(0, rootBlock.start + 1) +
    newRootContent +
    globalsCss.slice(rootBlock.end);

  // Inject or replace text tokens in :root
  const rootSelMatch2 = /:root\s*\{/g.exec(globalsCss);
  if (!rootSelMatch2) throw new Error(":root disappeared unexpectedly");
  const rootBlock2 = findBlockRange(
    globalsCss,
    rootSelMatch2.index + rootSelMatch2[0].length - 1
  );
  const rootContent2 = globalsCss.slice(rootBlock2.start + 1, rootBlock2.end);
  const existingTextRe = new RegExp(
    textStart.replace(/[/*]/g, (m) => `\\${m}`) +
      "[\\s\\S]*?" +
      textEnd.replace(/[/*]/g, (m) => `\\${m}`),
    "m"
  );
  let newRootContent2;
  if (existingTextRe.test(rootContent2)) {
    newRootContent2 = rootContent2.replace(existingTextRe, textBlock.trim());
  } else {
    newRootContent2 = rootContent2.replace(/\n\s*\}$/, "") + textBlock + "}";
    newRootContent2 = newRootContent2.replace(/\}\s*$/, "");
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
      'Could not find "@theme inline {" block in src/app/globals.css'
    );
  }
  const themeBlock = findBlockRange(
    globalsCss,
    themeMatch.index + themeMatch[0].length - 1
  );
  if (!themeBlock) throw new Error("Failed to parse @theme inline block");

  // Prepare semantic tokens (without 'semantic' prefix) to go into @theme inline
  const semanticStart = "/* generated-semantic-tokens:start */";
  const semanticEnd = "/* generated-semantic-tokens:end */";
  const semanticLines = [semanticStart];
  for (const { path, value, type } of semanticTokens) {
    if (type !== "color") continue;
    const varName = `--${toKebabCase(path.join("-"))}`; // e.g., --color-bg-interactive-primary
    const refValue = resolveReferenceValue(value, pathToVarMap);
    const finalValue = refValue ?? value;
    semanticLines.push(`  ${varName}: ${finalValue};`);
  }
  semanticLines.push(semanticEnd);
  const semanticBlock = "\n" + semanticLines.join("\n") + "\n";

  // Prepare typography theme tokens
  const typoStart = "/* generated-typography-tokens:start */";
  const typoEnd = "/* generated-typography-tokens:end */";
  const typoLines = [typoStart, ...buildTextThemeCss(textPrimitives), typoEnd];
  const typoBlock = "\n" + typoLines.join("\n") + "\n";

  const themeContent = globalsCss.slice(themeBlock.start + 1, themeBlock.end);
  const existingSemanticRe = new RegExp(
    semanticStart.replace(/[/*]/g, (m) => `\\${m}`) +
      "[\\s\\S]*?" +
      semanticEnd.replace(/[/*]/g, (m) => `\\${m}`),
    "m"
  );
  let newThemeContent;
  if (existingSemanticRe.test(themeContent)) {
    newThemeContent = themeContent.replace(
      existingSemanticRe,
      semanticBlock.trim()
    );
  } else {
    newThemeContent =
      themeContent.replace(/\n\s*\}$/, "") + semanticBlock + "}";
    newThemeContent = newThemeContent.replace(/\}\s*$/, "");
  }

  globalsCss =
    globalsCss.slice(0, themeBlock.start + 1) +
    newThemeContent +
    globalsCss.slice(themeBlock.end);

  // Inject or replace typography theme tokens
  const themeMatch2 = /@theme\s+inline\s*\{/g.exec(globalsCss);
  if (!themeMatch2) throw new Error("@theme inline disappeared unexpectedly");
  const themeBlock2 = findBlockRange(
    globalsCss,
    themeMatch2.index + themeMatch2[0].length - 1
  );
  const themeContent2 = globalsCss.slice(
    themeBlock2.start + 1,
    themeBlock2.end
  );
  const existingTypoRe = new RegExp(
    typoStart.replace(/[/*]/g, (m) => `\\${m}`) +
      "[\\s\\S]*?" +
      typoEnd.replace(/[/*]/g, (m) => `\\${m}`),
    "m"
  );
  let newThemeContent2;
  if (existingTypoRe.test(themeContent2)) {
    newThemeContent2 = themeContent2.replace(existingTypoRe, typoBlock.trim());
  } else {
    newThemeContent2 = themeContent2.replace(/\n\s*\}$/, "") + typoBlock + "}";
    newThemeContent2 = newThemeContent2.replace(/\}\s*$/, "");
  }

  globalsCss =
    globalsCss.slice(0, themeBlock2.start + 1) +
    newThemeContent2 +
    globalsCss.slice(themeBlock2.end);

  // Inject or replace typography utilities at file root
  const utilStart = "/* generated-typography-utilities:start */";
  const utilEnd = "/* generated-typography-utilities:end */";
  const utilLines = buildTypographyUtilitiesCss(textPrimitives);
  const utilBlock = utilLines.join("\n") + "\n";
  const utilRe = new RegExp(
    utilStart.replace(/[/*]/g, (m) => `\\${m}`) +
      "[\\s\\S]*?" +
      utilEnd.replace(/[/*]/g, (m) => `\\${m}`),
    "m"
  );
  if (utilRe.test(globalsCss)) {
    globalsCss = globalsCss.replace(utilRe, utilBlock.trim());
  } else {
    // Append at end of file with a preceding newline
    globalsCss = globalsCss.replace(/\s*$/, "\n" + utilBlock);
  }

  await writeFile(globalsPath, globalsCss, "utf8");
  console.log(`Updated ${globalsPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
