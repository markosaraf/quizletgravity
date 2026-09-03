#!/usr/bin/env node
// Extract webpack modules from a Quizlet chunk file into individual files.
// Strategy: find all module keys "KEY":( in order; each module's code spans
// from its key match to the next key match (or EOF).
const fs = require('fs');
const path = require('path');

const srcFile = process.argv[2];
const outDir = process.argv[3];
if (!srcFile || !outDir) {
  console.error('usage: node extract_modules.js <bundle.js> <outDir>');
  process.exit(1);
}

const src = fs.readFileSync(srcFile, 'utf8');
fs.mkdirSync(outDir, { recursive: true });

const keyRe = /"((?:\.\/)?[^"]{3,200}\.(?:tsx?|js|styl|css|json))":\(/g;
const matches = [];
let m;
while ((m = keyRe.exec(src)) !== null) {
  if (matches.length && matches[matches.length - 1].key === m[1]) continue; // dup key
  matches.push({ key: m[1], index: m.index, end: m.index + m[0].length });
}
console.log('module keys found:', matches.length);

// The chunk object ends with })]); or similar at file end.
const objEnd = src.length;

const written = [];
for (let i = 0; i < matches.length; i++) {
  const cur = matches[i];
  const next = matches[i + 1];
  // body goes from just after '":(' to just before the next key's leading comma-quote
  let endPos = next ? next.index - 1 : objEnd; // -1 to skip the comma before the next key
  if (endPos < cur.end) endPos = objEnd;
  let body = src.slice(cur.end, endPos);
  // trim trailing separators like '},' '),' etc.
  body = body.replace(/[\s,;]+$/, '');
  let name = cur.key.replace(/^\.\//, '').replace(/\.\.\//g, 'up/').replace(/[^a-zA-Z0-9._-]/g, '_');
  if (name.length > 160) name = name.slice(0, 160);
  const file = path.join(outDir, name);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const header = '// MODULE: ' + cur.key + '\n// pos: ' + cur.index + '\n';
  fs.writeFileSync(file, header + '(function (module, exports, require) {\n' + body + '\n});\n');
  written.push(cur.key);
}

// Report sizes of app modules
const appMods = written.filter(k => k.startsWith('./app/'));
console.log('app modules:', appMods.length);
appMods.forEach(k => {
  const p = path.join(outDir, k.replace(/^\.\//, '').replace(/\.\.\//g, 'up/').replace(/[^a-zA-Z0-9._-]/g, '_'));
  console.log(String(fs.statSync(p).size).padStart(8), k);
});
console.log('done ->', outDir);
