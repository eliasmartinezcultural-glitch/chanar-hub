/* Compatibilidad heredada.
 * Fuente única: CHANAR_REGISTRY en chanar-registry.js.
 * No agregar datos acá. Las vistas antiguas que todavía consulten
 * CHANAR_DATA reciben la misma colección canónica, sin duplicarla.
 */
Object.defineProperty(window, 'CHANAR_DATA', {
  configurable: true,
  get() {
    const r = window.CHANAR_REGISTRY || {places:[]};
    return {
      meta: {
        source: 'CHANAR_REGISTRY',
        status: 'compatibility-shim',
        note: 'Este archivo ya no contiene una base paralela de lugares.'
      },
      places: r.places || []
    };
  }
});
