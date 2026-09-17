import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';

const root = process.cwd();
const required = ['index.html','viajero.html','vecinos.html','mapa.html','auditoria.html','compartir.html','chanar-ui.css','chanar-registry.js','geo-data.js','geo-territory.js','chanar-hub-core.js','data.js','404.html','.nojekyll','data/chanar-audit-2026-09-17.json','data/chanar-v1-lock.json','scripts/source-audit.mjs'];
const pages = ['index.html','viajero.html','vecinos.html','mapa.html','auditoria.html','compartir.html'];
const jsCore = ['chanar-registry.js','geo-data.js','geo-territory.js','data.js','chanar-hub-core.js','scripts/source-audit.mjs','scripts/integrity-check.mjs'];
let failures = [];
for (const file of required) if (!existsSync(join(root,file))) failures.push(`Falta archivo núcleo: ${file}`);
for (const file of pages) {
  if (!existsSync(join(root,file))) continue;
  const html = readFileSync(join(root,file),'utf8');
  if (!/<meta[^>]+name=["']viewport["'][^>]*content=["'][^"']*width=device-width/i.test(html)) failures.push(`${file}: falta viewport mobile`);
  if (!/<title>[^<]+<\/title>/i.test(html)) failures.push(`${file}: falta title`);
  if (file !== 'vecinos.html' && file !== 'viajero.html' && !html.includes('chanar-ui.css')) failures.push(`${file}: falta referencia a chanar-ui.css`);
  if (file !== 'compartir.html' && !html.includes('chanar-registry.js')) failures.push(`${file}: falta referencia a chanar-registry.js`);
  for (const bad of ['localhost:', '127.0.0.1']) if (html.includes(bad)) failures.push(`${file}: contiene referencia local ${bad}`);
}
const registry = readFileSync(join(root,'chanar-registry.js'),'utf8');
for (const token of ['CHANAR_REGISTRY','identityKey','publication','spatialStatus']) if (!registry.includes(token)) failures.push(`Registro: falta contrato ${token}`);
const ids = [...registry.matchAll(/\bid\s*:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
const duplicateIds = ids.filter((id, i) => ids.indexOf(id) !== i);
for (const id of [...new Set(duplicateIds)]) failures.push(`Registro: ID duplicado ${id}`);
const retiredIds = [...registry.matchAll(/\{id:['"]([^'"]+)['"],status:['"]retired['"]/g)].map(m => m[1]);
const activeSection = registry.split('places:')[1] || registry;
for (const id of retiredIds) if ([...activeSection.matchAll(new RegExp(`\\bid:['"]${id}['"]`, 'g'))].length > 1) failures.push(`Registro: ID retirado reutilizado como activo ${id}`);
const geoBridge = readFileSync(join(root,'geo-data.js'),'utf8');
const legacyBridge = readFileSync(join(root,'data.js'),'utf8');
const core = readFileSync(join(root,'chanar-hub-core.js'),'utf8');
if (!geoBridge.includes('Fuente única: CHANAR_REGISTRY') || !geoBridge.includes('chanar-hub-core.js')) failures.push('Puente geográfico: no apunta claramente al registro/capa común');
if (!legacyBridge.includes('Fuente única: CHANAR_REGISTRY') || legacyBridge.includes('const places = [') || legacyBridge.includes('let places = [')) failures.push('Legado: data.js dejó de ser un puente limpio');
for (const token of ['hub-core-nav','hub-core-bottom','hub-core-quick']) if (!core.includes(token)) failures.push(`Capa común: falta componente ${token}`);
for (const js of jsCore) { try { execFileSync(process.execPath,['--check',js],{stdio:'pipe'}); } catch { failures.push(`Sintaxis JS inválida: ${js}`); } }
if (failures.length) { console.error('INTEGRITY CHECK: FAIL'); for (const f of failures) console.error(`- ${f}`); process.exit(1); }
console.log(`INTEGRITY CHECK: PASS · ${required.length} archivos núcleo · ${pages.length} páginas · ${ids.length} IDs auditados · capa común verificada`);
