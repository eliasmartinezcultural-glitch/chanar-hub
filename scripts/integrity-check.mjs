import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';

const root = process.cwd();
const required = [
  'index.html','viajero.html','vecinos.html','mapa.html','auditoria.html','compartir.html',
  'chanar-ui.css','chanar-registry.js','geo-data.js','geo-territory.js','chanar-hub-core.js','404.html','.nojekyll',
  'data/chanar-audit-2026-09-17.json','data/chanar-v1-lock.json','scripts/source-audit.mjs'
];
const pages = ['index.html','viajero.html','vecinos.html','mapa.html','auditoria.html','compartir.html'];
const jsCore = ['chanar-registry.js','geo-data.js','geo-territory.js','chanar-hub-core.js','scripts/source-audit.mjs','scripts/integrity-check.mjs'];
let failures = [];

for (const file of required) if (!existsSync(join(root,file))) failures.push(`Falta archivo núcleo: ${file}`);

for (const file of pages) {
  if (!existsSync(join(root,file))) continue;
  const html = readFileSync(join(root,file),'utf8');
  if (!/<meta[^>]+name=["']viewport["'][^>]*content=["'][^"']*width=device-width/i.test(html)) failures.push(`${file}: falta viewport mobile`);
  if (!/<title>[^<]+<\/title>/i.test(html)) failures.push(`${file}: falta title`);
  if (!html.includes('chanar-ui.css')) failures.push(`${file}: falta referencia a chanar-ui.css`);
  if (!html.includes('chanar-registry.js')) failures.push(`${file}: falta referencia a chanar-registry.js`);
  for (const bad of ['localhost:', '127.0.0.1']) if (html.includes(bad)) failures.push(`${file}: contiene referencia local ${bad}`);
}

const registry = readFileSync(join(root,'chanar-registry.js'),'utf8');
for (const token of ['CHANAR_REGISTRY','identityKey','publication','spatialStatus']) {
  if (!registry.includes(token)) failures.push(`Registro: falta contrato ${token}`);
}

// Evita duplicaciones accidentales de IDs dentro del inventario canónico.
const ids = [...registry.matchAll(/\bid\s*:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
const duplicateIds = ids.filter((id, i) => ids.indexOf(id) !== i);
for (const id of [...new Set(duplicateIds)]) failures.push(`Registro: ID duplicado ${id}`);

// Los identificadores retirados no deben reaparecer como fichas activas.
const retiredIds = [...registry.matchAll(/\{id:['"]([^'"]+)['"],status:['"]retired['"]/g)].map(m => m[1]);
const activeSection = registry.split('places:')[1] || registry;
for (const id of retiredIds) {
  const occurrences = [...activeSection.matchAll(new RegExp(`\\bid:['"]${id}['"]`, 'g'))].length;
  if (occurrences > 1) failures.push(`Registro: ID retirado reutilizado como activo ${id}`);
}

// La experiencia común debe ser una sola capa, no cuatro copias independientes.
const geoBridge = readFileSync(join(root,'geo-data.js'),'utf8');
const core = readFileSync(join(root,'chanar-hub-core.js'),'utf8');
if (!geoBridge.includes("chanar-hub-core.js")) failures.push('Puente geográfico: no conecta la capa común');
for (const token of ['hub-core-nav','hub-core-bottom','hub-core-quick']) {
  if (!core.includes(token)) failures.push(`Capa común: falta componente ${token}`);
}

for (const js of jsCore) {
  try { execFileSync(process.execPath,['--check',js],{stdio:'pipe'}); }
  catch { failures.push(`Sintaxis JS inválida: ${js}`); }
}

if (failures.length) {
  console.error('INTEGRITY CHECK: FAIL');
  for (const f of failures) console.error(`- ${f}`);
  process.exit(1);
}
console.log(`INTEGRITY CHECK: PASS · ${required.length} archivos núcleo · ${pages.length} páginas · ${ids.length} IDs auditados · capa común verificada`);
