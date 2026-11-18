// Post-build: rewrite raw control bytes (e.g. ESC) inside built JS as \xNN escapes.
// They only occur inside string/regex literals in pdf.js, where the escape is equivalent.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const dir = new URL('../dist/assets/', import.meta.url).pathname;
for (const f of readdirSync(dir)) {
  if (!/\.(m?js)$/.test(f)) continue;
  const p = join(dir, f);
  const src = readFileSync(p, 'utf8');
  // eslint-disable-next-line no-control-regex
  const out = src.replace(/[\x00-\x08\x0b\x0c\x0e-\x1f]/g, (c) => '\\x' + c.charCodeAt(0).toString(16).padStart(2, '0'));
  if (out !== src) {
    writeFileSync(p, out);
    console.log('escaped control chars in', f);
  }
}
