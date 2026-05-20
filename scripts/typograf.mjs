import Typograf from "typograf";
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const tp = new Typograf({
  locale: ["ru", "en-US"]
});

function processFile(path) {
  const text = readFileSync(path, "utf8");
  let count = 0;

  // 1. Quoted strings (attributes, data fields)
  let processed = text.replace(/"([^"]*)"/g, (match, content) => {
    if (!/[А-Яа-яЁё]/.test(content)) return match;
    const result = tp.execute(content);
    if (result !== content) count++;
    return `"${result}"`;
  });

  // 2. Text content inside <p>, <h1>-<h6>, <li> tags (HTML body text)
  // Only matches if content is plain text (no nested tags or JS expressions)
  processed = processed.replace(
    /(<(p|h[1-6]|li)(?:\s[^>]*)?>)([^<{}]*)(<\/\2>)/g,
    (match, openTag, _tag, content, closeTag) => {
      if (!/[А-Яа-яЁё]/.test(content)) return match;
      const result = tp.execute(content);
      if (result !== content) count++;
      return openTag + result + closeTag;
    }
  );

  writeFileSync(path, processed, "utf8");
  console.log(`${path}: ${count} strings changed`);
}

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    const stat = statSync(path);
    if (stat.isDirectory()) walk(path);
    else if (/\.(ts|astro)$/.test(name)) processFile(path);
  }
}

walk("src");
