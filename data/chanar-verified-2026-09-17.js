/* CHANAR HUB — CAPA DE VERIFICACIÓN 2026-09-17
   Esta capa NO reemplaza ciegamente geo-data.js.
   Corrige nombres, estados, direcciones y fuentes cuando existe evidencia reciente.
   Las coordenadas se publican solo cuando están verificadas por una fuente espacial.
*/
window.CHANAR_VERIFIED_2026 = {
  checkedAt: '2026-09-17',
  schemaVersion: '1.0',
  sourcePolicy: 'official-first',
  places: [
    {
      id:'emeta', status:'retired', replacementId:'epea3',
      note:'No publicar EMETA como nombre actual. La institución vigente se identifica como EPEA N° 3.',
      source:'Boletín Oficial del Neuquén',
      sourceUrl:'https://boficial.neuquen.gov.ar/LeyesDecretosDetalle?Id=426027'
    },
    {
      id:'epea3', name:'EPEA N° 3', category:'Educación', subcategory:'Educación agropecuaria',
      status:'verified', confidence:'high', address:'Picadas Este y Oeste 5 y 6; Norte y Sur lindan con chacras en producción',
      description:'Escuela Provincial de Enseñanza Agropecuaria N° 3. La documentación provincial 2026 confirma su actividad institucional.',
      sourceType:'official', source:'Boletín Oficial del Neuquén / UPEFE',
      sourceUrl:'https://boficial.neuquen.gov.ar/LeyesDecretosDetalle?Id=426027',
      sourceUrl2:'https://www.upefe.gob.ar/ampliacion-epea-3/', verifiedAt:'2026-09-17',
      tags:['educación','agropecuaria','EPEA','producción']
    },
    {
      id:'centro-formacion-agropecuaria', name:'Centro de Formación Profesional Agropecuaria N° 2 “Puesto Chañar”', category:'Educación', subcategory:'Formación profesional agropecuaria',
      status:'verified', confidence:'high', address:'Av. Gasparri Norte y Alerces',
      description:'Centro de formación profesional con trayectos vinculados a cocina, horticultura, apicultura, turismo local, maquinaria agrícola, vino y otras actividades.',
      sourceType:'official', source:'Consejo Provincial de Educación del Neuquén',
      sourceUrl:'https://www.neuquen.edu.ar/_trayectos_formativos_partial/',
      sourceUrl2:'https://sanpatricio.gob.ar/nuestra', verifiedAt:'2026-09-17',
      tags:['educación','CFPA','Puesto Chañar','oficios','agropecuaria']
    },
    {
      id:'esc273', name:'Escuela Primaria N° 273 Carlos Julio Sang', category:'Educación', subcategory:'Primaria',
      status:'verified', confidence:'high',
      description:'Escuela primaria local. El nombre completo “Carlos Julio Sang” aparece en documentación oficial.',
      sourceType:'official', source:'Argentina.gob.ar / ORSEP',
      sourceUrl:'https://www.argentina.gob.ar/node/429820', verifiedAt:'2026-09-17',
      tags:['educación','primaria','escuela 273']
    },
    {
      id:'escuela364', name:'Escuela Primaria N° 364', category:'Educación', subcategory:'Primaria',
      status:'verified', confidence:'high', address:'Entre Lago Aluminé, Arroyo Covunco y Av. Ignacio Roberto Gasparri Sur',
      description:'Nuevo edificio inaugurado el 6 de marzo de 2026. Cuenta con aulas, aula taller, biblioteca, SUM, cocina, kiosco y playón deportivo.',
      sourceType:'official', source:'Consejo Provincial de Educación del Neuquén',
      sourceUrl:'https://www.neuquen.edu.ar/tag/escuela-364/', verifiedAt:'2026-09-17',
      tags:['educación','primaria','escuela 364','edificio nuevo']
    },
    {
      id:'epet26', name:'EPET N° 26', category:'Educación', subcategory:'Secundaria técnica',
      status:'verified', confidence:'high', address:'Av. Malvinas Argentinas, Pehuén y Alerce',
      description:'Escuela Provincial de Educación Técnica N° 26. La institución existe; el edificio propio estaba en obra durante 2026, con finalización prevista para noviembre de 2026.',
      sourceType:'official', source:'Boletín Oficial del Neuquén / Gobierno del Neuquén',
      sourceUrl:'https://infoleg.neuquen.gov.ar/LeyesDecretosDetalle?id=413986',
      sourceUrl2:'https://www.neuqueninforma.gob.ar/noticias/2025/12/16/253867-figueroa-estamos-trabajando-para-erradicar-las-escuelas-trailer', verifiedAt:'2026-09-17',
      tags:['educación','técnica','EPET','obra']
    },
    {
      id:'cpem31', name:'CPEM N° 31', category:'Educación', subcategory:'Secundaria',
      status:'verified', confidence:'high', address:'Complejo El Chocón s/n', phone:'0299 485-5095',
      description:'Centro Provincial de Educación Media N° 31.',
      sourceType:'official', source:'Consejo Provincial de Educación del Neuquén',
      sourceUrl:'https://www.neuquen.edu.ar/wp-content/uploads/2019/08/Correos-de-escuelas-de-Neuqu%C3%A9n-.pdf', verifiedAt:'2026-09-17',
      tags:['educación','secundaria','CPEM 31']
    },
    {
      id:'jardin67', name:'Jardín de Infantes N° 67', category:'Educación', subcategory:'Inicial',
      status:'verified', confidence:'high',
      description:'Institución de nivel inicial identificada en normativa provincial vigente.',
      sourceType:'official', source:'Boletín Oficial del Neuquén',
      sourceUrl:'https://infoleg.neuquen.gov.ar/LeyesDecretosDetalle?Id=426019', verifiedAt:'2026-09-17',
      tags:['educación','inicial','jardín']
    },
    {
      id:'cef', name:'Centro de Educación Física N° 10', category:'Deporte', subcategory:'Educación física',
      status:'verified', confidence:'high',
      description:'Centro de Educación Física N° 10. Durante 2026 se iniciaron trabajos de mejora del playón deportivo y de las instalaciones eléctricas exteriores.',
      sourceType:'official', source:'Consejo Provincial de Educación del Neuquén',
      sourceUrl:'https://www.neuquen.edu.ar/comenzaron-trabajos-para-la-mejora-del-cef-10/', verifiedAt:'2026-09-17',
      tags:['deporte','CEF 10','natatorio','educación física','playón']
    },
    {
      id:'municipalidad', name:'Municipalidad de San Patricio del Chañar', category:'Instituciones', subcategory:'Gobierno local',
      status:'verified', confidence:'high', address:'Quili Malal 314', phone:'+54 299 408-4225',
      description:'Sede municipal. La página oficial publica dirección, contacto y horario de atención.',
      sourceType:'official', source:'Municipalidad de San Patricio del Chañar',
      sourceUrl:'https://sanpatricio.gob.ar/', verifiedAt:'2026-09-17', tags:['municipalidad','gobierno','trámites']
    },
    {
      id:'hospital-spc', name:'Hospital Dra. Alicia Cruz', category:'Salud', subcategory:'Hospital',
      status:'verified', confidence:'high', address:'Arroyito s/n', phone:'0299 485-5084',
      description:'Establecimiento hospitalario local. Para urgencias, verificar siempre el número operativo y la modalidad de atención vigente.',
      sourceType:'official', source:'Gobierno de la Provincia del Neuquén',
      sourceUrl:'https://boletinoficial.neuquen.gov.ar/LeyesDecretosDetalle?Id=420163', verifiedAt:'2026-09-17',
      tags:['salud','hospital','emergencias']
    },
    {
      id:'registro-civil', name:'Registro Civil · Seccional San Patricio del Chañar', category:'Instituciones', subcategory:'Registro público',
      status:'verified', confidence:'high', address:'Michay 100',
      description:'La sede publicada para San Patricio del Chañar es Michay 100. Conviene confirmar horario antes de concurrir porque la atención puede modificarse.',
      sourceType:'official', source:'Registro Civil / Gobierno del Neuquén',
      sourceUrl:'https://registrocivil.neuquen.gob.ar/oficinas-del-registro-civil-abren-este-domingo-para-entrega-de-dni/', verifiedAt:'2026-09-17',
      tags:['registro civil','trámites','DNI']
    },
    {
      id:'bomberos', name:'Cuartel de Bomberos N° 5 Sub. Of. Myr. (R.) Enrique Félix Moya', category:'Instituciones', subcategory:'Emergencias',
      status:'verified', confidence:'high', address:'Lago Ramos Mejía', phone:'+54 299 485-5523',
      description:'Cuartel de Bomberos de San Patricio del Chañar.',
      sourceType:'business-directory', source:'Ficha cartográfica pública consultada el 17/09/2026',
      sourceUrl:'https://www.google.com/maps/search/?api=1&query=Cuartel+de+Bomberos+N%C2%B0+5+San+Patricio+del+Chañar', verifiedAt:'2026-09-17',
      tags:['bomberos','emergencias','cuartel 5']
    },
    {
      id:'club-san-patricio', name:'Club Atlético San Patricio', category:'Deporte', subcategory:'Club deportivo',
      status:'verified', confidence:'high', description:'Club Atlético San Patricio; el Estadio Municipal Juan Bautista Jara es sede del club.',
      sourceType:'official', source:'Municipalidad de San Patricio del Chañar',
      sourceUrl:'https://sanpatricio.gob.ar/nuestra', verifiedAt:'2026-09-17', tags:['deporte','fútbol','club']
    },
    {
      id:'estadio', name:'Estadio Municipal Juan Bautista Jara', category:'Deporte', subcategory:'Estadio',
      status:'verified', confidence:'high', address:'Av. Gasparri Norte',
      description:'Estadio municipal y sede del Club Atlético San Patricio. En el entorno se encuentra el Muro de la Identidad.',
      sourceType:'official', source:'Municipalidad de San Patricio del Chañar',
      sourceUrl:'https://sanpatricio.gob.ar/nuestra', verifiedAt:'2026-09-17', tags:['deporte','estadio','identidad']
    },
    {
      id:'plaza-ninos', name:'Plaza de las Infancias', category:'Territorio', subcategory:'Espacio público',
      status:'verified', confidence:'high', address:'Entre Complejo Chocón y Av. Roberto Gasparri Sur',
      description:'Espacio público restaurado en 2022, con juegos y pista de skate.',
      sourceType:'official', source:'Municipalidad de San Patricio del Chañar',
      sourceUrl:'https://sanpatricio.gob.ar/nuestra', verifiedAt:'2026-09-17', tags:['plaza','infancias','skate','familias']
    },
    {
      id:'centro-cultural', name:'Centro Cultural Erika Barión de Werro', category:'Cultura', subcategory:'Centro cultural',
      status:'verified', confidence:'high', description:'Centro cultural inaugurado en 2013, con auditorio y actividades culturales.',
      sourceType:'official', source:'Municipalidad de San Patricio del Chañar',
      sourceUrl:'https://sanpatricio.gob.ar/nuestra', verifiedAt:'2026-09-17', tags:['cultura','teatro','cine','auditorio']
    },
    {
      id:'balneario', name:'Balneario Municipal', category:'Turismo', subcategory:'Recreación',
      status:'verified', confidence:'high',
      description:'Predio recreativo sobre un brazo del Río Neuquén, con piletones, camping, parrillas, baños, duchas, canchas, playón, sendas y estaciones de acondicionamiento físico. Algunos servicios son estacionales.',
      sourceType:'official', source:'Municipalidad de San Patricio del Chañar',
      sourceUrl:'https://sanpatricio.gob.ar/nuestra', verifiedAt:'2026-09-17', tags:['turismo','río','balneario','camping','familias']
    },
    {
      id:'mirador-virgen', name:'Mirador La Virgen', category:'Turismo', subcategory:'Mirador',
      status:'verified', confidence:'high', address:'Calle 11 Norte, aproximadamente 2 km desde la intersección de RP 7 y RP 8',
      description:'Mirador turístico sobre las bardas, con vista hacia el valle productivo.',
      sourceType:'official', source:'Municipalidad de San Patricio del Chañar',
      sourceUrl:'https://sanpatricio.gob.ar/nuestra', verifiedAt:'2026-09-17', tags:['turismo','mirador','bardas','territorio']
    },
    {
      id:'chacra-valles-chanar', name:'Chacra Municipal “Valles del Chañar”', category:'Producción', subcategory:'Producción agropecuaria',
      status:'verified', confidence:'high', address:'Picada N° 5',
      description:'Chacra municipal de 10 hectáreas con infraestructura de riego e invernaderos, según la información municipal.',
      sourceType:'official', source:'Municipalidad de San Patricio del Chañar',
      sourceUrl:'https://sanpatricio.gob.ar/nuestra', verifiedAt:'2026-09-17', tags:['producción','chacra','riego','invernaderos']
    },
    {
      id:'dique-compensador', name:'Dique Compensador', category:'Territorio', subcategory:'Área natural protegida',
      status:'verified', confidence:'high', description:'Área vinculada al sistema del Río Neuquén y al paisaje territorial de la localidad. La Municipalidad informa acceso por RP 7 y RP 8 y su protección municipal.',
      sourceType:'official', source:'Municipalidad de San Patricio del Chañar',
      sourceUrl:'https://sanpatricio.gob.ar/nuestra', verifiedAt:'2026-09-17', tags:['río','dique','territorio','naturaleza']
    },
    {
      id:'corralon-pitty', name:'Corralón Pitty', category:'Comercio', subcategory:'Materiales / ferretería',
      status:'verified', confidence:'medium', address:'Río Neuquén Mza G2 Lote 11 y 12', phone:'+54 299 485-5419',
      description:'Comercio local de materiales y ferretería. La ubicación y teléfono fueron contrastados con ficha cartográfica pública.',
      sourceType:'business-directory', source:'Ficha cartográfica pública consultada el 17/09/2026',
      sourceUrl:'https://www.google.com/maps/search/?api=1&query=Corralón+Pitty+San+Patricio+del+Chañar', verifiedAt:'2026-09-17', tags:['comercio','materiales','ferretería']
    }
  ]
};
