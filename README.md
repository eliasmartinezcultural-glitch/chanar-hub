# Chañar HUB

**Guía · Mapa · Territorio · San Patricio del Chañar**

Chañar HUB es una infraestructura web local, liviana y sin instalación para **buscar, entender y resolver** necesidades cotidianas de vecinos y visitantes.

## Base consolidada · V1

A partir del 17/09/2026, el proyecto entra en modo **base estable**. Las mejoras nuevas deben reutilizar esta arquitectura y no crear fuentes paralelas.

### Núcleo de datos

- `chanar-registry.js` = registro canónico.
- `geo-data.js` = datos geográficos de apoyo.
- `geo-territory.js` = territorio físico.
- `data/` = auditorías y evidencia.
- Regla: **un dato → un registro canónico → múltiples vistas**.

### Confianza

- Fuentes oficiales primero.
- No inventar teléfonos, horarios, coordenadas, servicios ni estados operativos.
- Dirección y coordenada son campos diferentes.
- Diferenciar lugar publicado, revisión pendiente, ubicación temporal y proyecto/obra.
- La auditoría documenta qué se sabe y qué falta comprobar.

### Experiencia

`BUSCAR → FICHA → ¿QUÉ NECESITÁS HACER? → ACCIÓN`

Las vistas principales son:

- `index.html` · entrada y buscador.
- `vecinos.html` · necesidades locales.
- `viajero.html` · utilidad para visitantes.
- `mapa.html` · territorio y fichas geográficas.
- `auditoria.html` · control y confianza.
- `compartir.html` · distribución por enlace, WhatsApp y redes.

### Mobile y distribución

- Mobile-first y táctil.
- Sin scroll horizontal intencional.
- Botones grandes y acciones claras.
- Compartir nativo cuando el navegador lo permite.
- WhatsApp y copia de enlace como caminos directos.
- Metadatos sociales preparados en la página de distribución.
- GitHub Pages mantiene el proyecto como sitio estático y sin instalación.

### Protección de la base

`node scripts/integrity-check.mjs` verifica archivos núcleo, contratos del registro, viewport/title de las páginas y sintaxis JavaScript.

GitHub Actions ejecuta ese control en cada push y pull request hacia `main`.

## Regla de desarrollo

Antes de agregar una función:

1. **Reutilizar** lo existente.
2. **Conectar** antes que duplicar.
3. **Consolidar** antes que crear otra capa.
4. **Auditar** antes de publicar datos nuevos.
5. **Probar** antes de declarar algo terminado.
6. Si una mejora rompe una pieza estable, **se corrige o se revierte**.

## Principios

- Web primero: sin instalación.
- Ligero: HTML, CSS y JavaScript puro.
- Mobile-first.
- Información real y verificable.
- Utilidad primero, identidad después.
- Crecer por módulos, no por acumulación.
- Una ficha canónica puede alimentar Inicio, Vecinos, Viajero y Mapa.
