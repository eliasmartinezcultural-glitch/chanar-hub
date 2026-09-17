import fs from 'node:fs/promises';

const sources = [
  { id:'municipalidad', url:'https://sanpatricio.gob.ar/', must:['Quili Malal 314','+54 2994084225'] },
  { id:'municipal-nuestra', url:'https://sanpatricio.gob.ar/nuestra', must:['Balneario Municipal','Plaza de las Infancias','Centro Cultural Erika Barión de Werro','Puesto Chañar','Mirador La Virgen'] },
  { id:'municipal-quehacer', url:'https://sanpatricio.gob.ar/quehacer', must:['Bodega Schroeder','Bodega Malma','Bodega del Fin del Mundo','Bodega Secreto Patagónico'] },
  { id:'municipal-tramites', url:'https://www.sanpatricio.gob.ar/tramites', must:['CARNET DE CONDUCIR','LIBRE DEUDA'] },
  { id:'cfpa2', url:'https://www.neuquen.edu.ar/_trayectos_formativos_partial/', must:['CENTRO DE FORMACIÓN PROFESIONAL AGROPECUARIO N° 2 SAN PATRICIO DEL CHAÑAR','GASPARRI Y ALERCES'] },
  { id:'epea3', url:'https://boficial.neuquen.gov.ar/LeyesDecretosDetalle?Id=426027', must:['EPEA N. 3 PATRICIO DEL CHAÑAR'] },
  { id:'escuela364', url:'https://www.neuquen.edu.ar/tag/escuela-364/', must:['Escuela Primaria N° 364 de San Patricio del Chañar','Lago Aluminé','Arroyo Covunco'] },
  { id:'cef10', url:'https://www.neuquen.edu.ar/comenzaron-trabajos-para-la-mejora-del-cef-10/', must:['Centro de Educación Física (CEF) N° 10','San Patricio del Chañar'] },
  { id:'epet26', url:'https://www.neuqueninforma.gob.ar/noticias/2025/12/16/253867-figueroa-estamos-trabajando-para-erradicar-las-escuelas-trailer', must:['EPET 26','San Patricio del Chañar'] },
  { id:'registro-civil', url:'https://registrocivil.neuquen.gob.ar/oficinas-del-registro-civil-abren-este-domingo-para-entrega-de-dni/', must:['San Patricio del Chañar','Michay 100'] }
];

const normalize = s => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const report = { checkedAt:new Date().toISOString(), policy:'check-source-presence-only', sources:[] };

for (const source of sources) {
  const row = { ...source, ok:false, httpStatus:null, matches:[], missing:[], checkedAt:new Date().toISOString() };
  try {
    const response = await fetch(source.url, { redirect:'follow', headers:{'user-agent':'chanar-hub-source-audit/1.0'} });
    row.httpStatus = response.status;
    const text = await response.text();
    const hay = normalize(text);
    row.matches = source.must.filter(term => hay.includes(normalize(term)));
    row.missing = source.must.filter(term => !hay.includes(normalize(term)));
    row.ok = response.ok && row.missing.length === 0;
  } catch (error) {
    row.error = String(error?.message || error);
  }
  report.sources.push(row);
}

await fs.mkdir('data', { recursive:true });
await fs.writeFile('data/source-audit-latest.json', JSON.stringify(report, null, 2) + '\n');
const failed = report.sources.filter(x => !x.ok);
console.log(`Fuentes comprobadas: ${report.sources.length}; OK: ${report.sources.length-failed.length}; revisar: ${failed.length}`);
if (failed.length) {
  console.log(failed.map(x => `${x.id}: HTTP ${x.httpStatus ?? 'n/a'}; faltan: ${(x.missing||[]).join(', ')}`).join('\n'));
}
