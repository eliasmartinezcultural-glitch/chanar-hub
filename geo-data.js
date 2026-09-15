window.CHANAR_GEO = {
  schemaVersion: "1.2",
  updated: "2026-09-15",
  attribution: "Chañar HUB · Ocarina Producciones",
  categories: ["Salud","Educación","Comercio","Turismo","Deporte","Instituciones","Historia","Producción","Territorio"],
  places: [
    {
      id:"mun-spc", name:"Municipalidad de San Patricio del Chañar", category:"Instituciones", subcategory:"Gobierno local",
      lat:-38.62619, lon:-68.29793, status:"verified", confidence:"high", sourceType:"cartographic",
      source:"OpenStreetMap / Mapcarta", sourceUrl:"https://mapcarta.com/es/W218470639", verifiedAt:"2026-09-15",
      verificationMethod:"contraste cartográfico público", description:"Sede municipal de San Patricio del Chañar.", tags:["municipalidad","gobierno"]
    },
    {
      id:"hospital-spc", name:"Hospital de San Patricio del Chañar", category:"Salud", subcategory:"Hospital",
      lat:-38.62957, lon:-68.29623, status:"verified", confidence:"high", sourceType:"cartographic",
      source:"Cartografía pública / búsqueda local", sourceUrl:"https://www.google.com/maps/search/?api=1&query=Hospital+de+San+Patricio+del+Chañar", verifiedAt:"2026-09-15",
      verificationMethod:"contraste cartográfico público", description:"Establecimiento sanitario local.", tags:["salud","hospital"]
    },
    {
      id:"dpc-localidad-spc", name:"San Patricio del Chañar", category:"Territorio", subcategory:"Localidad",
      lat:-38.6263025, lon:-68.2966602, status:"verified", confidence:"high", sourceType:"official",
      source:"DPCeIT · Base catastral provincial", sourceUrl:"https://dpcatastro.neuquen.gov.ar/server/rest/services/Base/MapServer/9", verifiedAt:"2026-09-15",
      verificationMethod:"consulta automática del geoservicio provincial + revisión editorial de correspondencia territorial",
      description:"Punto oficial de la localidad de San Patricio del Chañar obtenido de la capa provincial de Localidades.",
      tags:["territorio","localidad","chañar","DPCeIT"], sourceObjectId:94
    },
    {
      id:"plaza-ninos", name:"Plaza Derechos de los Niños", category:"Instituciones", subcategory:"Espacio público",
      status:"pending", confidence:"medium", sourceType:"cartographic", source:"Directorio cartográfico local",
      sourceUrl:"https://www.google.com/maps/search/?api=1&query=Plaza+Derechos+de+los+Niños+San+Patricio+del+Chañar", verifiedAt:"2026-09-15",
      verificationMethod:"pendiente de contraste de coordenadas", description:"Espacio público incorporado al inventario; coordenadas pendientes.", tags:["plaza","espacio público"]
    },
    {
      id:"correo", name:"Correo Argentino", category:"Instituciones", subcategory:"Servicio público",
      status:"pending", confidence:"medium", sourceType:"cartographic", source:"Directorio cartográfico local",
      sourceUrl:"https://www.google.com/maps/search/?api=1&query=Correo+Argentino+San+Patricio+del+Chañar", verifiedAt:"2026-09-15",
      verificationMethod:"pendiente de contraste de coordenadas", description:"Servicio postal; ubicación pendiente de coordenadas verificadas.", tags:["correo","servicio"]
    },
    {
      id:"epet26", name:"EPET N°26", category:"Educación", subcategory:"Secundaria técnica",
      status:"pending", confidence:"high", sourceType:"official", source:"Boletín Oficial de Neuquén · Decreto 630/2022",
      sourceUrl:"https://infoleg.neuquen.gov.ar/LeyesDecretosDetalle?id=413986", verifiedAt:"2026-09-15",
      verificationMethod:"existencia confirmada por norma provincial; coordenadas pendientes", description:"Escuela Provincial de Educación Técnica N°26, creada en la localidad por Decreto 630/2022.", tags:["educación","técnica","EPET"]
    },
    {
      id:"esc273", name:"Escuela Primaria 273 Julio Sang", category:"Educación", subcategory:"Primaria",
      status:"pending", confidence:"high", sourceType:"official", source:"Cartografía educativa provincial / inventario público",
      sourceUrl:"https://dpc.neuquen.gov.ar/Mapa", verifiedAt:"2026-09-15",
      verificationMethod:"existencia documentada; coordenadas pendientes", description:"Establecimiento de nivel primario; ubicación a validar en la siguiente fase cartográfica.", tags:["educación","primaria"]
    },
    {
      id:"emeta", name:"EMETA", category:"Educación", subcategory:"Formación agropecuaria",
      status:"pending", confidence:"high", sourceType:"official", source:"Cartografía educativa provincial / inventario público",
      sourceUrl:"https://dpc.neuquen.gov.ar/Mapa", verifiedAt:"2026-09-15",
      verificationMethod:"existencia documentada; coordenadas pendientes", description:"Institución educativa vinculada a la formación agropecuaria.", tags:["educación","agropecuaria"]
    },
    {
      id:"club-san-patricio", name:"Club San Patricio del Chañar", category:"Deporte", subcategory:"Club",
      status:"pending", confidence:"high", sourceType:"official", source:"Información pública provincial / directorio cartográfico",
      sourceUrl:"https://www.google.com/maps/search/?api=1&query=Club+San+Patricio+del+Chañar+Neuquén", verifiedAt:"2026-09-15",
      verificationMethod:"institución documentada; coordenadas pendientes", description:"Club deportivo local; ubicación exacta pendiente de validación cartográfica.", tags:["deporte","club"]
    },
    {
      id:"polideportivo", name:"Polideportivo Municipal Ingeniero Tulio Ferraresso", category:"Deporte", subcategory:"Polideportivo",
      status:"pending", confidence:"high", sourceType:"official", source:"Inventario de equipamiento municipal / planificación territorial",
      sourceUrl:"https://boficial.neuquen.gov.ar/", verifiedAt:"2026-09-15",
      verificationMethod:"equipamiento documentado; coordenadas pendientes", description:"Equipamiento deportivo municipal identificado en documentación territorial local.", tags:["deporte","polideportivo","municipal"]
    },
    {
      id:"balneario", name:"Balneario Municipal", category:"Turismo", subcategory:"Recreación",
      status:"pending", confidence:"high", sourceType:"official", source:"Inventario de equipamiento municipal / planificación territorial",
      sourceUrl:"https://boficial.neuquen.gov.ar/", verifiedAt:"2026-09-15",
      verificationMethod:"equipamiento documentado; coordenadas pendientes", description:"Espacio recreativo municipal; ubicación exacta pendiente de validación.", tags:["turismo","recreación","río"]
    },
    {
      id:"biblioteca", name:"Biblioteca Popular San Patricio del Chañar", category:"Instituciones", subcategory:"Cultura",
      status:"pending", confidence:"medium", sourceType:"directory", source:"Directorio empresarial/local",
      sourceUrl:"https://www.google.com/maps/search/?api=1&query=Biblioteca+Popular+San+Patricio+del+Chañar", verifiedAt:"2026-09-15",
      verificationMethod:"ficha local auxiliar; coordenadas pendientes", description:"Biblioteca popular local; la ficha cartográfica se conserva como evidencia auxiliar.", tags:["cultura","biblioteca"]
    },
    {
      id:"corralon-pitty", name:"Corralón Pitty", category:"Comercio", subcategory:"Materiales / ferretería",
      status:"pending", confidence:"medium", sourceType:"directory", source:"Directorio empresarial local",
      sourceUrl:"https://www.google.com/maps/search/?api=1&query=Corralon+Pitty+San+Patricio+del+Chañar", verifiedAt:"2026-09-15",
      verificationMethod:"dirección comercial disponible; coordenadas pendientes", description:"Comercio local de materiales y ferretería; la ficha cartográfica se utiliza como evidencia auxiliar.", address:"Río Neuquén Mza G2 Lote 11 y 12, San Patricio del Chañar", tags:["comercio","materiales","ferretería"]
    },
    {
      id:"cementerio", name:"Cementerio de San Patricio del Chañar", category:"Historia", subcategory:"Patrimonio / memoria",
      status:"pending", confidence:"medium", sourceType:"cartographic", source:"Directorio cartográfico local",
      sourceUrl:"https://www.google.com/maps/search/?api=1&query=Cementerio+San+Patricio+del+Chañar", verifiedAt:"2026-09-15",
      verificationMethod:"punto cartográfico identificado; coordenadas pendientes", description:"Punto territorial de memoria y patrimonio local.", tags:["historia","memoria","patrimonio"]
    },
    {
      id:"cef", name:"CEF", category:"Deporte", subcategory:"Equipamiento comunitario",
      status:"pending", confidence:"medium", sourceType:"official", source:"Documentación de planificación y equipamiento municipal", sourceUrl:"https://boficial.neuquen.gov.ar/", verifiedAt:"2026-09-15",
      verificationMethod:"equipamiento mencionado oficialmente; nombre/ubicación a validar", description:"Equipamiento identificado en documentación territorial local. Se conserva la denominación de la fuente hasta validar su nombre completo.", tags:["deporte","comunidad"]
    },
    {
      id:"cci", name:"CCI", category:"Instituciones", subcategory:"Equipamiento comunitario",
      status:"pending", confidence:"medium", sourceType:"official", source:"Documentación de planificación y equipamiento municipal", sourceUrl:"https://boficial.neuquen.gov.ar/", verifiedAt:"2026-09-15",
      verificationMethod:"equipamiento mencionado oficialmente; nombre/ubicación a validar", description:"Equipamiento identificado en documentación territorial local. No se expande la sigla sin fuente explícita.", tags:["comunidad"]
    },
    {
      id:"casa-abuelos", name:"Casa de Abuelos", category:"Instituciones", subcategory:"Adultos mayores",
      status:"pending", confidence:"medium", sourceType:"official", source:"Documentación de planificación y equipamiento municipal", sourceUrl:"https://boficial.neuquen.gov.ar/", verifiedAt:"2026-09-15",
      verificationMethod:"equipamiento documentado; coordenadas pendientes", description:"Equipamiento comunitario para personas mayores identificado en documentación local.", tags:["adultos mayores","comunidad"]
    },
    {
      id:"centro-formacion-agropecuaria", name:"Centro de Formación Agropecuaria", category:"Educación", subcategory:"Formación agropecuaria",
      status:"pending", confidence:"medium", sourceType:"official", source:"Documentación de planificación y equipamiento municipal", sourceUrl:"https://boficial.neuquen.gov.ar/", verifiedAt:"2026-09-15",
      verificationMethod:"equipamiento documentado; coordenadas pendientes", description:"Equipamiento formativo vinculado al perfil productivo local.", tags:["educación","producción","agropecuaria"]
    },
    {
      id:"huertas", name:"Huertas", category:"Producción", subcategory:"Producción comunitaria",
      status:"pending", confidence:"medium", sourceType:"official", source:"Documentación de planificación y equipamiento municipal", sourceUrl:"https://boficial.neuquen.gov.ar/", verifiedAt:"2026-09-15",
      verificationMethod:"área/equipamiento mencionado; geometría pendiente", description:"Área productiva mencionada en documentación territorial. Se mantiene como registro territorial hasta identificar geometría concreta.", tags:["producción","huertas"]
    },
    {
      id:"sum", name:"SUM", category:"Instituciones", subcategory:"Equipamiento comunitario",
      status:"pending", confidence:"medium", sourceType:"official", source:"Documentación de planificación y equipamiento municipal", sourceUrl:"https://boficial.neuquen.gov.ar/", verifiedAt:"2026-09-15",
      verificationMethod:"equipamiento mencionado oficialmente; nombre/ubicación a validar", description:"Salón de usos múltiples identificado en documentación local; denominación exacta pendiente de validación.", tags:["comunidad","eventos"]
    },
    {
      id:"centro-cultural", name:"Centro Cultural", category:"Instituciones", subcategory:"Cultura",
      status:"pending", confidence:"medium", sourceType:"official", source:"Documentación de planificación y equipamiento municipal", sourceUrl:"https://boficial.neuquen.gov.ar/", verifiedAt:"2026-09-15",
      verificationMethod:"equipamiento documentado; coordenadas pendientes", description:"Equipamiento cultural identificado en documentación territorial local.", tags:["cultura","eventos"]
    },
    {
      id:"radio-municipal", name:"Radio Municipal", category:"Instituciones", subcategory:"Comunicación",
      status:"pending", confidence:"medium", sourceType:"official", source:"Documentación de planificación y equipamiento municipal", sourceUrl:"https://boficial.neuquen.gov.ar/", verifiedAt:"2026-09-15",
      verificationMethod:"servicio/equipamiento mencionado; ubicación pendiente", description:"Medio de comunicación municipal identificado en documentación territorial local.", tags:["comunicación","radio"]
    },
    {
      id:"skatepark", name:"Skatepark", category:"Deporte", subcategory:"Espacio deportivo",
      status:"pending", confidence:"medium", sourceType:"official", source:"Documentación de planificación y equipamiento municipal", sourceUrl:"https://boficial.neuquen.gov.ar/", verifiedAt:"2026-09-15",
      verificationMethod:"equipamiento documentado; coordenadas pendientes", description:"Espacio deportivo identificado en documentación territorial local.", tags:["deporte","skate"]
    },
    {
      id:"campos-deportivos", name:"Campos deportivos", category:"Deporte", subcategory:"Espacios deportivos",
      status:"pending", confidence:"medium", sourceType:"official", source:"Documentación de planificación y equipamiento municipal", sourceUrl:"https://boficial.neuquen.gov.ar/", verifiedAt:"2026-09-15",
      verificationMethod:"equipamiento documentado; geometría pendiente", description:"Conjunto de espacios deportivos identificado en documentación local; se requiere separar cada cancha/sector antes de publicar coordenadas.", tags:["deporte","espacios verdes"]
    },
    {
      id:"registro-civil", name:"Registro Civil San Patricio del Chañar", category:"Instituciones", subcategory:"Registro público",
      status:"pending", confidence:"medium", sourceType:"directory", source:"Directorio local / información pública",
      sourceUrl:"https://www.google.com/maps/search/?api=1&query=Registro+Civil+San+Patricio+del+Chañar", verifiedAt:"2026-09-15",
      verificationMethod:"existencia y ficha local; coordenadas pendientes", description:"Oficina de Registro Civil; ubicación a validar antes de marcarla en el mapa.", tags:["registro civil","trámites"]
    },
    {
      id:"bomberos", name:"Bomberos", category:"Instituciones", subcategory:"Emergencias",
      status:"pending", confidence:"medium", sourceType:"official", source:"Inventario de equipamiento institucional local", sourceUrl:"https://boficial.neuquen.gov.ar/", verifiedAt:"2026-09-15",
      verificationMethod:"institución documentada; coordenadas pendientes", description:"Servicio de emergencias identificado en documentación territorial local.", tags:["emergencias","bomberos"]
    },
    {
      id:"policia", name:"Policía", category:"Instituciones", subcategory:"Seguridad",
      status:"pending", confidence:"medium", sourceType:"official", source:"Inventario de equipamiento institucional local", sourceUrl:"https://boficial.neuquen.gov.ar/", verifiedAt:"2026-09-15",
      verificationMethod:"institución documentada; coordenadas pendientes", description:"Institución de seguridad identificada en documentación territorial local.", tags:["seguridad","emergencias"]
    },
    {
      id:"banco-atm", name:"Banco / ATM", category:"Comercio", subcategory:"Servicios financieros",
      status:"pending", confidence:"medium", sourceType:"official", source:"Inventario de equipamiento local / planificación territorial", sourceUrl:"https://boficial.neuquen.gov.ar/", verifiedAt:"2026-09-15",
      verificationMethod:"servicio documentado; entidad y coordenadas pendientes", description:"Punto de servicios financieros identificado en inventario territorial. No se asigna banco específico hasta verificarlo.", tags:["banco","ATM","servicios"]
    },
    {
      id:"jardin", name:"Jardín de infantes", category:"Educación", subcategory:"Inicial",
      status:"pending", confidence:"medium", sourceType:"official", source:"Inventario de equipamiento educativo local", sourceUrl:"https://dpc.neuquen.gov.ar/Mapa", verifiedAt:"2026-09-15",
      verificationMethod:"nivel/equipamiento documentado; establecimiento concreto pendiente", description:"Equipamiento educativo de nivel inicial mencionado en documentación local; se requiere identificar establecimiento y coordenadas.", tags:["educación","inicial"]
    },
    {
      id:"espacios-verdes", name:"Espacios verdes", category:"Turismo", subcategory:"Espacio público",
      status:"pending", confidence:"medium", sourceType:"official", source:"Documentación de planificación y equipamiento municipal", sourceUrl:"https://boficial.neuquen.gov.ar/", verifiedAt:"2026-09-15",
      verificationMethod:"área documentada; geometría pendiente", description:"Conjunto territorial de espacios verdes. Se dividirá en fichas individuales cuando exista geometría verificable.", tags:["espacio público","recreación"]
    }
  ]
};
