import fs from 'node:fs/promises';

const sources = [
  { id:'municipalidad', url:'https://sanpatricio.gob.ar/', must:['Quili Malal 314','+54 299 4084225'], authority:'official' },
  { id:'municipal-nuestra', url:'https://sanpatricio.gob.ar/nuestra', must:['Balneario Municipal','Plaza de las Infancias','Centro Cultural Erika Barión de Werro','Puesto Chañar','Mirador La Virgen'], authority:'official' },
  { id:'municipal-quehacer', url:'https://sanpatricio.gob.ar/quehacer', must:['Bodega Schroeder','Bodega Malma','Bodega del Fin del Mundo','Bodega Secreto Patagónico'], authority:'official' },
  { id:'municipal-tramites', url:'https://www.sanpatricio.gob.ar/tramites', must:['CARNET DE CONDUCIR','LIBRE DEUDA'], authority:'official' },
  { id:'cfpa2', url:'https://www.neuquen.edu.ar/_trayectos_formativos_partial/', must:['CENTRO DE FORMACIÓN PROFESIONAL AGROPECUARIO N° 2 SAN PATRICIO DEL CHAÑAR','GASPARRI Y ALERCES'], authority:'official' },
  { id:'epea3', url:'https://boficial.neuquen.gov.ar/LeyesDecretosDetalle?Id=426027', must:['EPEA N. 3 PATRICIO DEL CHAÑAR'], authority:'official-regulation' },
  { id:'escuela364', url:'https://www.neuquen.edu.ar/tag/escuela-364/', must:['Escuela Primaria N° 364 de San Patricio del Chañar','Lago Aluminé','Arroyo Covunco'], authority:'official' },
  { id:'cef10', url:'https://www.neuquen.edu.ar/comenzaron-trabajos-para-la-mejora-del-cef-10/', must:['Centro de Educación Física (CEF) N° 10','San Patricio del Chañar'], authority:'official' },
  { id:'epet26', url:'https://www.neuqueninforma.gob.ar/noticias/2025/12/16/253867-figueroa-estamos-trabajando-para-erradicar-las-escuelas-trailer', must:['EPET 26','San Patricio del Chañar'], authority:'official' },
  { id:'registro-civil', url:'https://registrocivil.neuquen.gob.ar/oficinas-del-registro-civil-abren-este-domingo-para-entrega-de-dni/', must:['San Patricio del Chañar','Michay 100'], authority:'official' }
];

const normalize = s => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const checkedAt = new Date().toISOString();
const report = {
  schemaVersion:'1.1', checkedAt,
  policy:'check-source-presence-only',
  automaticChangesApplied:false,
  note:'La auditoría comprueba accesibilidad y presencia de evidencia textual. No modifica nombres, coordenadas, teléfonos, horarios ni estados operativos automáticamente.',
  sources:[]
};

for (const source of sources) {
  const row = { ...source, ok:false, httpStatus:null, matches:[], missing:[], checkedAt };
  try {
    const response = await fetch(source.url, { redirect:'follow', headers:{'user-agent':'chanar-hub-source-audit/1.1'} });
    row.httpStatus = response.status;
    const text = await response.text();
    const hay = normalize(text);
    row.matches = source.must.filter(term => hay.includes(normalize(term)));
    row.missing = source.must.filter(term => !hay.includes(normalize(term)));
    row.ok = response.ok && row.missing.length === 0;
    row.reviewRequired = !row.ok;
  } catch (error) {
    row.error = String(error?.message || error);
    row.reviewRequired = true;
  }
  report.sources.push(row);
}

report.summary = {
  total:report.sources.length,
  ok:report.sources.filter(x=>x.ok).length,
  review:report.sources.filter(x=>x.reviewRequired).length
};

await fs.mkdir('data', { recursive:true });
await fs.writeFile('data/source-audit-latest.json', JSON.stringify(report, null, 2) + '\n');
const failed = report.sources.filter(x => !x.ok);
console.log(`Fuentes comprobadas: ${report.sources.length}; OK: ${report.summary.ok}; revisar: ${report.summary.review}`);
if (failed.length) console.log(failed.map(x => `${x.id}: HTTP ${x.httpStatus ?? 'n/a'}; faltan: ${(x.missing||[]).join(', ')}`).join('\n'));
