# Base geográfica maestra · Fuentes y estándar

## Objetivo

Chañar HUB mantiene dos capas geográficas canónicas y separadas:

- `geo-data.js`: **places**, fichas públicas puntuales (instituciones, comercios, servicios, patrimonio y otros lugares). Puede contener registros `pending` sin coordenadas verificadas.
- `geo-territory.js`: **territory**, geometrías territoriales verificadas (ejidos, rutas, cursos de agua y otras líneas/polígonos públicos). No se convierten geometrías en puntos artificiales.

La cola `geo-import-queue.json` continúa siendo una zona de candidatos. Ningún candidato entra automáticamente en una capa pública solo por haber sido descargado.

## Flujo canónico

`DPCeIT / geoservicio oficial → importación → cola de candidatos → auditoría Ocarina → places o territory → Mapa Vivo`

## Jerarquía de fuentes

1. **Oficial territorial/catastral:** Dirección Provincial de Catastro e Información Territorial (DPCeIT), ITC/GeoNode y servicios geográficos provinciales.
2. **Oficial educativo:** Consejo Provincial de Educación y cartografía educativa provincial.
3. **Oficial institucional:** Municipalidad de San Patricio del Chañar, Boletín Oficial y normativa que identifique equipamientos o establecimientos.
4. **Cartografía pública:** OpenStreetMap y otras fuentes cartográficas públicas, usadas para localizar y contrastar.
5. **Directorios/local:** buscadores y fichas de negocios/servicios, usados como evidencia auxiliar y no como autoridad territorial única.

## Fuentes base consultadas el 2026-09-15

- DPCeIT · Mapoteca Digital: https://dpc.neuquen.gov.ar/Mapa
- DPCeIT · servicio catastral provincial ArcGIS: https://dpcatastro.neuquen.gov.ar/server/rest/services/Base/MapServer
- DPCeIT · GeoNode: https://geonode.dpc.neuquen.gov.ar/
- Portal IDENEU · catálogo de geoservicios: https://catalogo.neuquen.gov.ar/portal/
- DPCeIT · cartas topográficas: la hoja 3969-11 corresponde a San Patricio del Chañar.
- Boletín Oficial de Neuquén · Decreto 630/2022: creación de EPET N°26 en San Patricio del Chañar.
- Boletín Oficial / normativa municipal: inventarios y equipamiento local utilizados como evidencia institucional.

## Reglas de calidad

Cada registro debe conservar, cuando estén disponibles:

- `sourceType`: official | cartographic | directory | community
- `source`
- `sourceUrl`
- `verifiedAt`
- `verificationMethod`
- `confidence`
- `status`: verified | pending | deprecated
- `lat` / `lon` solo cuando exista ubicación verificable para un place
- `geometry` solo cuando exista una geometría territorial verificable
- `address` y `phone` solo cuando estén respaldados por una fuente concreta
- `notes` para conflictos o limitaciones
- `sourceObjectId` cuando proceda de una capa oficial identificable

### Regla crítica

**Existencia no equivale a ubicación.** Una institución puede estar documentada oficialmente y permanecer `pending` hasta obtener coordenadas verificables.

**Una geometría tampoco equivale a un punto.** Una ruta, río o ejido conserva su geometría original y pertenece a `geo-territory.js`; no se degrada a un marcador de mapa.

### Catastro y reproducción

La Mapoteca Digital provincial advierte que su cartografía registrada puede descargarse e imprimirse para uso personal y restringe la reproducción total o parcial para comercialización sin autorización. Chañar HUB utiliza estas fuentes como referencia documental; no se copia una lámina cartográfica oficial dentro del producto sin revisar previamente sus condiciones de uso.

## Pipeline territorial automatizado

`tools/geo-importer.mjs` descarga candidatos para revisión.

`tools/build-territory.mjs` consulta directamente los `OBJECTID` territoriales aprobados y conserva la geometría original en `geo-territory.js`.

`.github/workflows/build-territory.yml` automatiza esa construcción y vuelve a publicar el archivo canónico solo cuando la salida cambia.

### Primera promoción territorial

La primera localidad provincial promovida a `geo-data.js` es **San Patricio del Chañar**, procedente de la capa oficial `Localidades` de DPCeIT, `OBJECTID 94`, con coordenadas `-38.6263025, -68.2966602`.

Las primeras geometrías territoriales canónicas se mantienen separadas de esa ficha puntual: ejido de San Patricio del Chañar, rutas provinciales 7, 8 y 51, y el tramo hidrográfico identificado oficialmente como `R. NEUQUEN`.

## Secuencia de carga

1. Localidad y puntos territoriales básicos.
2. Ejidos, barrios y límites útiles.
3. Vías de comunicación.
4. Hidrografía.
5. Educación, instituciones y servicios.
6. Salud y emergencias.
7. Deporte y espacios comunitarios.
8. Comercio, turismo, producción y patrimonio.
9. Validación de duplicados, nombres públicos y geometrías.

## Estado

La base se encuentra en etapa de carga estructural. Los puntos pendientes se conservan como pendientes y las geometrías territoriales se publican únicamente cuando fueron recuperadas desde una fuente documentada y pasaron la revisión editorial correspondiente.
