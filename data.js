/* Compatibilidad heredada.
 * Fuente única: CHANAR_REGISTRY en chanar-registry.js.
 * No agregar datos acá. Las vistas antiguas que todavía consulten
 * CHANAR_DATA recibirán la misma colección canónica, sin duplicarla.
 */
window.CHANAR_DATA = window.CHANAR_DATA || {};
window.CHANAR_DATA.places = window.CHANAR_REGISTRY?.places || [];
window.CHANAR_DATA.meta = {
  source: 'CHANAR_REGISTRY',
  status: 'compatibility-shim',
  note: 'Este archivo ya no contiene una base paralela de lugares.'
};
