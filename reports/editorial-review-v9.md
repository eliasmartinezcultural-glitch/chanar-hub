# Chañar HUB — Auditoría editorial V9

Fecha de revisión: 2026-09-15

## Resultado de la auditoría actual

La base `geo-data.js` contiene 30 lugares. De ellos, 3 tienen coordenadas y estado `verified`; 27 están en `pending`. La capa territorial separada contiene la geometría del ejido.

La regla editorial pasa a ser:

**DESCUBIERTO → DOCUMENTADO → VERIFICADO → PUBLICADO**

Una ficha puede existir sin coordenadas. Eso no significa que pueda publicarse como punto cartográfico verificado.

## 1. Listos para publicación espacial

### `dpc-localidad-spc`
- Entidad: San Patricio del Chañar
- Estado actual: `verified`
- Espacial: coordenada disponible
- Fuente: DPCeIT / base catastral provincial
- Tratamiento: **apta como referencia territorial canónica**

Es el registro más sólido de los tres puntos actualmente verificados porque su procedencia es una fuente provincial específica.

## 2. Coordenadas disponibles, pero fuente a fortalecer

### `mun-spc`
Municipalidad de San Patricio del Chañar.

Tiene coordenadas y trazabilidad cartográfica, pero la fuente registrada es auxiliar/cartográfica. Antes de considerarla una ficha canónica de largo plazo conviene incorporar una fuente institucional que identifique formalmente la sede.

### `hospital-spc`
Hospital de San Patricio del Chañar.

Tiene coordenadas, pero la fuente actual es una búsqueda cartográfica. Conviene reemplazar o complementar esa evidencia con una fuente sanitaria/institucional específica.

## 3. Entidades correctamente identificadas, pero sin coordenadas verificadas

Estos registros pueden permanecer en el inventario, pero no deben aparecer como puntos confirmados:

- `plaza-ninos` — Plaza Derechos de los Niños
- `correo` — Correo Argentino
- `epet26` — EPET N°26
- `esc273` — Escuela Primaria 273 Julio Sang
- `emeta` — EMETA
- `club-san-patricio` — Club San Patricio del Chañar
- `polideportivo` — Polideportivo Municipal Ingeniero Tulio Ferraresso
- `balneario` — Balneario Municipal
- `biblioteca` — Biblioteca Popular San Patricio del Chañar
- `corralon-pitty` — Corralón Pitty
- `cementerio` — Cementerio de San Patricio del Chañar
- `casa-abuelos` — Casa de Abuelos
- `centro-formacion-agropecuaria` — Centro de Formación Agropecuaria
- `centro-cultural` — Centro Cultural
- `registro-civil` — Registro Civil San Patricio del Chañar
- `bomberos` — Bomberos
- `policia` — Policía

En estos casos la próxima acción correcta es **geocodificación verificable**, no introducir coordenadas aproximadas.

## 4. Registros que necesitan fuente primaria o institucional más precisa

Además de la coordenada, estos registros deben mejorar su trazabilidad documental antes de convertirse en fichas canónicas fuertes:

- Municipalidad
- Hospital
- Plaza Derechos de los Niños
- Correo Argentino
- Club San Patricio del Chañar
- Polideportivo Municipal Ingeniero Tulio Ferraresso
- Balneario Municipal
- Biblioteca Popular
- Corralón Pitty
- Cementerio
- Registro Civil
- Policía

Una URL de búsqueda de Google Maps o un directorio sirve como **evidencia auxiliar**, pero no debe confundirse con una fuente primaria.

## 5. Registros que NO deben seguir como una sola ficha

Estos son los casos donde el problema no es solamente conseguir coordenadas: primero hay que definir qué entidad estamos cartografiando.

### `cef`
“CEF” es una sigla sin expansión documentada. No se debe adivinar el nombre.

**Acción:** identificar denominación oficial, tipo de institución y sede.

### `cci`
“CCI” también permanece sin expansión documentada.

**Acción:** identificar denominación oficial y naturaleza del establecimiento.

### `sum`
“SUM” describe una función/espacio, no necesariamente una entidad única.

**Acción:** identificar nombre oficial y sede concreta.

### `radio-municipal`
La radio es un servicio/medio y puede tener una sede física, pero ambas cosas no son necesariamente la misma entidad territorial.

**Acción:** separar `servicio de comunicación` de `sede física`, si ambas existen.

### `banco-atm`
“Banco / ATM” es una categoría de servicio, no una entidad concreta.

**Acción:** crear fichas independientes para cada banco, cajero o punto financiero verificable.

### `jardin`
“Jardín de infantes” identifica un nivel educativo, no un establecimiento específico.

**Acción:** identificar el establecimiento concreto antes de asignarle coordenadas.

### `huertas`
“Huertas” es una categoría/área productiva.

**Acción:** separar huertas o predios concretos cuando exista geometría o punto verificable.

### `campos-deportivos`
Es un conjunto, no una única cancha.

**Acción:** dividir por instalación/cancha/sector cuando la documentación permita identificarlos.

### `espacios-verdes`
Es una colección territorial.

**Acción:** dividir en plazas, parques, paseos u otros espacios concretos.

## 6. Regla nueva para el inventario

No se debe usar una coordenada para “hacer aparecer” una ficha.

La secuencia correcta es:

```text
IDENTIDAD
   ↓
FUENTE
   ↓
UBICACIÓN
   ↓
VERIFICACIÓN
   ↓
PUBLICACIÓN
```

Y para colecciones:

```text
CATEGORÍA / CONJUNTO
        ↓
IDENTIFICAR ENTIDADES
        ↓
CREAR IDs INDIVIDUALES
        ↓
UBICAR
        ↓
VERIFICAR
```

## 7. Próxima campaña de trabajo

El inventario queda preparado para una campaña específica de **georreferenciación y documentación primaria**, en este orden:

1. Educación
2. Salud y emergencias
3. Instituciones y trámites
4. Deporte y espacios públicos
5. Comercio y servicios
6. Cultura e historia
7. Producción
8. Territorio físico

La expansión futura debe agregar registros al inventario canónico, no crear listas paralelas en cada pantalla del sitio.
