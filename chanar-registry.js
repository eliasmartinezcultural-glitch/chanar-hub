/* CHANAR HUB — INVENTARIO CANÓNICO + CAPA DE VERIFICACIÓN */
(function () {
  const ui = document.createElement('link');
  ui.rel = 'stylesheet';
  ui.href = 'chanar-ui.css';
  document.head.appendChild(ui);

  const source = window.CHANAR_GEO || { categories: [], places: [] };
  const territory = window.CHANAR_TERRITORY || { territories: [] };
  const verifiedLayer = window.CHANAR_VERIFIED_2026 || { checkedAt: null, places: [] };

  const corrections = new Map((verifiedLayer.places || []).map(x => [x.id, x]));
  const retired = new Set((verifiedLayer.places || []).filter(x => x.status === 'retired').map(x => x.id));

  // La capa auditada tiene prioridad. Un registro retirado no vuelve a aparecer por accidente.
  const mergePlace = (base) => {
    if (retired.has(base.id)) return null;
    const patch = corrections.get(base.id);
    return patch ? { ...base, ...patch } : base;
  };

  const basePlaces = (source.places || []).map(mergePlace).filter(Boolean);
  const baseIds = new Set(basePlaces.map(x => x.id));
  const newVerified = (verifiedLayer.places || []).filter(x => !baseIds.has(x.id) && x.status !== 'retired');
  const mergedPlaces = [...basePlaces, ...newVerified];

  const normalize = (x, entityType) => {
    const hasCoordinates = Number.isFinite(x.lat) && Number.isFinite(x.lon);
    const hasGeometry = !!x.geometry;
    const status = x.status === 'verified' ? 'verified' : 'pending';
    const spatialStatus = entityType === 'territory'
      ? (hasGeometry ? 'verified' : 'pending')
      : (hasCoordinates ? 'located' : (x.address ? 'address_verified' : 'unlocated'));
    return Object.freeze({
      ...x,
      entityType,
      identityKey: `${entityType}:${x.id}`,
      publication: status === 'verified' && (entityType === 'territory' ? hasGeometry : (hasCoordinates || !!x.address)) ? 'published' : 'pending',
      spatialStatus,
      audit: Object.freeze({
        hasId: !!x.id,
        hasName: !!x.name,
        hasCategory: !!x.category,
        hasSource: !!x.source,
        hasSourceUrl: !!x.sourceUrl,
        hasVerificationDate: /^\d{4}-\d{2}-\d{2}$/.test(String(x.verifiedAt || '')),
        hasSpatialReference: entityType === 'territory' ? hasGeometry : (hasCoordinates || !!x.address),
        auditedLayer: !!x.verifiedAt && !!x.sourceUrl
      })
    });
  };

  const places = mergedPlaces.map(x => normalize(x, 'place'));
  const territories = (territory.territories || []).map(x => normalize(x, 'territory'));
  const all = [...places, ...territories];
  const ids = new Set();
  const duplicateIds = [];
  for (const item of all) {
    if (ids.has(item.identityKey)) duplicateIds.push(item.identityKey);
    ids.add(item.identityKey);
  }

  window.CHANAR_REGISTRY = Object.freeze({
    schemaVersion: '1.1',
    updated: verifiedLayer.checkedAt || new Date().toISOString().slice(0, 10),
    name: 'Inventario Canónico de Chañar',
    owner: 'Chañar HUB · Ocarina Producciones',
    lifecycle: ['descubierto', 'documentado', 'verificado', 'publicado'],
    categories: Object.freeze([...new Set([...(source.categories || []), ...(places.map(x => x.category).filter(Boolean))])]),
    places: Object.freeze(places),
    territories: Object.freeze(territories),
    all: Object.freeze(all),
    audit: Object.freeze({
      total: all.length,
      places: places.length,
      territories: territories.length,
      locatedPlaces: places.filter(x => x.spatialStatus === 'located').length,
      addressVerifiedPlaces: places.filter(x => x.spatialStatus === 'address_verified').length,
      pendingPlaces: places.filter(x => x.publication === 'pending').length,
      auditedPlaces: places.filter(x => x.audit.auditedLayer).length,
      retiredRecords: retired.size,
      duplicateIdentityKeys: Object.freeze(duplicateIds)
    })
  });
})();
