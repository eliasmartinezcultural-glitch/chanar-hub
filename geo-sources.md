# Base geográfica maestra · Fuentes y estándar

## Objetivo

`geo-data.js` es la base geográfica canónica de Chañar HUB. Ningún punto entra al mapa como coordenada verificada por simple aproximación.

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
- `lat` / `lon` solo cuando exista ubicación verificable
- `address` y `phone` solo cuando estén respaldados por una fuente concreta
- `notes` para conflictos o limitaciones

### Regla crítica

**Existencia no equivale a ubicación.** Una institución puede estar documentada oficialmente y permanecer `pending` hasta obtener coordenadas verificables.

### Catastro y reproducción

La Mapoteca Digital provincial advierte que su cartografía registrada puede descargarse e imprimirse para uso personal y restringe la reproducción total o parcial para comercialización sin autorización. Chañar HUB utiliza estas fuentes como referencia documental; no se copia una lámina cartográfica oficial dentro del producto sin revisar previamente sus condiciones de uso.

## Próxima secuencia de carga

1. Catastro/territorio: localidad, ejido, barrios, vías, hidrografía y secciones.
2. Educación: establecimientos y campus.
3. Instituciones y servicios públicos.
4. Salud y emergencias.
5. Deporte y espacios comunitarios.
6. Comercio y servicios locales.
7. Turismo, producción y patrimonio.
8. Validación de coordenadas y revisión de duplicados.

## Estado

La base se encuentra en etapa de carga estructural. Los puntos pendientes son visibles como pendientes y no se presentan como ubicaciones verificadas.
