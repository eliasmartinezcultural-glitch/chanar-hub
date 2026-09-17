/* Compatibilidad geográfica heredada.
 * Fuente única: CHANAR_REGISTRY en chanar-registry.js.
 * Se conserva el nombre CHANAR_GEO para no romper vistas antiguas,
 * pero no se mantiene una segunda base de lugares.
 */
Object.defineProperty(window, 'CHANAR_GEO', {
  configurable: true,
  get() {
    const r = window.CHANAR_REGISTRY || {schemaVersion:'1.2', updated:'', attribution:'Chañar HUB · Ocarina Producciones', categories:[], places:[], territories:[]};
    return {
      schemaVersion: r.schemaVersion,
      updated: r.updated,
      attribution: r.attribution,
      categories: r.categories || [],
      places: r.places || [],
      territories: r.territories || []
    };
  }
});
