import fs from 'node:fs/promises';

const sources = [
  { id:'municipalidad', url:'https://sanpatricio.gob.ar/', must:['Quili Malal 314','+54 299 4084225'], authority:'official' },
  { id:'municipal-nuestra', url:'https://sanpatricio.gob.ar/nuestra', must:['Balneario Municipal','Plaza de las Infancias','Centro Cultural Erika Barión de Werro','Puesto Chañar','Mirador La Virgen'], authority:'official' },
  { id:'municipal-quehacer', url:'https://sanpatricio.gob.ar/quehacer', must:['Bodega Schroeder','Bodega Malma','Bodega del Fin del Mundo','Bodega Secreto Patagónico'], authority:'official' },
  { id:'municipal-tramites', url:'https://www.sanpatricio.gob.ar/tramites', must:['CARNET DE CONDUCIR','LIBRE DEUDA'], authority:'official' },
  { id:'cfpa2', url:'https://www.neuquen.edu.ar/_trayectos_formativos_partial/', must:['CENTRO DE FORMACIÓN PROFESIONAL AGROPECUARIO N° 2 SAN PATRICIO DEL CHAÑAR','GASPARRI Y ALERCES','299676949'], authority:'official' },
  { id:'epea3', url:'https://boficial.neuquen.gov.ar/LeyesDecretosDetalle?Id=426027', must:['EPEA N. 3 PATRICIO DEL CHAÑAR'], authority:'official-regulation' },
  { id:'escuelas-derivantes', url:'https://inscripciones.neuquen.edu.ar/wp-content/uploads/2025/10/escuelas_derivantantes_rpt_24102025.pdf', must:['ESCUELA PRIMARIA 273 CARLOS JULIO SANG','CENTRO PROVINCIAL DE ENSEÑANZA MEDIA 31','ESCUELA PRIMARIA 364'], authority:'official' },
  { id:'escuela364', url:'https://www.neuquen.edu.ar/tag/escuela-364/', must:['Escuela Primaria N° 364 de San Patricio del Chañar','Lago Aluminé','Arroyo Covunco'], authority:'official' },
  { id:'escuela191', url:'https://www.neuquen.edu.ar/relevaron-trabajos-en-escuelas-de-centenario-san-patricio-del-chanar-anelo-y-los-chihuidos/', must:['191 de San Patricio del Chañar','CPEM N° 31'], authority:'official' },
  { id:'escuela342', url:'https://www.neuquen.edu.ar/se-entrego-la-escuela-342-lista-para-el-regreso-a-clases/', must:['escuela primaria N° 342 de San Patricio del Chañar','puesta en funcionamiento'], authority:'official' },
  { id:'cef10', url:'https://www.neuquen.edu.ar/comenzaron-trabajos-para-la-mejora-del-cef-10/', must:['Centro de Educación Física (CEF) N° 10','San Patricio del Chañar'], authority:'official' },
  { id:'epet26', url:'https://www.neuquen.edu.ar/tag/epet-26/', must:['EPET N° 26','San Patricio del Chañar','noviembre de 2026'], authority:'official' },
  { id:'registro-civil-oficinas', url:'https://registrocivil.neuquen.gob.ar/oficinas/', must:['San Patricio del Chañar','Pje. El Arco Casa N° 98','0299)4855098'], authority:'official' },
  { id:'registro-civil-provisorio', url:'https://registrocivil.neuquen.gob.ar/nueva-oficina-de-registro-civil-en-san-patricio-del-chanar/', must:['Michay Nº100','funcionamiento provisorio','Oficina Seccional Nº2479'], authority:'official' },
  { id:'centro-dia', url:'https://www.neuqueninforma.gob.ar/amp/noticias/2026/07/20/260695-comenzo-la-obra-del-centro-de-dia-en-san-patricio-del-chanar', must:['Centro de Día','San Patricio del Chañar','75 metros cuadrados'], authority:'official' },
  { id:'centro-deportivo-comunitario', url:'https://www.neuqueninforma.gob.ar/noticias/2026/08/02/261335-la-provincia-construira-un-nuevo-centro-deportivo-comunitario-en-san-patricio-del-chanar', must:['Centro Deportivo Comunitario','San Patricio del Chañar','12 meses'], authority:'official' }
];

const normalize = s => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const checkedAt = new Date().toISOString();
const report = { schemaVersion:'1.2', checkedAt, policy:'check-source-presence-only', automaticChangesApplied:false, note:'La auditoría comprueba accesibilidad y presencia de evidencia textual. No modifica nombres, coordenadas, teléfonos, horarios ni estados operativos automáticamente.', sources:[] };

for (const source of sources) {
  const row = { ...source, ok:false, httpStatus:null, matches:[], missing:[], checkedAt };
  try {
    const response = await fetch(source.url, { redirect:'follow', headers:{'user-agent':'chanar-hub-source-audit/1.2'} });
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

report.summary = { total:report.sources.length, ok:report.sources.filter(x=>x.ok).length, review:report.sources.filter(x=>x.reviewRequired).length };
await fs.mkdir('data', { recursive:true });
await fs.writeFile('data/source-audit-latest.json', JSON.stringify(report, null, 2) + '\n');
const failed = report.sources.filter(x => !x.ok);
console.log(`Fuentes comprobadas: ${report.sources.length}; OK: ${report.summary.ok}; revisar: ${report.summary.review}`);
if (failed.length) console.log(failed.map(x => `${x.id}: HTTP ${x.httpStatus ?? 'n/a'}; faltan: ${(x.missing||[]).join(', ')}`).join('\n'));
