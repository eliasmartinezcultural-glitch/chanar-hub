#!/usr/bin/env node
/**
 * Chañar HUB · Importador geográfico controlado
 *
 * Descarga capas públicas de la DPCeIT/ArcGIS, las limita al ámbito de
 * trabajo de San Patricio del Chañar y genera una COLA de candidatos.
 *
 * Regla: este script NO modifica geo-data.js automáticamente.
 * Primero produce geo-import-queue.json para revisión/validación humana.
 *
 * Uso:
 *   node tools/geo-importer.mjs
 */

import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const CONFIG_PATH = path.join(ROOT, "geo-import-config.json");
const OUTPUT_PATH = path.join(ROOT, "geo-import-queue.json");

const config = JSON.parse(await fs.readFile(CONFIG_PATH, "utf8"));

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function bboxContains(lon, lat, bbox) {
  return lon >= bbox.minLon && lon <= bbox.maxLon && lat >= bbox.minLat && lat <= bbox.maxLat;
}

function ringCentroid(ring) {
  let area = 0;
  let cx = 0;
  let cy = 0;
  for (let i = 0; i < ring.length - 1; i++) {
    const [x1, y1] = ring[i];
    const [x2, y2] = ring[i + 1];
    const cross = x1 * y2 - x2 * y1;
    area += cross;
    cx += (x1 + x2) * cross;
    cy += (y1 + y2) * cross;
  }
  if (!area) return null;
  return [cx / (3 * area), cy / (3 * area)];
}

function geometryCentroid(geometry) {
  if (!geometry) return null;
  if (geometry.x != null && geometry.y != null) return [geometry.x, geometry.y];
  if (geometry.points?.length) {
    const points = geometry.points;
    const sum = points.reduce((acc, p) => [acc[0] + p[0], acc[1] + p[1]], [0, 0]);
    return [sum[0] / points.length, sum[1] / points.length];
  }
  if (geometry.paths?.length) {
    const points = geometry.paths.flat();
    const sum = points.reduce((acc, p) => [acc[0] + p[0], acc[1] + p[1]], [0, 0]);
    return points.length ? [sum[0] / points.length, sum[1] / points.length] : null;
  }
  if (geometry.rings?.length) {
    return ringCentroid(geometry.rings[0]);
  }
  return null;
}

function getDisplayName(attributes) {
  const preferred = [
    "NOMBRE", "NOM_LOC", "LOCALIDAD", "LOC_NOMBRE", "BAR_NOMBRE",
    "NOM_BARRIO", "NOMBRE_BARR", "CALLE", "NOMBRE_CALLE", "VIA_NOMBRE",
    "HID_NOMBRE", "NOM_HIDRO", "EJIDO", "EJ_NOMBRE"
  ];
  for (const key of preferred) {
    const value = attributes?.[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  for (const [key, value] of Object.entries(attributes || {})) {
    if (typeof value === "string" && value.trim() && /nombre|nom|local|barr|calle|via|ejido|hidro/i.test(key)) {
      return value.trim();
    }
  }
  return "Registro territorial sin nombre normalizado";
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: { "User-Agent": "ChanarHUB-GeoImporter/1.0" }
  });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText} · ${url}`);
  return response.json();
}

async function fetchLayer(layer) {
  const records = [];
  let offset = 0;
  const pageSize = config.pageSize || 1000;

  while (true) {
    const params = new URLSearchParams({
      where: "1=1",
      outFields: "*",
      returnGeometry: "true",
      outSR: "4326",
      f: "json",
      resultOffset: String(offset),
      resultRecordCount: String(pageSize)
    });

    const url = `${layer.url}/query?${params}`;
    const data = await fetchJson(url);

    if (data.error) {
      throw new Error(`${layer.name}: ${JSON.stringify(data.error)}`);
    }

    const features = data.features || [];
    records.push(...features);

    if (features.length < pageSize || data.exceededTransferLimit !== true) break;
    offset += features.length;
    await sleep(config.requestDelayMs || 250);
  }

  return records;
}

function normalize(layer, feature, index) {
  const centroid = geometryCentroid(feature.geometry);
  if (!centroid) return null;

  const [lon, lat] = centroid;
  if (!bboxContains(lon, lat, config.bbox)) return null;

  const name = getDisplayName(feature.attributes);
  const objectId = feature.attributes?.OBJECTID ?? feature.attributes?.objectid ?? index;

  return {
    id: `dpc-${layer.id}-${objectId}`,
    name,
    category: layer.category,
    subcategory: layer.subcategory,
    lat: Number(lat.toFixed(7)),
    lon: Number(lon.toFixed(7)),
    status: "pending",
    confidence: "source",
    sourceType: "official",
    source: layer.source,
    sourceUrl: layer.url,
    verifiedAt: config.runDate,
    verificationMethod: "importación automática desde geoservicio; requiere revisión antes de promoción",
    importStatus: "candidate",
    geometryType: feature.geometry ? Object.keys(feature.geometry)[0] : null,
    sourceObjectId: objectId,
    sourceAttributes: feature.attributes
  };
}

const queue = [];
const report = [];

for (const layer of config.layers) {
  process.stdout.write(`→ ${layer.name}\n`);
  const features = await fetchLayer(layer);
  const normalized = features
    .map((feature, index) => normalize(layer, feature, index))
    .filter(Boolean);

  queue.push(...normalized);
  report.push({
    id: layer.id,
    name: layer.name,
    downloaded: features.length,
    candidates: normalized.length
  });
}

const deduped = [];
const seen = new Set();
for (const item of queue) {
  const key = `${item.category}|${item.name.toLowerCase()}|${item.lat}|${item.lon}`;
  if (!seen.has(key)) {
    seen.add(key);
    deduped.push(item);
  }
}

const output = {
  schemaVersion: "1.0",
  generatedAt: new Date().toISOString(),
  runDate: config.runDate,
  purpose: "Cola controlada de candidatos geográficos para Chañar HUB",
  rule: "Los candidatos NO se incorporan automáticamente a geo-data.js. Requieren revisión y promoción explícita.",
  source: "DPCeIT / ArcGIS REST",
  bbox: config.bbox,
  layers: report,
  counts: {
    rawCandidates: queue.length,
    deduplicatedCandidates: deduped.length
  },
  candidates: deduped
};

await fs.writeFile(OUTPUT_PATH, JSON.stringify(output, null, 2) + "\n", "utf8");
console.log(`✓ Cola generada: ${OUTPUT_PATH}`);
console.log(`✓ Candidatos: ${deduped.length}`);
