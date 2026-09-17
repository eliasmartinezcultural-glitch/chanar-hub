import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';

const root = process.cwd();
const required = [
  'index.html','viajero.html','vecinos.html','mapa.html','auditoria.html','compartir.html',
  'chanar-ui.css','chanar-registry.js','geo-data.js','geo-territory.js','404.html','.nojekyll',
  'data/chanar-audit-2026-09-17.json','scripts/source-audit.mjs'
];
const pages = ['index.html','viajero.html','vecinos.html','mapa.html','auditoria.html','compartir.html'];
let failures = [];
for (const file of required) if (!existsSync(join(root,file))) failures.push(`Falta archivo núcleo: ${file}`);

for (const file of pages) {
  if (!existsSync(join(root,file))) continue;
  const html = readFileSync(join(root,file),'utf8');
  if (!/<meta[^>]+name=["']viewport["'][^>]*content=["'][^"']*width=device-width/i.test(html)) failures.push(`${file}: falta viewport mobile`);
  if (!/<title>[^<]+<\/title>/i.test(html)) failures.push(`${file}: falta title`);
  for (const ref of ['chanar-ui.css','chanar-registry.js']) {
    if (!html.includes(ref)) failures.push(`${file}: falta referencia a ${ref}`);
  }
}

const registry = readFileSync(join(root,'chanar-registry.js'),'utf8');
for (const token of ['CHANAR_REGISTRY','identityKey','publication','spatialStatus']) {
  if (!registry.includes(token)) failures.push(`Registro: falta contrato ${token}`);
}

for (const js of ['chanar-registry.js','geo-data.js','geo-territory.js','scripts/source-audit.mjs','scripts/integrity-check.mjs']) {
  try { execFileSync(process.execPath,['--check',js],{stdio:'pipe'}); }
  catch { failures.push(`Sintaxis JS inválida: ${js}`); }
}

if (failures.length) {
  console.error('INTEGRITY CHECK: FAIL');
  for (const f of failures) console.error(`- ${f}`);
  process.exit(1);
}
console.log(`INTEGRITY CHECK: PASS · ${required.length} archivos núcleo · ${pages.length} páginas · contrato central verificado`);
