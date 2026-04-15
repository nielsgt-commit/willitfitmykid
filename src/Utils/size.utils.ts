
import type {KidsClothingSizeKey, KidsClothingSizeRow, KidsClothingTable, Region} from "../types.ts";

const getRows = (table: KidsClothingTable): KidsClothingSizeRow[] =>
  Object.values(table);

const findRow = (
  table: KidsClothingTable,
  predicate: (row: KidsClothingSizeRow) => boolean,
): KidsClothingSizeRow | undefined => getRows(table).find(predicate);

export const getSizeRow = (
  table: KidsClothingTable,
  key: KidsClothingSizeKey,
): KidsClothingSizeRow | undefined => table[key];

export const findCanonicalSize = (
  table: KidsClothingTable,
  region: Region,
  label: string,
): KidsClothingSizeRow | undefined =>
  findRow(table, (row) => row.conversions[region] === label);

export const listAvailableSizes = (
  table: KidsClothingTable,
): KidsClothingSizeRow[] => getRows(table).sort((a, b) => Number(a.key) - Number(b.key));

export const findSizeForHeight = (
  table: KidsClothingTable,
  heightCm: number,
): KidsClothingSizeRow => {
  const sorted = listAvailableSizes(table);
  const exact = sorted.find((row) => heightCm >= row.heightCm.min && heightCm <= row.heightCm.max);
  if (exact) return exact;
  // Find nearest by distance to midpoint
  return sorted.reduce((best, row) => {
    const mid = (row.heightCm.min + row.heightCm.max) / 2;
    const bestMid = (best.heightCm.min + best.heightCm.max) / 2;
    return Math.abs(heightCm - mid) < Math.abs(heightCm - bestMid) ? row : best;
  });
};
