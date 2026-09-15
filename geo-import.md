# Cola de importación geográfica

Chañar HUB incorpora datos territoriales mediante una **cola controlada**, no mediante escritura automática sobre `geo-data.js`.

## Flujo

```text
DPCeIT / ArcGIS REST
        ↓
geo-import-config.json
        ↓
tools/geo-importer.mjs
        ↓
geo-import-queue.json
        ↓
revisión humana
        ↓
promoción explícita
        ↓
geo-data.js
        ↓
Mapa Vivo
```

## Por qué hay una cola

Un geoservicio puede contener geometrías, registros administrativos o elementos que no deben convertirse automáticamente en una ficha pública. La importación automática solamente crea **candidatos**.

Cada candidato queda con:

- `status: "pending"`
- `importStatus: "candidate"`
- fuente oficial
- URL de la capa
- fecha de importación
- identificador del registro de origen
- atributos originales
- centroide calculado para referencia

## Ejecución local

Requiere Node.js 18+ porque utiliza `fetch` nativo.

```bash
node tools/geo-importer.mjs
```

El resultado se guarda en:

```text
geo-import-queue.json
```

## Regla de promoción

Nunca se debe copiar toda la cola directamente a `geo-data.js`.

Antes de promover un registro hay que comprobar:

1. que corresponde realmente a San Patricio del Chañar;
2. que no es un duplicado;
3. que su nombre es comprensible para el público;
4. que la geometría sirve para el uso previsto;
5. que la coordenada representa razonablemente el lugar;
6. que la fuente y fecha quedan conservadas;
7. que no expone información catastral privada o innecesaria.

## Alcance inicial

La primera configuración consulta:

- Localidades
- Ejidos
- Barrios
- Vías de comunicación
- Hidrografía

La DPCeIT publica estas capas dentro de su servicio `Base`, junto con otras capas territoriales y catastrales. El servicio admite consultas en JSON/GeoJSON. La cola usa solamente las capas necesarias para construir el contexto territorial inicial. citeturn0search0

## Importante sobre Catastro

La información catastral es una fuente territorial, no una licencia automática para publicar cualquier detalle registral. Chañar HUB debe conservar solamente los datos necesarios para orientación pública y evitar exponer información sensible o administrativa que no tenga utilidad pública.

## Próxima etapa

El importador debe evolucionar hacia tres colas separadas:

- `territory` → capas territoriales;
- `places` → establecimientos/lugares públicos;
- `verification` → candidatos que necesitan contraste antes de aparecer como verificados.

El objetivo final es que `geo-data.js` sea un **producto curado**, mientras `geo-import-queue.json` funciona como zona de entrada controlada.
