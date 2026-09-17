/* CHANAR HUB — INVENTARIO CANÓNICO */
(function () {
  const ui = document.createElement('link');
  ui.rel = 'stylesheet';
  ui.href = 'chanar-ui.css';
  document.head.appendChild(ui);
  const source = window.CHANAR_GEO || { categories: [], places: [] };
  const territory = window.CHANAR_TERRITORY || { territories: [] };
  const normalize = (x, entityType) => {
    const hasCoordinates = Number.isFinite(x.lat) && Number.isFinite(x.lon);
    const hasGeometry = !!x.geometry;
    const status = x.status === 'verified' ? 'verified' : 'pending';
    return Object.freeze({
      ...x,
      entityType,
      identityKey: `${entityType}:${x.id}`,
      publication: status === 'verified' && (entityType === 'territory' ? hasGeometry : hasCoordinates) ? 'published' : 'pending',
      spatialStatus: entityType === 'territory' ? (hasGeometry ? 'verified' : 'pending') : (hasCoordinates ? 'located' : 'unlocated'),
      audit: Object.freeze({
        hasId: !!x.id,
        hasName: !!x.name,
        hasCategory: !!x.category,
        hasSource: !!x.source,
        hasSourceUrl: !!x.sourceUrl,
        hasVerificationDate: /^\d{4}-\d{2}-\d{2}$/.test(String(x.verifiedAt || '')),
        hasSpatialReference: entityType === 'territory' ? hasGeometry : hasCoordinates
      })
    });
  };
  const places = (source.places || []).map(x => normalize(x, 'place'));
  const territories = (territory.territories || []).map(x => normalize(x, 'territory'));
  const all = [...places, ...territories];
  const ids = new Set();
  const duplicateIds = [];
  for (const item of all) {
    if (ids.has(item.identityKey)) duplicateIds.push(item.identityKey);
    ids.add(item.identityKey);
  }
  window.CHANAR_REGISTRY = Object.freeze({
    schemaVersion: '1.0',
    updated: new Date().toISOString().slice(0, 10),
    name: 'Inventario Canónico de Chañar',
    owner: 'Chañar HUB · Ocarina Producciones',
    lifecycle: ['descubierto', 'documentado', 'verificado', 'publicado'],
    categories: Object.freeze([...(source.categories || [])]),
    places: Object.freeze(places),
    territories: Object.freeze(territories),
    all: Object.freeze(all),
    audit: Object.freeze({
      total: all.length,
      places: places.length,
      territories: territories.length,
      locatedPlaces: places.filter(x => x.spatialStatus === 'located').length,
      pendingPlaces: places.filter(x => x.publication === 'pending').length,
      publishedTerritories: territories.filter(x => x.publication === 'published').length,
      duplicateIdentityKeys: Object.freeze(duplicateIds)
    })
  });
})();
