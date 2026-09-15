const BASE = 'https://dpcatastro.neuquen.gov.ar/server/rest/services/Base/MapServer';
const OUTPUT = 'geo-territory.js';

const targets = [
  { layer: 10, objectIds: [92], kind: 'Ejido', category: 'Territorio', subcategory: 'Ejido', labelField: 'EJL_NOMBRE', idPrefix: 'ejido' },
  { layer: 5, objectIds: [2, 71, 251], kind: 'Ruta provincial', category: 'Movilidad', subcategory: 'Ruta provincial', labelField: 'VCM_NOMBRE', idPrefix: 'ruta' },
  { layer: 2, objectIds: [44739], kind: 'Hidrografía', category: 'Hidrografía', subcategory: 'Río', labelField: 'HDR_NOMBRE', idPrefix: 'agua' }
];

function escJson(value){ return JSON.stringify(value); }

async function query(target){
  const params = new URLSearchParams({
    objectIds: target.objectIds.join(','),
    outFields: '*',
    returnGeometry: 'true',
    outSR: '4326',
    f: 'json'
  });
  const url = `${BASE}/${target.layer}/query?${params}`;
  const res = await fetch(url);
  if(!res.ok) throw new Error(`HTTP ${res.status} al consultar capa ${target.layer}`);
  const data = await res.json();
  if(data.error) throw new Error(JSON.stringify(data.error));
  return { target, data, url };
}

function normalizeGeometry(raw){
  if(!raw) return null;
  if(Array.isArray(raw.paths)) return { type:'MultiLineString', coordinates:raw.paths };
  if(Array.isArray(raw.rings)) return { type:'Polygon', coordinates:raw.rings };
  if(Number.isFinite(raw.x) && Number.isFinite(raw.y)) return { type:'Point', coordinates:[raw.x, raw.y] };
  return null;
}

const results = await Promise.all(targets.map(query));
const territories = [];

for(const {target,data,url} of results){
  for(const feature of data.features || []){
    const attrs = feature.attributes || {};
    const geometry = normalizeGeometry(feature.geometry);
    if(!geometry) continue;
    const objectId = attrs.OBJECTID;
    const name = String(attrs[target.labelField] || '').trim();
    if(!name) continue;
    territories.push({
      id: `${target.idPrefix}-${objectId}`,
      name,
      kind: target.kind,
      category: target.category,
      subcategory: target.subcategory,
      geometry,
      status: 'verified',
      confidence: 'high',
      sourceType: 'official',
      source: 'DPCeIT · Base catastral provincial',
      sourceUrl: `${BASE}/${target.layer}`,
      verifiedAt: '2026-09-15',
      verificationMethod: 'consulta directa del geoservicio provincial por OBJECTID + revisión editorial de utilidad pública',
      sourceObjectId: objectId,
      sourceQuery: url
    });
  }
}

const output = `window.CHANAR_TERRITORY = ${JSON.stringify({
  schemaVersion:'1.0',
  updated:'2026-09-15',
  attribution:'Chañar HUB · Ocarina Producciones',
  territories
}, null, 2)};\n`;

await import('node:fs/promises').then(fs => fs.writeFile(OUTPUT, output, 'utf8'));
console.log(`Territorios publicados: ${territories.length}`);
for(const x of territories) console.log(`- ${x.id}: ${x.name} (${x.geometry.type})`);
