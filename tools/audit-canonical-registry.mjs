import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';

const root = process.cwd();
const errors = [];
const warnings = [];
const rows = [];

function load(file, key) {
  const full = path.join(root, file);
  if (!fs.existsSync(full)) {
    errors.push(`${file}: archivo inexistente`);
    return null;
  }
  const source = fs.readFileSync(full, 'utf8');
  const context = { window: {} };
  try { vm.runInNewContext(source, context, { filename: file }); }
  catch (err) { errors.push(`${file}: JS inválido: ${err.message}`); return null; }
  if (!context.window[key]) { errors.push(`${file}: falta window.${key}`); return null; }
  return context.window[key];
}

const geo = load('geo-data.js', 'CHANAR_GEO');
const territory = load('geo-territory.js', 'CHANAR_TERRITORY');

function audit(item, type) {
  const problems = [];
  if (!item.id) problems.push('ID');
  if (!item.name) problems.push('nombre');
  if (!item.category) problems.push('categoría');
  if (!item.source) problems.push('fuente');
  if (!item.sourceUrl) problems.push('URL de fuente');
  if (!/^\\d{4}-\\d{2}-\\d{2}$/.test(String(item.verifiedAt || ''))) problems.push('fecha de verificación');

  if (type === 'place') {
    const coords = Number.isFinite(item.lat) && Number.isFinite(item.lon);
    if (item.status === 'verified' && !coords) problems.push('coordenadas verificadas ausentes');
    if (coords && (item.lat < -90 || item.lat > 90 || item.lon < -180 || item.lon > 180)) problems.push('coordenadas fuera de rango');
    if (item.status === 'pending' && coords) warnings.push(`${item.id}: pending conserva coordenadas; revisar si son publicables`);
  }

  if (type === 'territory' && !item.geometry) problems.push('geometría');

  rows.push({
    id: item.id,
    type,
    name: item.name,
    category: item.category,
    status: item.status || 'verified',
    spatial: type === 'territory' ? (item.geometry ? 'geometry' : 'missing') : ((Number.isFinite(item.lat) && Number.isFinite(item.lon)) ? 'coordinates' : 'unlocated'),
    result: problems.length ? 'REVISAR' : 'OK',
    problems
  });

  if (problems.length) errors.push(`${type}:${item.id || '(sin id)'} → ${problems.join(', ')}`);
}

if (geo?.places) geo.places.forEach(x => audit(x, 'place'));
if (territory?.territories) territory.territories.forEach(x => audit(x, 'territory'));

const identities = new Map();
for (const row of rows) {
  const key = `${row.type}:${row.id}`;
  if (identities.has(key)) errors.push(`identidad duplicada: ${key}`);
  identities.set(key, row);
}

const categories = new Set(geo?.categories || []);
for (const row of rows.filter(x => x.type === 'place')) {
  if (row.category && !categories.has(row.category)) warnings.push(`${row.id}: categoría fuera del catálogo`);
}

const report = {
  generatedAt: new Date().toISOString(),
  summary: {
    total: rows.length,
    places: rows.filter(x => x.type === 'place').length,
    territories: rows.filter(x => x.type === 'territory').length,
    ok: rows.filter(x => x.result === 'OK').length,
    review: rows.filter(x => x.result === 'REVISAR').length,
    errors: errors.length,
    warnings: warnings.length
  },
  records: rows,
  errors,
  warnings
};

fs.mkdirSync(path.join(root, 'reports'), { recursive: true });
fs.writeFileSync(path.join(root, 'reports/canonical-registry-audit.json'), JSON.stringify(report, null, 2));

console.log(`Inventario canónico: ${report.summary.total} registros | ${report.summary.ok} OK | ${report.summary.review} para revisar`);
for (const row of rows) console.log(`[${row.result}] ${row.type}:${row.id} — ${row.name}${row.problems.length ? ` — ${row.problems.join(', ')}` : ''}`);
for (const warning of warnings) console.warn(`WARN: ${warning}`);
if (errors.length) process.exit(1);
