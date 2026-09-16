import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';

const root = process.cwd();
const errors = [];
const warnings = [];

function loadWindowFile(file, key) {
  const full = path.join(root, file);
  if (!fs.existsSync(full)) {
    errors.push(`${file}: archivo inexistente`);
    return null;
  }
  const source = fs.readFileSync(full, 'utf8');
  const context = { window: {} };
  try {
    vm.runInNewContext(source, context, { filename: file });
  } catch (err) {
    errors.push(`${file}: JavaScript inválido: ${err.message}`);
    return null;
  }
  if (!context.window[key]) {
    errors.push(`${file}: no define window.${key}`);
    return null;
  }
  return context.window[key];
}

function finiteCoord(value) {
  return Number.isFinite(value);
}

function validLonLat(lon, lat) {
  return finiteCoord(lon) && finiteCoord(lat) && lon >= -180 && lon <= 180 && lat >= -90 && lat <= 90;
}

function checkSource(item, label) {
  if (!item.source || typeof item.source !== 'string') errors.push(`${label}: falta source`);
  if (!item.sourceUrl || typeof item.sourceUrl !== 'string') errors.push(`${label}: falta sourceUrl`);
  if (!item.verifiedAt || !/^\d{4}-\d{2}-\d{2}$/.test(item.verifiedAt)) errors.push(`${label}: verifiedAt inválido o ausente`);
}

function checkUnique(items, key, label) {
  const seen = new Set();
  for (const item of items) {
    const value = item?.[key];
    if (!value) {
      errors.push(`${label}: registro sin ${key}`);
      continue;
    }
    if (seen.has(value)) errors.push(`${label}: ${key} duplicado: ${value}`);
    seen.add(value);
  }
}

function checkGeometry(geometry, label) {
  if (!geometry || !geometry.type || !Array.isArray(geometry.coordinates)) {
    errors.push(`${label}: geometría GeoJSON ausente o inválida`);
    return;
  }
  if (geometry.type === 'Polygon') {
    if (!Array.isArray(geometry.coordinates[0]) || geometry.coordinates[0].length < 4) {
      errors.push(`${label}: Polygon sin anillo suficiente`);
      return;
    }
    const ring = geometry.coordinates[0];
    const first = ring[0];
    const last = ring[ring.length - 1];
    if (!Array.isArray(first) || !Array.isArray(last) || first[0] !== last[0] || first[1] !== last[1]) {
      errors.push(`${label}: Polygon con anillo exterior no cerrado`);
    }
    for (const point of ring) {
      if (!Array.isArray(point) || !validLonLat(point[0], point[1])) errors.push(`${label}: coordenada fuera de rango`);
    }
  } else if (geometry.type === 'LineString') {
    if (geometry.coordinates.length < 2) errors.push(`${label}: LineString insuficiente`);
    for (const point of geometry.coordinates) {
      if (!Array.isArray(point) || !validLonLat(point[0], point[1])) errors.push(`${label}: coordenada fuera de rango`);
    }
  } else {
    warnings.push(`${label}: tipo geométrico no auditado automáticamente: ${geometry.type}`);
  }
}

const data = loadWindowFile('data.js', 'CHANAR_DATA');
const geo = loadWindowFile('geo-data.js', 'CHANAR_GEO');
const territory = loadWindowFile('geo-territory.js', 'CHANAR_TERRITORY');

for (const file of ['index.html', 'mapa.html', 'data.js', 'geo-data.js', 'geo-territory.js']) {
  if (!fs.existsSync(path.join(root, file))) errors.push(`${file}: archivo requerido ausente`);
}

if (data) {
  if (!data.meta?.version) warnings.push('data.js: meta.version ausente');
  if (!data.place?.name) errors.push('data.js: falta place.name');
  if (!Array.isArray(data.places)) errors.push('data.js: places no es un array');
  else {
    const names = new Set();
    for (const p of data.places) {
      if (!p.name) errors.push('data.js: lugar sin nombre');
      if (p.name && names.has(p.name)) warnings.push(`data.js: nombre repetido: ${p.name}`);
      if (p.name) names.add(p.name);
      if (p.source && !p.url) warnings.push(`data.js: ${p.name}: source presente pero falta url`);
    }
  }
}

if (geo) {
  if (!Array.isArray(geo.categories) || geo.categories.length === 0) errors.push('geo-data.js: categories vacío');
  if (!Array.isArray(geo.places)) errors.push('geo-data.js: places no es un array');
  else {
    checkUnique(geo.places, 'id', 'geo-data.js places');
    for (const p of geo.places) {
      const label = `geo-data.js ${p.id || p.name || '(sin id)'}`;
      if (!p.name) errors.push(`${label}: falta name`);
      if (!p.category) errors.push(`${label}: falta category`);
      if (Array.isArray(geo.categories) && p.category && !geo.categories.includes(p.category)) {
        warnings.push(`${label}: categoría no declarada en categories: ${p.category}`);
      }
      if (p.status === 'verified') {
        if (!validLonLat(p.lon, p.lat)) errors.push(`${label}: status=verified pero lat/lon inválidos o ausentes`);
        checkSource(p, label);
      } else if (p.status === 'pending') {
        if (p.lat !== undefined || p.lon !== undefined) warnings.push(`${label}: pending conserva coordenadas; revisar antes de publicar`);
      } else {
        errors.push(`${label}: status desconocido: ${p.status}`);
      }
    }
  }
}

if (territory) {
  if (!Array.isArray(territory.territories)) errors.push('geo-territory.js: territories no es un array');
  else {
    checkUnique(territory.territories, 'id', 'geo-territory.js territories');
    for (const t of territory.territories) {
      const label = `geo-territory.js ${t.id || t.name || '(sin id)'}`;
      if (!t.name) errors.push(`${label}: falta name`);
      if (!t.kind) errors.push(`${label}: falta kind`);
      if (t.status !== 'verified') errors.push(`${label}: estado territorial inesperado: ${t.status}`);
      checkSource(t, label);
      checkGeometry(t.geometry, label);
    }
  }
}

const index = fs.existsSync(path.join(root, 'index.html')) ? fs.readFileSync(path.join(root, 'index.html'), 'utf8') : '';
const map = fs.existsSync(path.join(root, 'mapa.html')) ? fs.readFileSync(path.join(root, 'mapa.html'), 'utf8') : '';
for (const required of ['data.js', 'mapa.html', 'services', 'lodging', 'vecinos']) {
  if (!index.includes(required)) warnings.push(`index.html: no se encontró referencia esperada a ${required}`);
}
for (const required of ['leaflet', 'geo-data.js', 'geo-territory.js', 'CHANAR_GEO', 'CHANAR_TERRITORY']) {
  if (!map.includes(required)) errors.push(`mapa.html: falta integración esperada: ${required}`);
}

console.log(`Chañar HUB audit: ${errors.length} errores, ${warnings.length} advertencias`);
for (const message of errors) console.error(`ERROR: ${message}`);
for (const message of warnings) console.warn(`WARN: ${message}`);
if (errors.length) process.exit(1);
